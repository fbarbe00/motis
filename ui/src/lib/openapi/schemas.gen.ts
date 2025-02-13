// This file is auto-generated by @hey-api/openapi-ts

export const DurationSchema = {
    description: 'Object containing duration if a path was found or none if no path was found',
    type: 'object',
    required: [],
    properties: {
        duration: {
            type: 'number',
            description: 'duration in seconds if a path was found, otherwise missing'
        }
    }
} as const;

export const AreaSchema = {
    description: 'Administrative area',
    type: 'object',
    required: ['name', 'adminLevel', 'matched'],
    properties: {
        name: {
            type: 'string',
            description: 'Name of the area'
        },
        adminLevel: {
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
    required: ['type', 'name', 'id', 'lat', 'lon', 'tokens', 'areas', 'score'],
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
        houseNumber: {
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

export const PedestrianProfileSchema = {
    description: 'Different accessibility profiles for pedestrians.',
    type: 'string',
    enum: ['FOOT', 'WHEELCHAIR']
} as const;

export const ModeSchema = {
    description: `# Street modes

  - \`WALK\`
  - \`BIKE\`
  - \`RENTAL\` Experimental. Expect unannounced breaking changes (without version bumps).
  - \`CAR\`
  - \`CAR_PARKING\`
  - \`ODM\`

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
  - \`REGIONAL_FAST_RAIL\`: regional express routes that skip low traffic stops to be faster
  - \`REGIONAL_RAIL\`: regional train
`,
    type: 'string',
    enum: ['WALK', 'BIKE', 'RENTAL', 'CAR', 'CAR_PARKING', 'ODM', 'TRANSIT', 'TRAM', 'SUBWAY', 'FERRY', 'AIRPLANE', 'METRO', 'BUS', 'COACH', 'RAIL', 'HIGHSPEED_RAIL', 'LONG_DISTANCE', 'NIGHT_RAIL', 'REGIONAL_FAST_RAIL', 'REGIONAL_RAIL', 'OTHER']
} as const;

export const VertexTypeSchema = {
    type: 'string',
    description: `- \`NORMAL\` - latitude / longitude coordinate or address
- \`BIKESHARE\` - bike sharing station
- \`TRANSIT\` - transit stop
`,
    enum: ['NORMAL', 'BIKESHARE', 'TRANSIT']
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
        arrival: {
            description: 'arrival time',
            type: 'string',
            format: 'date-time'
        },
        departure: {
            description: 'departure time',
            type: 'string',
            format: 'date-time'
        },
        scheduledArrival: {
            description: 'scheduled arrival time',
            type: 'string',
            format: 'date-time'
        },
        scheduledDeparture: {
            description: 'scheduled departure time',
            type: 'string',
            format: 'date-time'
        },
        scheduledTrack: {
            description: 'scheduled track from the static schedule timetable dataset',
            type: 'string'
        },
        track: {
            description: `The current track/platform information, updated with real-time updates if available. 
Can be missing if neither real-time updates nor the schedule timetable contains track information.
`,
            type: 'string'
        },
        vertexType: {
            '$ref': '#/components/schemas/VertexType'
        }
    }
} as const;

export const StopTimeSchema = {
    description: 'departure or arrival event at a stop',
    type: 'object',
    required: ['place', 'mode', 'realTime', 'headsign', 'agencyId', 'agencyName', 'agencyUrl', 'tripId', 'routeShortName', 'source'],
    properties: {
        place: {
            '$ref': '#/components/schemas/Place',
            description: 'information about the stop place and time'
        },
        mode: {
            '$ref': '#/components/schemas/Mode',
            description: 'Transport mode for this leg'
        },
        realTime: {
            description: 'Whether there is real-time data about this leg',
            type: 'boolean'
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
        tripId: {
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

export const TripInfoSchema = {
    description: 'trip id and name',
    type: 'object',
    required: ['tripId', 'routeShortName'],
    properties: {
        tripId: {
            description: 'trip ID (dataset trip id prefixed with the dataset tag)',
            type: 'string'
        },
        routeShortName: {
            description: 'trip display name',
            type: 'string'
        }
    }
} as const;

export const TripSegmentSchema = {
    description: 'trip segment between two stops to show a trip on a map',
    type: 'object',
    required: ['trips', 'mode', 'distance', 'from', 'to', 'departure', 'arrival', 'scheduledArrival', 'scheduledDeparture', 'realTime', 'polyline'],
    properties: {
        trips: {
            type: 'array',
            items: {
                '$ref': '#/components/schemas/TripInfo'
            }
        },
        routeColor: {
            type: 'string'
        },
        mode: {
            '$ref': '#/components/schemas/Mode',
            description: 'Transport mode for this leg'
        },
        distance: {
            type: 'number',
            description: 'distance in meters'
        },
        from: {
            '$ref': '#/components/schemas/Place'
        },
        to: {
            '$ref': '#/components/schemas/Place'
        },
        departure: {
            description: 'departure time',
            type: 'string',
            format: 'date-time'
        },
        arrival: {
            description: 'arrival time',
            type: 'string',
            format: 'date-time'
        },
        scheduledDeparture: {
            description: 'scheduled departure time',
            type: 'string',
            format: 'date-time'
        },
        scheduledArrival: {
            description: 'scheduled arrival time',
            type: 'string',
            format: 'date-time'
        },
        realTime: {
            description: 'Whether there is real-time data about this leg',
            type: 'boolean'
        },
        polyline: {
            description: 'Google polyline encoded coordinate sequence (with precision 7) where the trip travels on this segment.',
            type: 'string'
        }
    }
} as const;

export const DirectionSchema = {
    type: 'string',
    enum: ['DEPART', 'HARD_LEFT', 'LEFT', 'SLIGHTLY_LEFT', 'CONTINUE', 'SLIGHTLY_RIGHT', 'RIGHT', 'HARD_RIGHT', 'CIRCLE_CLOCKWISE', 'CIRCLE_COUNTERCLOCKWISE', 'STAIRS', 'ELEVATOR', 'UTURN_LEFT', 'UTURN_RIGHT']
} as const;

export const EncodedPolylineSchema = {
    type: 'object',
    required: ['points', 'length'],
    properties: {
        points: {
            description: 'The encoded points of the polyline using the Google polyline encoding with precision 7.',
            type: 'string'
        },
        length: {
            description: 'The number of points in the string',
            type: 'integer'
        }
    }
} as const;

export const StepInstructionSchema = {
    type: 'object',
    required: ['fromLevel', 'toLevel', 'polyline', 'relativeDirection', 'distance', 'streetName', 'exit', 'stayOn', 'area'],
    properties: {
        relativeDirection: {
            '$ref': '#/components/schemas/Direction'
        },
        distance: {
            description: 'The distance in meters that this step takes.',
            type: 'number'
        },
        fromLevel: {
            description: 'level where this segment starts, based on OpenStreetMap data',
            type: 'number'
        },
        toLevel: {
            description: 'level where this segment starts, based on OpenStreetMap data',
            type: 'number'
        },
        osmWay: {
            description: 'OpenStreetMap way index',
            type: 'integer'
        },
        polyline: {
            '$ref': '#/components/schemas/EncodedPolyline'
        },
        streetName: {
            description: 'The name of the street.',
            type: 'string'
        },
        exit: {
            description: `Not implemented!
When exiting a highway or traffic circle, the exit name/number.
`,
            type: 'string'
        },
        stayOn: {
            description: `Not implemented!
Indicates whether or not a street changes direction at an intersection.
`,
            type: 'boolean'
        },
        area: {
            description: `Not implemented!
This step is on an open area, such as a plaza or train platform,
and thus the directions should say something like "cross"
`,
            type: 'boolean'
        }
    }
} as const;

export const RentalFormFactorSchema = {
    type: 'string',
    enum: ['BICYCLE', 'CARGO_BICYCLE', 'CAR', 'MOPED', 'SCOOTER_STANDING', 'SCOOTER_SEATED', 'OTHER']
} as const;

export const RentalPropulsionTypeSchema = {
    type: 'string',
    enum: ['HUMAN', 'ELECTRIC_ASSIST', 'ELECTRIC', 'COMBUSTION', 'COMBUSTION_DIESEL', 'HYBRID', 'PLUG_IN_HYBRID', 'HYDROGEN_FUEL_CELL']
} as const;

export const RentalReturnConstraintSchema = {
    type: 'string',
    enum: ['NONE', 'ANY_STATION', 'ROUNDTRIP_STATION']
} as const;

export const RentalSchema = {
    description: 'Vehicle rental',
    type: 'object',
    required: ['systemId'],
    properties: {
        systemId: {
            type: 'string',
            description: 'Vehicle share system ID'
        },
        systemName: {
            type: 'string',
            description: 'Vehicle share system name'
        },
        url: {
            type: 'string',
            description: 'URL of the vehicle share system'
        },
        stationName: {
            type: 'string',
            description: 'Name of the station'
        },
        fromStationName: {
            type: 'string',
            description: 'Name of the station where the vehicle is picked up (empty for free floating vehicles)'
        },
        toStationName: {
            type: 'string',
            description: 'Name of the station where the vehicle is returned (empty for free floating vehicles)'
        },
        rentalUriAndroid: {
            type: 'string',
            description: 'Rental URI for Android (deep link to the specific station or vehicle)'
        },
        rentalUriIOS: {
            type: 'string',
            description: 'Rental URI for iOS (deep link to the specific station or vehicle)'
        },
        rentalUriWeb: {
            type: 'string',
            description: 'Rental URI for web (deep link to the specific station or vehicle)'
        },
        formFactor: {
            '$ref': '#/components/schemas/RentalFormFactor'
        },
        propulsionType: {
            '$ref': '#/components/schemas/RentalPropulsionType'
        },
        returnConstraint: {
            '$ref': '#/components/schemas/RentalReturnConstraint'
        }
    }
} as const;

export const ODMTypeSchema = {
    type: 'string',
    enum: ['TAXI', 'RIDE_SHARING']
} as const;

export const ODMSchema = {
    description: 'Vehicle with driver, e.g., taxi',
    type: 'object',
    required: ['systemId'],
    properties: {
        systemId: {
            type: 'string',
            description: 'ODM system ID'
        },
        systemName: {
            type: 'string',
            description: 'ODM system name'
        },
        url: {
            type: 'string',
            description: 'URL of the ODM system'
        },
        companyName: {
            type: 'string',
            description: 'Name of company that offers the service'
        },
        odmUriAndroid: {
            type: 'string',
            description: 'ODM URI for Android (deep link to the specific station or vehicle)'
        },
        odmUriIOS: {
            type: 'string',
            description: 'ODM URI for iOS (deep link to the specific station or vehicle)'
        },
        odmUriWeb: {
            type: 'string',
            description: 'ODM URI for web (deep link to the specific station or vehicle)'
        },
        odmType: {
            '$ref': '#/components/schemas/ODMType'
        }
    }
} as const;

export const LegSchema = {
    type: 'object',
    required: ['mode', 'startTime', 'endTime', 'scheduledStartTime', 'scheduledEndTime', 'realTime', 'duration', 'from', 'to', 'legGeometry'],
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
            description: `Leg duration in seconds

If leg is footpath:
  The footpath duration is derived from the default footpath
  duration using the query parameters \`transferTimeFactor\` and
  \`additionalTransferTime\` as follows:
  \`leg.duration = defaultDuration * transferTimeFactor + additionalTransferTime.\`
  In case the defaultDuration is needed, it can be calculated by
  \`defaultDuration = (leg.duration - additionalTransferTime) / transferTimeFactor\`.
  Note that the default values are \`transferTimeFactor = 1\` and
  \`additionalTransferTime = 0\` in case they are not explicitly
  provided in the query.
`,
            type: 'integer'
        },
        startTime: {
            type: 'string',
            format: 'date-time',
            description: 'leg departure time'
        },
        endTime: {
            type: 'string',
            format: 'date-time',
            description: 'leg arrival time'
        },
        scheduledStartTime: {
            type: 'string',
            format: 'date-time',
            description: 'scheduled leg departure time'
        },
        scheduledEndTime: {
            type: 'string',
            format: 'date-time',
            description: 'scheduled leg arrival time'
        },
        realTime: {
            description: 'Whether there is real-time data about this leg',
            type: 'boolean'
        },
        distance: {
            description: 'For non-transit legs the distance traveled while traversing this leg in meters.',
            type: 'number'
        },
        interlineWithPreviousLeg: {
            description: 'For transit legs, if the rider should stay on the vehicle as it changes route names.',
            type: 'boolean'
        },
        headsign: {
            description: `For transit legs, the headsign of the bus or train being used.
For non-transit legs, null
`,
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
        agencyName: {
            type: 'string'
        },
        agencyUrl: {
            type: 'string'
        },
        agencyId: {
            type: 'string'
        },
        tripId: {
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
        steps: {
            description: `A series of turn by turn instructions
used for walking, biking and driving.
`,
            type: 'array',
            items: {
                '$ref': '#/components/schemas/StepInstruction'
            }
        },
        rental: {
            '$ref': '#/components/schemas/Rental'
        },
        odm: {
            '$ref': '#/components/schemas/ODM'
        }
    }
} as const;

export const ItinerarySchema = {
    type: 'object',
    required: ['duration', 'startTime', 'endTime', 'transfers', 'legs'],
    properties: {
        duration: {
            description: 'journey duration in seconds',
            type: 'integer'
        },
        startTime: {
            type: 'string',
            format: 'date-time',
            description: 'journey departure time'
        },
        endTime: {
            type: 'string',
            format: 'date-time',
            description: 'journey arrival time'
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
            description: `optional; missing if no path was found (timetable / osr)
footpath duration in minutes for the foot profile
`
        },
        footRouted: {
            type: 'number',
            description: `optional; missing if no path was found with foot routing
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