#include "icc/match.h"

#include "osr/geojson.h"
#include "utl/parser/arg_parser.h"

namespace n = nigiri;

namespace icc {

constexpr auto const kNumberMatchBonus = 200.0;

bool is_number(char const x) { return x >= '0' && x <= '9'; }

template <typename Fn>
void for_each_number(std::string_view x, Fn&& fn) {
  for (auto i = 0U; i <= x.size(); ++i) {
    if (!is_number(x[i])) {
      continue;
    }

    auto j = i + 1U;
    for (; j != x.size(); ++j) {
      if (!is_number(x[j])) {
        break;
      }
    }

    fn(utl::parse<unsigned>(x.substr(i, j - i)));
    i = j;
  }
}

bool has_number_match(std::string_view a, std::string_view b) {
  auto match = false;
  for_each_number(a, [&](unsigned const x) {
    for_each_number(b, [&](unsigned const y) { match = (x == y); });
  });
  return match;
}

template <typename Collection>
bool has_number_match(Collection&& a, std::string_view b) {
  return std::any_of(a.begin(), a.end(),
                     [&](auto&& x) { return has_number_match(x.view(), b); });
}

template <typename Collection>
bool has_exact_match(Collection&& a, std::string_view b) {
  return std::any_of(a.begin(), a.end(),
                     [&](auto&& x) { return x.view() == b; });
}

template <typename Collection>
bool has_contains_match(Collection&& a, std::string_view b) {
  return std::any_of(a.begin(), a.end(),
                     [&](auto&& x) { return x.view().contains(b); });
}

template <typename Collection>
double get_match_bonus(Collection&& names,
                       std::string_view ref,
                       std::string_view name) {
  if (has_exact_match(names, ref)) {
    return 200 + 500.0 - names.size();
  }
  if (has_contains_match(names, ref)) {
    return 200 + 300.0 - names.size();
  }
  if (has_exact_match(names, name)) {
    return 200 + 250.0 - names.size();
  }
  if (has_number_match(names, name)) {
    return 200 + 200.0 - names.size();
  }
  return 0.0;
}

struct center {
  template <typename T>
  void add(T const& polyline) {
    for (auto const& x : polyline) {
      add(geo::latlng(x));
    }
  }

  void add(geo::latlng const& pos) {
    sum_.lat_ += pos.lat();
    sum_.lng_ += pos.lng();
    n_ += 1U;
  }

  geo::latlng get_center() const { return {sum_.lat_ / n_, sum_.lng_ / n_}; }

  geo::latlng sum_;
  std::size_t n_;
};

struct geojson_writer {
  void add_match(n::location_idx_t const l,
                 osr::platform_idx_t const p,
                 geo::latlng const& p_center) {
    writer_.features_.emplace_back(
        boost::json::value{{"type", "Feature"},
                           {"properties",
                            {{"type", "location"},
                             {"marker-color", "#53bff9"},
                             {"name", tt_.locations_.names_[l].view()},
                             {"id", tt_.locations_.ids_[l].view()},
                             {"location_idx", to_idx(l)}}},
                           {"geometry", osr::to_point(osr::point::from_latlng(
                                            tt_.locations_.coordinates_[l]))}});
    writer_.features_.emplace_back(boost::json::value{
        {"type", "Feature"},
        {"properties",
         {{"type", "match"},
          {"platform_idx", to_idx(p)},
          {"platform_name", osr::platform_names(pl_, p)},
          {"location_name", tt_.locations_.names_[l].view()},
          {"location_id", tt_.locations_.ids_[l].view()}}},
        {"geometry", osr::to_line_string(std::initializer_list<geo::latlng>(
                         {p_center, tt_.locations_.coordinates_[l]}))}});
  }

  osr::geojson_writer writer_;
  n::timetable const& tt_;
  osr::platforms const& pl_;
  osr::ways const& w_;
};

matching match(n::timetable const& tt,
               osr::platforms const& pl,
               osr::ways const& w) {
  auto const platform_center =
      [&](osr::platform_idx_t const x) -> std::optional<geo::latlng> {
    auto c = center{};
    for (auto const p : pl.platform_ref_[x]) {
      std::visit(utl::overloaded{[&](osr::node_idx_t const node) {
                                   c.add(w.get_node_pos(node).as_latlng());
                                 },
                                 [&](osr::way_idx_t const way) {
                                   c.add(w.way_polylines_[way]);
                                 }},
                 osr::to_ref(p));
    }
    if (c.n_ == 0U) {
      return std::nullopt;
    }
    return c.get_center();
  };

  auto geojson =
      geojson_writer{.writer_ = osr::geojson_writer{.w_ = w, .platforms_ = &pl},
                     .tt_ = tt,
                     .pl_ = pl,
                     .w_ = w};
  auto m = matching{};
  for (auto l = n::location_idx_t{0U}; l != tt.n_locations(); ++l) {
    auto const ref = tt.locations_.coordinates_[l];
    auto best = osr::platform_idx_t::invalid();
    auto best_score = std::numeric_limits<double>::max();

    pl.find(ref, [&](osr::platform_idx_t const x) {
      auto const center = platform_center(x);
      if (!center.has_value()) {
        return;
      }

      auto const dist = geo::distance(*center, ref);
      auto const match_bonus =
          get_match_bonus(pl.platform_names_[x], tt.locations_.ids_[l].view(),
                          tt.locations_.names_[l].view());
      auto const score = dist - match_bonus;
      if (score < best_score) {
        best = x;
        best_score = score;
      }
    });

    if (best != osr::platform_idx_t::invalid()) {
      if (auto const center = platform_center(best); center.has_value()) {
        geojson.add_match(l, best, *center);
      }
      m.pl_[best] = l;
      m.lp_[l] = best;
    } else {
      fmt::println("no match found for id={}, name={}, pos={}",
                   tt.locations_.ids_[l].view(), tt.locations_.names_[l].view(),
                   tt.locations_.coordinates_[l]);
    }
  }

  for (auto p = osr::platform_idx_t{0U}; p != pl.platform_ref_.size(); ++p) {
    auto const c = platform_center(p);
    if (c.has_value()) {
      geojson.writer_.features_.emplace_back(boost::json::value{
          {"type", "Feature"},
          {"properties",
           {{"type", "center"},
            {"marker-color", "#ff7800"},
            {"platform_idx", to_idx(p)},
            {"names", osr::platform_names(pl, p)}}},
          {"geometry", osr::to_point(osr::point::from_latlng(*c))}});
    }
    geojson.writer_.write_platform(p);
  }

  fmt::println("{}", geojson.writer_.finish());

  return m;
}

}  // namespace icc