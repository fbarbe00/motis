// This file is auto-generated by @hey-api/openapi-ts

/**
 * Administrative area
 */
export type Area = {
    /**
     * Name of the area
     */
    name: string;
    /**
     * [OpenStreetMap `admin_level`](https://wiki.openstreetmap.org/wiki/Key:admin_level)
     * of the area
     *
     */
    admin_level: number;
    /**
     * Whether this area was matched by the input text
     */
    matched: boolean;
    /**
     * Whether this area should be displayed as default area (area with admin level closest 7)
     */
    default?: boolean;
};

/**
 * Matched token range (from index, length)
 */
export type Token = [
    number,
    number
];

/**
 * GeoCoding match
 */
export type Match = {
    /**
     * location type
     */
    type: 'ADDRESS' | 'PLACE' | 'STOP';
    /**
     * list of non-overlapping tokens that were matched
     */
    tokens: Array<Token>;
    /**
     * name of the location (transit stop / PoI / address)
     */
    name: string;
    /**
     * unique ID of the location
     */
    id: string;
    /**
     * latitude
     */
    lat: number;
    /**
     * longitude
     */
    lon: number;
    /**
     * level according to OpenStreetMap
     * (at the moment only for public transport)
     *
     */
    level: number;
    /**
     * street name
     */
    street?: string;
    /**
     * house number
     */
    house_number?: string;
    /**
     * zip code
     */
    zip?: string;
    /**
     * list of areas
     */
    areas: Array<Area>;
    /**
     * score according to the internal scoring system (the scoring algorithm might change in the future)
     */
    score: number;
};

/**
 * location type
 */
export type type = 'ADDRESS' | 'PLACE' | 'STOP';

/**
 * # Street modes
 *
 * - `WALK`: Walking some or all of the way of the route.
 * - `BIKE`: Cycling for the entirety of the route or taking a bicycle onto the public transport (if enabled) and cycling from the arrival station to the destination.
 * - `BIKE_RENTAL`: Taking a rented, shared-mobility bike for part or the entirety of the route.
 * - `BIKE_TO_PARK`: Leaving the bicycle at the departure station and walking from the arrival station to the destination. This mode needs to be combined with at least one transit mode otherwise it behaves like an ordinary bicycle journey.
 * - `CAR`: Driving your own car the entirety of the route. This can be combined with transit, where will return routes with a Kiss & Ride component. This means that the car is not parked in a permanent parking area but rather the passenger is dropped off (for example, at an airport) and the driver continues driving the car away from the drop off location.
 * - `CAR_PARK` | `CAR_TO_PARK`: Driving a car to the park-and-ride facilities near a station and taking publictransport. This mode needs to be combined with at least one transit mode otherwise, it behaves like an ordinary car journey.
 * - `CAR_HAILING`: Using a car hailing app like Uber or Lyft to get to a train station or all the way to the destination.
 * - `CAR_PICKUP`: Walking to a pickup point along the road, driving to a drop-off point along the road, and walking the rest of the way. This can include various taxi-services or kiss & ride.
 * - `CAR_RENTAL`: Walk to a car rental point, drive to a car rental drop-off point and walk the rest of the way. This can include car rental at fixed locations or free-floating services.
 * - `FLEXIBLE`: Encompasses all types of on-demand and flexible transportation for example GTFS Flex or NeTEx Flexible Stop Places.
 * - `SCOOTER_RENTAL`: Walking to a scooter rental point, riding a scooter to a scooter rental drop-off point, and walking the rest of the way. This can include scooter rental at fixed locations or free-floating services.
 *
 * # Transit modes
 *
 * - `TRANSIT`: translates to `RAIL,SUBWAY,TRAM,BUS,FERRY,AIRPLANE,COACH`
 * - `TRAM`: trams
 * - `SUBWAY`: subway trains
 * - `FERRY`: ferries
 * - `AIRPLANE`: airline flights
 * - `BUS`: short distance buses (does not include `COACH`)
 * - `COACH`: long distance buses (does not include `BUS`)
 * - `RAIL`: translates to `HIGHSPEED_RAIL,LONG_DISTANCE_RAIL,NIGHT_RAIL,REGIONAL_RAIL,REGIONAL_FAST_RAIL`
 * - `METRO`: metro trains
 * - `HIGHSPEED_RAIL`: long distance high speed trains (e.g. TGV)
 * - `LONG_DISTANCE`: long distance inter city trains
 * - `NIGHT_RAIL`: long distance night trains
 * - `COACH`: long distance buses
 * - `REGIONAL_FAST_RAIL`: regional express routes that skip low traffic stops to be faster
 * - `REGIONAL_RAIL`: regional train
 *
 */
