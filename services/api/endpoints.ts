/**
 * API Endpoints
 *
 * This file contains all the API endpoints used in the application.
 * When adding new endpoints, follow the same structure.
 */

const BASE_URL = "https://sky-scrapper.p.rapidapi.com/api/v1";

const FLIGHTS = {
  SEARCH_AIRPORT: "/flights/searchAirport",
  SEARCH_FLIGHTS: "/flights/searchFlights",
};

export default {
  BASE_URL,
  FLIGHTS,
};
