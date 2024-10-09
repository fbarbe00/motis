// This file is auto-generated by @hey-api/openapi-ts

export const AreaSchema = {
    description: 'Administrative area',
    type: 'object',
    required: ['name', 'admin_level', 'matched'],
    properties: {
        name: {
            type: 'string',
            description: 'Name of the area'
        },
        admin_level: {
            type: 'number',
            description: `[OpenStreetMap \`admin_level\`](https://wiki.openstreetmap.org/wiki/Key:admin_level)
of the area
`
        },
        matched: {
            type: 'boolean',
            description: 'Whether this area was matched by the input text'
        },
        default: {
            type: 'boolean',
            description: 'Whether this area should be displayed as default area (area with admin level closest 7)'
        }
    }
} as const;

export const TokenSchema = {
    description: 'Matched token range (from index, length)',
    type: 'array',
    minItems: 2,
    maxItems: 2,
    items: {
        type: 'number'
    }
} as const;

export const MatchSchema = {
    description: 'GeoCoding match',
    type: 'object',
    required: ['type', 'name', 'id', 'lat', 'lon', 'level', 'tokens', 'areas', 'score'],
    properties: {
        type: {
            description: 'location type',
            type: 'string',
            enum: ['ADDRESS', 'PLACE', 'STOP']
        },
        tokens: {
            description: 'list of non-overlapping tokens that were matched',
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Token'
            }
        },
        name: {
            description: 'name of the location (transit stop / PoI / address)',
            type: 'string'
        },
        id: {
            description: 'unique ID of the location',
            type: 'string'
        },
        lat: {
            description: 'latitude',
            type: 'number'
        },
        lon: {
            description: 'longitude',
            type: 'number'
        },
        level: {
            description: `level according to OpenStreetMap
(at the moment only for public transport)
`,
            type: 'number'
        },
        street: {
            description: 'street name',
            type: 'string'
        },
        house_number: {
            description: 'house number',
            type: 'string'
        },
        zip: {
            description: 'zip code',
            type: 'string'
        },
        areas: {
            description: 'list of areas',
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Area'
            }
        },
        score: {
            description: 'score according to the internal scoring system (the scoring algorithm might change in the future)',
            type: 'number'
        }
    }
} as const;

export const ModeSchema = {
    description: `# Street modes

  - \`WALK\`: Walking some or all of the way of the route.
  - \`BIKE\`: Cycling for the entirety of the route or taking a bicycle onto the public transport (if enabled) and cycling from the arrival station to the destination.
  - \`BIKE_RENTAL\`: Taking a rented, shared-mobility bike for part or the entirety of the route.
  - \`BIKE_TO_PARK\`: Leaving the bicycle at the departure station and walking from the arrival station to the destination. This mode needs to be combined with at least one transit mode otherwise it behaves like an ordinary bicycle journey.
  - \`CAR\`: Driving your own car the entirety of the route. This can be combined with transit, where will return routes with a Kiss & Ride component. This means that the car is not parked in a permanent parking area but rather the passenger is dropped off (for example, at an airport) and the driver continues driving the car away from the drop off location.
  - \`CAR_PARK\` | \`CAR_TO_PARK\`: Driving a car to the park-and-ride facilities near a station and taking publictransport. This mode needs to be combined with at least one transit mode otherwise, it behaves like an ordinary car journey.
  - \`CAR_HAILING\`: Using a car hailing app like Uber or Lyft to get to a train station or all the way to the destination.
  - \`CAR_PICKUP\`: Walking to a pickup point along the road, driving to a drop-off point along the road, and walking the rest of the way. This can include various taxi-services or kiss & ride.
  - \`CAR_RENTAL\`: Walk to a car rental point, drive to a car rental drop-off point and walk the rest of the way. This can include car rental at fixed locations or free-floating services.
  - \`FLEXIBLE\`: Encompasses all types of on-demand and flexible transportation for example GTFS Flex or NeTEx Flexible Stop Places.
  - \`SCOOTER_RENTAL\`: Walking to a scooter rental point, riding a scooter to a scooter rental drop-off point, and walking the rest of the way. This can include scooter rental at fixed locations or free-floating services.

# Transit modes

  - \`TRANSIT\`: translates to \`RAIL,SUBWAY,TRAM,BUS,FERRY,AIRPLANE,COACH\`
  - \`TRAM\`: trams
  - \`SUBWAY\`: subway trains
  - \`FERRY\`: ferries
  - \`AIRPLANE\`: airline flights
  - \`BUS\`: short distance buses (does not include \`COACH\`)
  - \`COACH\`: long distance buses (does not include \`BUS\`)
  - \`RAIL\`: translates to \`HIGHSPEED_RAIL,LONG_DISTANCE_RAIL,NIGHT_RAIL,REGIONAL_RAIL,REGIONAL_FAST_RAIL\`
  - \`METRO\`: metro trains
  - \`HIGHSPEED_RAIL\`: long distance high speed trains (e.g. TGV)
  - \`LONG_DISTANCE\`: long distance inter city trains
  - \`NIGHT_RAIL\`: long distance night trains
  - \`COACH\`: long distance buses
  - \`REGIONAL_FAST_RAIL\`: regional express routes that skip low traffic stops to be faster
  - \`REGIONAL_RAIL\`: regional train
`,
    type: 'string',
    enum: ['WALK', 'BIKE', 'CAR', 'BIKE_RENTAL', 'BIKE_TO_PARK', 'CAR_TO_PARK', 'CAR_HAILING', 'CAR_SHARING', 'CAR_PICKUP', 'CAR_RENTAL', 'FLEXIBLE', 'SCOOTER_RENTAL', 'TRANSIT', 'TRAM', 'SUBWAY', 'FERRY', 'AIRPLANE', 'METRO', 'BUS', 'COACH', 'RAIL', 'HIGHSPEED_RAIL', 'LONG_DISTANCE', 'NIGHT_RAIL', 'REGIONAL_FAST_RAIL', 'REGIONAL_RAIL', 'OTHER']
} as const;

