export interface SearchAirportRequest {
  query: string;
  locale: string;
}

export interface SearchAirportPresentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

export interface SearchAirportRelevantFlightParams {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
}

export interface SearchAirportRelevantHotelParams {
  entityId: string;
  entityType: string;
  localizedName: string;
}

export interface SearchAirportNavigation {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: SearchAirportRelevantFlightParams;
  relevantHotelParams: SearchAirportRelevantHotelParams;
}

export interface SearchAirportItem {
  skyId: string;
  entityId: string;
  presentation: SearchAirportPresentation;
  navigation: SearchAirportNavigation;
}

export interface SearchAirportResponse {
  status: boolean;
  timestamp: number;
  data: SearchAirportItem[];
}