export type Mode = 'WALK' | 'BIKE' | 'CAR' | 'BIKE_RENTAL' | 'BIKE_TO_PARK' | 'CAR_TO_PARK' | 'CAR_HAILING' | 'CAR_SHARING' | 'CAR_PICKUP' | 'CAR_RENTAL' | 'FLEXIBLE' | 'SCOOTER_RENTAL' | 'TRANSIT' | 'TRAM' | 'SUBWAY' | 'FERRY' | 'AIRPLANE' | 'METRO' | 'BUS' | 'COACH' | 'RAIL' | 'HIGHSPEED_RAIL' | 'LONG_DISTANCE' | 'NIGHT_RAIL' | 'REGIONAL_FAST_RAIL' | 'REGIONAL_RAIL' | 'OTHER';

/**
 * - `NORMAL` - latitude / longitude coordinate or address
 * - `BIKESHARE` - bike sharing station
 * - `BIKEPARK` - bike parking
 * - `TRANSIT` - transit stop
 *
 */
export type VertexType = 'NORMAL' | 'BIKESHARE' | 'BIKEPARK' | 'TRANSIT';

export type Place = {
    /**
     * name of the transit stop / PoI / address
     */
    name: string;
    /**
     * The ID of the stop. This is often something that users don't care about.
     */
    stopId?: string;
    /**
     * latitude
     */
    lat: number;
    /**
     * longitude
     */
    lon: number;
    /**
     * level according to OpenStreetMap
     */
    level: number;
    /**
     * The offset from the scheduled arrival time of the boarding stop in this leg.
     * Scheduled time of arrival at boarding stop = endTime - arrivalDelay
     *
     */
    arrivalDelay?: number;
    /**
     * The offset from the scheduled departure time of the boarding stop in this leg.
     * Scheduled time of departure at boarding stop = startTime - departureDelay
     *
     */
    departureDelay?: number;
    /**
     * arrival time, format = unixtime in milliseconds
     */
    arrival?: number;
    /**
     * departure time, format = unixtime in milliseconds
     */
    departure?: number;
    /**
     * track/platform information, if available
     */
    track?: string;
    vertexType?: VertexType;
};

export type RelativeDirection = 'DEPART' | 'HARD_LEFT' | 'LEFT' | 'SLIGHTLY_LEFT' | 'CONTINUE' | 'SLIGHTLY_RIGHT' | 'RIGHT' | 'HARD_RIGHT' | 'CIRCLE_CLOCKWISE' | 'CIRCLE_COUNTERCLOCKWISE' | 'ELEVATOR' | 'UTURN_LEFT' | 'UTURN_RIGHT';

export type AbsoluteDirection = 'NORTH' | 'NORTHEAST' | 'EAST' | 'SOUTHEAST' | 'SOUTH' | 'SOUTHWEST' | 'WEST' | 'NORTHWEST';

export type StepInstruction = {
    relativeDirection: RelativeDirection;
    absoluteDirection: AbsoluteDirection;
    /**
     * The distance in meters that this step takes.
     */
    distance: number;
    /**
     * The name of the street.
     */
    streetName: string;
    /**
     * When exiting a highway or traffic circle, the exit name/number.
     */
    exit: string;
    /**
     * Indicates whether or not a street changes direction at an intersection.
     *
     */
    stayOn: boolean;
    /**
     * This step is on an open area, such as a plaza or train platform,
     * and thus the directions should say something like "cross"
     *
     */
    area: boolean;
    /**
     * The longitude of start of the step
     */
    lon: number;
    /**
     * The latitude of start of the step
     */
    lat: number;
};

export type FeedScopedId = {
    feedId: string;
    id: string;
};

export type EncodedPolyline = {
    /**
     * The encoded points of the polyline.
     */
    points: string;
    /**
     * The number of points in the string
     */
    length: number;
};

export type LevelEncodedPolyline = {
    /**
     * level where this segment starts, based on OpenStreetMap data
     */
    from_level: number;
    /**
     * level where this segment starts, based on OpenStreetMap data
     */
    to_level: number;
    /**
     * OpenStreetMap way index
     */
    osm_way?: number;
    polyline: EncodedPolyline;
};