export const StopTimeSchema = {
    description: 'departure or arrival event at a stop',
    type: 'object',
    required: ['mode', 'time', 'delay', 'realTime', 'route', 'headsign', 'agencyId', 'agencyName', 'agencyUrl', 'routeColor', 'routeTextColor', 'routeType', 'routeId', 'tripId', 'serviceDate', 'routeShortName', 'source'],
    properties: {
        mode: {
            '$ref': '#/components/schemas/Mode',
            description: 'Transport mode for this leg'
        },
        time: {
            type: 'integer',
            description: `The offset from the scheduled arrival time of the boarding stop in this leg.
Scheduled time of arrival at boarding stop = endTime - arrivalDelay
`
        },
        delay: {
            type: 'integer',
            description: `The offset from the scheduled departure time of the boarding stop in this leg.
Scheduled time of departure at boarding stop = startTime - departureDelay
`
        },
        realTime: {
            description: 'Whether there is real-time data about this leg',
            type: 'boolean'
        },
        route: {
            description: `For transit legs, the route of the bus or train being used.
For non-transit legs, the name of the street being traversed.
`,
            type: 'string'
        },
        headsign: {
            description: `For transit legs, the headsign of the bus or train being used.
For non-transit legs, null
`,
            type: 'string'
        },
        agencyId: {
            type: 'string'
        },
        agencyName: {
            type: 'string'
        },
        agencyUrl: {
            type: 'string'
        },
        routeColor: {
            type: 'string'
        },
        routeTextColor: {
            type: 'string'
        },
        routeType: {
            type: 'string'
        },
        routeId: {
            type: 'string'
        },
        tripId: {
            type: 'string'
        },
        serviceDate: {
            type: 'string'
        },
        routeShortName: {
            type: 'string'
        },
        source: {
            description: 'Filename and line number where this trip is from',
            type: 'string'
        }
    }
} as const;

export const VertexTypeSchema = {
    type: 'string',
    description: `- \`NORMAL\` - latitude / longitude coordinate or address
- \`BIKESHARE\` - bike sharing station
- \`BIKEPARK\` - bike parking
- \`TRANSIT\` - transit stop
`,
    enum: ['NORMAL', 'BIKESHARE', 'BIKEPARK', 'TRANSIT']
} as const;

