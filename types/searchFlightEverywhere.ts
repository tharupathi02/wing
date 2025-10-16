/**
 * Types for Search Flight Everywhere API
 */

export interface SearchFlightEverywhereRequest {
  originEntityId: string;
  destinationEntityId?: string;
  travelDate?: string; // yyyy-mm-dd
  returnDate?: string; // yyyy-mm-dd
  adults?: string;
  cabinClass?: string;
  journeyType?: string;
}

export interface FlightQuote {
  price: string;
  rawPrice: number;
  direct: boolean;
}

export interface FlightQuotes {
  cheapest: FlightQuote;
  direct?: FlightQuote;
}

export interface Continent {
  code: string;
  name: string;
}

export interface Location {
  id: string;
  skyCode: string;
  name: string;
  type: string;
  continent: Continent;
}

export interface FlightImage {
  url: string;
}

export interface FlightRoutes {
  directFlightsAvailable: boolean;
}

export interface FlightContent {
  location: Location;
  flightQuotes: FlightQuotes;
  image: FlightImage;
  flightRoutes: FlightRoutes;
}

export interface FlightResult {
  id: string;
  type: string;
  content: FlightContent;
}

export interface SearchContext {
  status: string;
  sessionId: string;
  totalResults: number;
}

export interface SearchFlightEverywhereData {
  context: SearchContext;
  results: FlightResult[];
}

export interface SearchFlightEverywhereResponse {
  status: boolean;
  timestamp: number;
  data: SearchFlightEverywhereData;
}
