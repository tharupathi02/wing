// Request Types
export interface SearchFlightRequest {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string; // Format: YYYY-MM-DD
}

// Response Types
export interface SearchFlightResponse {
  status: boolean;
  timestamp: number;
  sessionId: string;
  data: FlightData;
}

export interface FlightData {
  context: FlightContext;
  itineraries: Itinerary[];
  messages: any[];
  filterStats: FilterStats;
}

export interface FlightContext {
  status: string;
  sessionId: string;
  totalResults: number;
}

export interface Itinerary {
  id: string;
  price: Price;
  legs: Leg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: FarePolicy;
  eco?: EcoInfo;
  tags?: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

export interface Price {
  raw: number;
  formatted: string;
}

export interface Leg {
  id: string;
  origin: Location;
  destination: Location;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: Carriers;
  segments: Segment[];
}

export interface Location {
  id: string;
  name: string;
  displayCode: string;
  city: string;
  isHighlighted: boolean;
}

export interface Carriers {
  marketing: Carrier[];
  operationType: string;
}

export interface Carrier {
  id: number;
  logoUrl: string;
  name: string;
  alternateId?: string;
  allianceId?: number;
}

export interface Segment {
  id: string;
  origin: FlightPlace;
  destination: FlightPlace;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: CarrierDetail;
  operatingCarrier: CarrierDetail;
}

export interface FlightPlace {
  flightPlaceId: string;
  displayCode: string;
  parent: ParentPlace;
  name: string;
  type: string;
}

export interface ParentPlace {
  flightPlaceId: string;
  displayCode: string;
  name: string;
  type: string;
}

export interface CarrierDetail {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
}

export interface FarePolicy {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
}

export interface EcoInfo {
  ecoContenderDelta: number;
}

export interface FilterStats {
  duration: DurationFilter;
  airports: AirportGroup[];
  carriers: Carrier[];
  stopPrices: StopPrices;
}

export interface DurationFilter {
  min: number;
  max: number;
}

export interface AirportGroup {
  city: string;
  airports: Airport[];
}

export interface Airport {
  id: string;
  name: string;
}

export interface StopPrices {
  direct: StopPrice;
  one: StopPrice;
  twoOrMore: StopPrice;
}

export interface StopPrice {
  isPresent: boolean;
  formattedPrice?: string;
}