export const PlaceSchema = {
    type: 'object',
    required: ['name', 'lat', 'lon', 'level'],
    properties: {
        name: {
            description: 'name of the transit stop / PoI / address',
            type: 'string'
        },
        stopId: {
            description: "The ID of the stop. This is often something that users don't care about.",
            type: 'string'
        },
        lat: {
            description: 'latitude',
            type: 'number'
        },
        lon: {
            description: 'longitude',
            type: 'number'
        },
        level: {
            description: 'level according to OpenStreetMap',
            type: 'number'
        },
        arrivalDelay: {
            type: 'integer',
            description: `The offset from the scheduled arrival time of the boarding stop in this leg.
Scheduled time of arrival at boarding stop = endTime - arrivalDelay
`
        },
        departureDelay: {
            type: 'integer',
            description: `The offset from the scheduled departure time of the boarding stop in this leg.
Scheduled time of departure at boarding stop = startTime - departureDelay
`
        },
        arrival: {
            description: 'arrival time, format = unixtime in milliseconds',
            type: 'integer'
        },
        departure: {
            description: 'departure time, format = unixtime in milliseconds',
            type: 'integer'
        },
        track: {
            description: 'track/platform information, if available',
            type: 'string'
        },
        vertexType: {
            '$ref': '#/components/schemas/VertexType'
        }
    }
} as const;

export const RelativeDirectionSchema = {
    type: 'string',
    enum: ['DEPART', 'HARD_LEFT', 'LEFT', 'SLIGHTLY_LEFT', 'CONTINUE', 'SLIGHTLY_RIGHT', 'RIGHT', 'HARD_RIGHT', 'CIRCLE_CLOCKWISE', 'CIRCLE_COUNTERCLOCKWISE', 'ELEVATOR', 'UTURN_LEFT', 'UTURN_RIGHT']
} as const;

export const AbsoluteDirectionSchema = {
    type: 'string',
    enum: ['NORTH', 'NORTHEAST', 'EAST', 'SOUTHEAST', 'SOUTH', 'SOUTHWEST', 'WEST', 'NORTHWEST']
} as const;

export const StepInstructionSchema = {
    type: 'object',
    required: ['relativeDirection', 'absoluteDirection', 'distance', 'streetName', 'exit', 'stayOn', 'area', 'lon', 'lat'],
    properties: {
        relativeDirection: {
            '$ref': '#/components/schemas/RelativeDirection'
        },
        absoluteDirection: {
            '$ref': '#/components/schemas/AbsoluteDirection'
        },
        distance: {
            description: 'The distance in meters that this step takes.',
            type: 'number'
        },
        streetName: {
            description: 'The name of the street.',
            type: 'string'
        },
        exit: {
            description: 'When exiting a highway or traffic circle, the exit name/number.',
            type: 'string'
        },
        stayOn: {
            description: `Indicates whether or not a street changes direction at an intersection.
`,
            type: 'boolean'
        },
        area: {
            description: `This step is on an open area, such as a plaza or train platform,
and thus the directions should say something like "cross"
`,
            type: 'boolean'
        },
        lon: {
            description: 'The longitude of start of the step',
            type: 'number'
        },
        lat: {
            description: 'The latitude of start of the step',
            type: 'number'
        }
    }
} as const;

export const EncodedPolylineSchema = {
    type: 'object',
    required: ['points', 'length'],
    properties: {
        points: {
            description: 'The encoded points of the polyline.',
            type: 'string'
        },
        length: {
            description: 'The number of points in the string',
            type: 'integer'
        }
    }
} as const;

export const LevelEncodedPolylineSchema = {
    type: 'object',
    required: ['from_level', 'to_level', 'polyline'],
    properties: {
        from_level: {
            description: 'level where this segment starts, based on OpenStreetMap data',
            type: 'number'
        },
        to_level: {
            description: 'level where this segment starts, based on OpenStreetMap data',
            type: 'number'
        },
        osm_way: {
            description: 'OpenStreetMap way index',
            type: 'integer'
        },
        polyline: {
            '$ref': '#/components/schemas/EncodedPolyline'
        }
    }
} as const;

