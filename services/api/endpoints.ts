/**
 * API Endpoints
 *
 * This file contains all the API endpoints used in the application.
 * When adding new endpoints, follow the same structure.
 */

const BASE_URL = "https://sky-scrapper.p.rapidapi.com/api";

const FLIGHTS = {
  SEARCH_AIRPORT: "/v1/flights/searchAirport",
  SEARCH_FLIGHTS: "/v1/flights/searchFlights",
  SEARCH_FLIGHT_EVERYWHERE: "/v2/flights/searchFlightEverywhere",
};

export default {
  BASE_URL,
  FLIGHTS,
};
