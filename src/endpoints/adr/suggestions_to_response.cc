#include "motis/endpoints/adr/suggestions_to_response.h"

#include "utl/for_each_bit_set.h"
#include "utl/helpers/algorithm.h"
#include "utl/overloaded.h"
#include "utl/to_vec.h"

#include "nigiri/timetable.h"

#include "adr/typeahead.h"

#include "motis/tag_lookup.h"

namespace a = adr;
namespace n = nigiri;

namespace motis {

std::int16_t get_area_lang_idx(a::typeahead const& t,
                               a::language_list_t const& languages,
                               a::area_set_lang_t const matched_area_lang,
                               a::area_idx_t const a) {
  for (auto i = 0U; i != languages.size(); ++i) {
    auto const j = languages.size() - i - 1U;
    auto const lang_idx = a::find_lang(t.area_name_lang_[a], languages[j]);
    if (lang_idx != -1) {
      return lang_idx;
    }
  }
  return -1;
}

api::geocode_response suggestions_to_response(
    adr::typeahead const& t,
    n::timetable const& tt,
    tag_lookup const& tags,
    std::basic_string<a::language_idx_t> const& lang_indices,
    std::vector<adr::token> const& token_pos,
    std::vector<adr::suggestion> const& suggestions) {
  return utl::to_vec(suggestions, [&](a::suggestion const& s) {
    auto const areas = t.area_sets_[s.area_set_];

    auto const zip_it = utl::find_if(
        areas, [&](auto&& a) { return t.area_admin_level_[a] == 11; });
    auto const zip =
        zip_it == end(areas)
            ? std::nullopt
            : std::optional{std::string{
                  t.strings_[t.area_names_[*zip_it][a::kDefaultLangIdx]]
                      .view()}};

    auto const city_it =
        std::min_element(begin(areas), end(areas), [&](auto&& a, auto&& b) {
          auto const x = to_idx(t.area_admin_level_[a]);
          auto const y = to_idx(t.area_admin_level_[b]);
          return (x > 7 ? 10 : 1) * std::abs(x - 7) <
                 (y > 7 ? 10 : 1) * std::abs(y - 7);
        });
    auto const city_idx =
        city_it == end(areas) ? -1 : std::distance(begin(areas), city_it);

    auto type = api::typeEnum{};
    auto street = std::optional<std::string>{};
    auto house_number = std::optional<std::string>{};
    auto id = std::string{};
    auto name = std::visit(
        utl::overloaded{
            [&](a::place_idx_t const p) {
              type = t.place_type_[p] == a::place_type::kExtra
                         ? api::typeEnum::STOP
                         : api::typeEnum::PLACE;
              id =
                  type == api::typeEnum::STOP
                      ? tags.id(tt, n::location_idx_t{t.place_osm_ids_[p]})
                      : fmt::format("{}/{}",
                                    t.place_is_way_[to_idx(p)] ? "way" : "node",
                                    t.place_osm_ids_[p]);
              return std::string{t.strings_[s.str_].view()};
            },
            [&](a::address const addr) {
              type = api::typeEnum::ADDRESS;
              if (addr.house_number_ != a::address::kNoHouseNumber) {
                street = t.strings_[s.str_].view();
                house_number = t.strings_[t.house_numbers_[addr.street_]
                                                          [addr.house_number_]]
                                   .view();
                return fmt::format("{} {}", *street, *house_number);
              } else {
                return std::string{t.strings_[s.str_].view()};
              }
            }},
        s.location_);

    auto tokens = std::vector<std::vector<double>>{};
    utl::for_each_set_bit(s.matched_tokens_, [&](auto const i) {
      assert(i < token_pos.size());
      tokens.emplace_back(
          std::vector<double>{static_cast<double>(token_pos[i].start_idx_),
                              static_cast<double>(token_pos[i].size_)});
    });

    return api::Match{
        .type_ = type,
        .tokens_ = std::move(tokens),
        .name_ = std::move(name),
        .id_ = std::move(id),
        .lat_ = s.coordinates_.as_latlng().lat_,
        .lon_ = s.coordinates_.as_latlng().lng_,
        .level_ = 0.0,  // TODO
        .street_ = std::move(street),
        .house_number_ = std::move(house_number),
        .zip_ = std::move(zip),
        .areas_ = utl::to_vec(
            utl::enumerate(areas),
            [&](auto&& el) {
              auto const [i, a] = el;
              auto const admin_lvl = t.area_admin_level_[a];
              auto const is_matched = (((1U << i) & s.matched_areas_) != 0U);
              auto const language =
                  is_matched ? s.matched_area_lang_[i]
                             : get_area_lang_idx(t, lang_indices,
                                                 s.matched_area_lang_, a);
              auto const name =
                  t.strings_[t.area_names_[a][language == -1
                                                  ? a::kDefaultLangIdx
                                                  : language]]
                      .view();
              return api::Area{
                  .name_ = std::string{name},
                  .admin_level_ = static_cast<double>(to_idx(admin_lvl)),
                  .matched_ = is_matched,
                  .default_ = i == city_idx};
            }),
        .score_ = s.score_};
  });
}

}  // namespace motis