export type Leg = {
    /**
     * Transport mode for this leg
     */
    mode: Mode;
    from: Place;
    to: Place;
    /**
     * Leg duration in seconds
     */
    duration: number;
    /**
     * leg departure time, format = unixtime in milliseconds
     */
    startTime: number;
    /**
     * leg arrival time, format = unixtime in milliseconds
     */
    endTime: number;
    /**
     * The offset from the scheduled departure time of the boarding stop in this leg.
     * Scheduled time of departure at boarding stop = startTime - departureDelay
     *
     */
    departureDelay: number;
    /**
     * The offset from the scheduled arrival time of the boarding stop in this leg.
     * Scheduled time of arrival at boarding stop = endTime - arrivalDelay
     *
     */
    arrivalDelay: number;
    /**
     * Whether there is real-time data about this leg
     */
    realTime: boolean;
    /**
     * The distance traveled while traversing this leg in meters.
     */
    distance: number;
    /**
     * For transit legs, if the rider should stay on the vehicle as it changes route names.
     */
    interlineWithPreviousLeg?: boolean;
    /**
     * For transit legs, the route of the bus or train being used.
     * For non-transit legs, the name of the street being traversed.
     *
     */
    route?: string;
    /**
     * For transit legs, the headsign of the bus or train being used.
     * For non-transit legs, null
     *
     */
    headsign?: string;
    agencyName?: string;
    agencyUrl?: string;
    routeColor?: string;
    routeTextColor?: string;
    routeType?: string;
    routeId?: string;
    agencyId?: string;
    tripId?: string;
    serviceDate?: string;
    routeShortName?: string;
    /**
     * Filename and line number where this trip is from
     */
    source?: string;
    /**
     * For transit legs, intermediate stops between the Place where the leg originates
     * and the Place where the leg ends. For non-transit legs, null.
     *
     */
    intermediateStops?: Array<Place>;
    legGeometry: EncodedPolyline;
    /**
     * Like `legGeometry`, but split at level changes
     */
    legGeometryWithLevels?: Array<LevelEncodedPolyline>;
    /**
     * A series of turn by turn instructions
     * used for walking, biking and driving.
     *
     */
    steps?: Array<StepInstruction>;
};

export type Itinerary = {
    /**
     * journey duration in seconds
     */
    duration: number;
    /**
     * journey departure time, format = unixtime in milliseconds
     */
    startTime: number;
    /**
     * journey arrival time, format = unixtime in milliseconds
     */
    endTime: number;
    /**
     * How much time is spent walking, in seconds.
     */
    walkTime: number;
    /**
     * How much time is spent on transit, in seconds.
     */
    transitTime: number;
    /**
     * How much time is spent waiting for transit to arrive, in seconds.
     */
    waitingTime: number;
    /**
     * How far the user has to walk, in meters.
     */
    walkDistance: number;
    /**
     * The number of transfers this trip has.
     */
    transfers: number;
    /**
     * Journey legs
     */
    legs: Array<Leg>;
};

/**
 * footpath from one location to another
 */
export type Footpath = {
    to: Place;
    /**
     * optional; missing if the GTFS did not contain a footpath
     * footpath duration in minutes according to GTFS (+heuristics)
     *
     */
    default?: number;
    /**
     * optional; missing if no path was found with the foot profile
     * footpath duration in minutes for the foot profile
     *
     */
    foot?: number;
    /**
     * optional; missing if no path was found with the wheelchair profile
     * footpath duration in minutes for the wheelchair profile
     *
     */
    wheelchair?: number;
    /**
     * optional; missing if no path was found with the wheelchair profile
     * true if the wheelchair path uses an elevator
     *
     */
    wheelchairUsesElevator?: boolean;
};

export type ReverseGeocodeData = {
    query: {
        /**
         * latitude, longitude in degrees
         */
        place: string;
    };
};

export type ReverseGeocodeResponse = (Array<Match>);

export type ReverseGeocodeError = unknown;

export type GeocodeData = {
    query: {
        /**
         * language tags as used in OpenStreetMap
         * (usually ISO 639-1, or ISO 639-2 if there's no ISO 639-1)
         *
         */
        language?: string;
        /**
         * the (potentially partially typed) address to resolve
         */
        text: string;
    };
};

export type GeocodeResponse = (Array<Match>);

export type GeocodeError = unknown;