export const LegSchema = {
    type: 'object',
    required: ['mode', 'startTime', 'endTime', 'departureDelay', 'arrivalDelay', 'realTime', 'distance', 'duration', 'from', 'to', 'legGeometry'],
    properties: {
        mode: {
            '$ref': '#/components/schemas/Mode',
            description: 'Transport mode for this leg'
        },
        from: {
            '$ref': '#/components/schemas/Place'
        },
        to: {
            '$ref': '#/components/schemas/Place'
        },
        duration: {
            description: 'Leg duration in seconds',
            type: 'integer'
        },
        startTime: {
            type: 'integer',
            description: 'leg departure time, format = unixtime in milliseconds'
        },
        endTime: {
            type: 'integer',
            description: 'leg arrival time, format = unixtime in milliseconds'
        },
        departureDelay: {
            type: 'integer',
            description: `The offset from the scheduled departure time of the boarding stop in this leg.
Scheduled time of departure at boarding stop = startTime - departureDelay
`
        },
        arrivalDelay: {
            type: 'integer',
            description: `The offset from the scheduled arrival time of the boarding stop in this leg.
Scheduled time of arrival at boarding stop = endTime - arrivalDelay
`
        },
        realTime: {
            description: 'Whether there is real-time data about this leg',
            type: 'boolean'
        },
        distance: {
            description: 'The distance traveled while traversing this leg in meters.',
            type: 'number'
        },
        interlineWithPreviousLeg: {
            description: 'For transit legs, if the rider should stay on the vehicle as it changes route names.',
            type: 'boolean'
        },
        route: {
            description: `For transit legs, the route of the bus or train being used.
For non-transit legs, the name of the street being traversed.
`,
            type: 'string'
        },
        headsign: {
            description: `For transit legs, the headsign of the bus or train being used.
For non-transit legs, null
`,
            type: 'string'
        },
        agencyName: {
            type: 'string'
        },
        agencyUrl: {
            type: 'string'
        },
        routeColor: {
            type: 'string'
        },
        routeTextColor: {
            type: 'string'
        },
        routeType: {
            type: 'string'
        },
        routeId: {
            type: 'string'
        },
        agencyId: {
            type: 'string'
        },
        tripId: {
            type: 'string'
        },
        serviceDate: {
            type: 'string'
        },
        routeShortName: {
            type: 'string'
        },
        source: {
            description: 'Filename and line number where this trip is from',
            type: 'string'
        },
        intermediateStops: {
            description: `For transit legs, intermediate stops between the Place where the leg originates
and the Place where the leg ends. For non-transit legs, null.
`,
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Place'
            }
        },
        legGeometry: {
            '$ref': '#/components/schemas/EncodedPolyline'
        },
        legGeometryWithLevels: {
            description: 'Like `legGeometry`, but split at level changes',
            type: 'array',
            items: {
                '$ref': '#/components/schemas/LevelEncodedPolyline'
            }
        },
        steps: {
            description: `A series of turn by turn instructions
used for walking, biking and driving.
`,
            type: 'array',
            items: {
                '$ref': '#/components/schemas/StepInstruction'
            }
        }
    }
} as const;

export const ItinerarySchema = {
    type: 'object',
    required: ['duration', 'startTime', 'endTime', 'walkTime', 'transitTime', 'waitingTime', 'walkDistance', 'transfers', 'legs'],
    properties: {
        duration: {
            description: 'journey duration in seconds',
            type: 'integer'
        },
        startTime: {
            type: 'integer',
            description: 'journey departure time, format = unixtime in milliseconds'
        },
        endTime: {
            type: 'integer',
            description: 'journey arrival time, format = unixtime in milliseconds'
        },
        walkTime: {
            type: 'integer',
            description: 'How much time is spent walking, in seconds.'
        },
        transitTime: {
            type: 'integer',
            description: 'How much time is spent on transit, in seconds.'
        },
        waitingTime: {
            type: 'integer',
            description: 'How much time is spent waiting for transit to arrive, in seconds.'
        },
        walkDistance: {
            type: 'integer',
            description: 'How far the user has to walk, in meters.'
        },
        transfers: {
            type: 'integer',
            description: 'The number of transfers this trip has.'
        },
        legs: {
            description: 'Journey legs',
            type: 'array',
            items: {
                '$ref': '#/components/schemas/Leg'
            }
        }
    }
} as const;

export const FootpathSchema = {
    description: 'footpath from one location to another',
    type: 'object',
    required: ['to'],
    properties: {
        to: {
            '$ref': '#/components/schemas/Place'
        },
        default: {
            type: 'number',
            description: `optional; missing if the GTFS did not contain a footpath
footpath duration in minutes according to GTFS (+heuristics)
`
        },
        foot: {
            type: 'number',
            description: `optional; missing if no path was found with the foot profile
footpath duration in minutes for the foot profile
`
        },
        wheelchair: {
            type: 'number',
            description: `optional; missing if no path was found with the wheelchair profile 
footpath duration in minutes for the wheelchair profile
`
        },
        wheelchairUsesElevator: {
            type: 'boolean',
            description: `optional; missing if no path was found with the wheelchair profile
true if the wheelchair path uses an elevator
`
        }
    }
} as const;