export type PlanData = {
    query: {
        /**
         * Optional. Default is `false`.
         *
         * - `arriveBy=true`: the parameters `date` and `time` refer to the arrival time
         * - `arriveBy=false`: the parameters `date` and `time` refer to the departure time
         *
         */
        arriveBy?: boolean;
        /**
         * Optional. Defaults to the current date.
         *
         * Departure date ($arriveBy=false) / arrival date ($arriveBy=true), format: 06-28-2024
         *
         */
        date?: string;
        /**
         * latitude, longitude, level tuple in degrees or stop id
         */
        fromPlace: string;
        /**
         * The maximum travel time in hours.
         * If not provided, the routing to uses the value
         * hardcoded in the server which is usually quite high.
         *
         * *Warning*: Use with care. Setting this too low can lead to
         * optimal (e.g. the least transfers) journeys not being found.
         * If this value is too low to reach the destination at all,
         * it can lead to slow routing performance.
         *
         */
        maxHours?: number;
        /**
         * Optional. Default is 15min which is `900`.
         * Maximum time in seconds for the last street leg.
         *
         */
        maxPostTransitTime?: number;
        /**
         * Optional. Default is 15min which is `900`.
         * Maximum time in seconds for the first street leg.
         *
         */
        maxPreTransitTime?: number;
        /**
         * The maximum number of allowed transfers.
         * If not provided, the routing uses the server-side default value
         * which is hardcoded and very high to cover all use cases.
         *
         * *Warning*: Use with care. Setting this too low can lead to
         * optimal (e.g. the fastest) journeys not being found.
         * If this value is too low to reach the destination at all,
         * it can lead to slow routing performance.
         *
         */
        maxTransfers?: number;
        /**
         * Minimum transfer time for each transfer.
         */
        minTransferTime?: number;
        /**
         * A comma separated list of allowed modes.
         *
         * Default if not provided: `WALK,TRANSIT`
         *
         */
        mode?: Array<Mode>;
        /**
         * The minimum number of itineraries to compute.
         * This is only relevant if `timetableView=true`.
         * The default value is 5.
         *
         */
        numItineraries?: number;
        /**
         * Use the cursor to go to the next "page" of itineraries.
         * Copy the cursor from the last response and keep the original request as is.
         * This will enable you to search for itineraries in the next or previous time-window.
         *
         */
        pageCursor?: string;
        /**
         * Optional. Default is 2 hours which is `7200`.
         *
         * The length of the search-window in seconds. Default value two hours.
         *
         * - `arriveBy=true`: number of seconds between the earliest departure time and latest departure time
         * - `arriveBy=false`: number of seconds between the earliest arrival time and the latest arrival time
         *
         */
        searchWindow?: number;
        /**
         * Optional. Defaults to the current time.
         *
         * Meaning depending on `arriveBy`
         * - Departure time for `arriveBy=false`
         * - Arrival time for `arriveBy=true`
         *
         * Format:
         * - 12h format: 7:06pm
         * - 24h format: 19:06
         *
         */
        time?: string;
        /**
         * Optional. Default is `true`.
         *
         * Search for the best trip options within a time window.
         * If true two itineraries are considered optimal
         * if one is better on arrival time (earliest wins)
         * and the other is better on departure time (latest wins).
         * In combination with arriveBy this parameter cover the following use cases:
         *
         * `timetable=false` = waiting for the first transit departure/arrival is considered travel time:
         * - `arriveBy=true`: event (e.g. a meeting) starts at 10:00 am,
         * compute the best journeys that arrive by that time (maximizes departure time)
         * - `arriveBy=false`: event (e.g. a meeting) ends at 11:00 am,
         * compute the best journeys that depart after that time
         *
         * `timetable=true` = optimize "later departure" + "earlier arrival" and give all options over a time window:
         * - `arriveBy=true`: the time window around `date` and `time` refers to the arrival time window
         * - `arriveBy=false`: the time window around `date` and `time` refers to the departure time window
         *
         */
        timetableView?: boolean;
        /**
         * latitude, longitude, level tuple in degrees or stop id
         */
        toPlace: string;
        /**
         * Factor to multiply transfer times with.
         */
        transferTimeFactor?: number;
        /**
         * Whether the trip must be wheelchair accessible.
         */
        wheelchair?: boolean;
    };
};

export type PlanResponse = ({
    /**
     * the routing query
     */
    requestParameters: {
        [key: string]: (string);
    };
    /**
     * debug statistics
     */
    debugOutput: {
        [key: string]: (string);
    };
    /**
     * The time and date of travel
     */
    date: number;
    from: Place;
    to: Place;
    /**
     * list of itineraries
     */
    itineraries: Array<Itinerary>;
    /**
     * Use the cursor to get the previous page of results. Insert the cursor into the request and post it to get the previous page.
     * The previous page is a set of itineraries departing BEFORE the first itinerary in the result for a depart after search. When using the default sort order the previous set of itineraries is inserted before the current result.
     *
     */
    previousPageCursor: string;
    /**
     * Use the cursor to get the next page of results. Insert the cursor into the request and post it to get the next page.
     * The next page is a set of itineraries departing AFTER the last itinerary in this result.
     *
     */
    nextPageCursor: string;
});

export type PlanError = unknown;

export type FootpathsData = {
    query: {
        /**
         * location id
         */
        id: string;
    };
};

export type FootpathsResponse = ({
    place: Place;
    /**
     * all outgoing footpaths of this location
     */
    footpaths: Array<Footpath>;
});

export type FootpathsError = unknown;