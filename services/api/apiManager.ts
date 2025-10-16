import { SearchAirportRequest, SearchAirportResponse } from "@/types/searchAirport";
import { SearchFlightRequest, SearchFlightResponse } from "@/types/searchFlight";
import { SearchFlightEverywhereRequest, SearchFlightEverywhereResponse } from "@/types/searchFlightEverywhere";
import ApiMethods from "./apiMethods";
import endpoints from "./endpoints";

export default class ApiManager {

    static flights = {
        /**
         * Search airport
         */
        searchAirport: async (params: SearchAirportRequest): Promise<SearchAirportResponse> => {
            try {
                const response = await ApiMethods.get<SearchAirportResponse>({
                    url: endpoints.FLIGHTS.SEARCH_AIRPORT,
                    params: params,
                });
                return response;

            } catch (error) {
                throw error;
            }
        },

        /**
         * Search flights
         */
        searchFlights: async (params: SearchFlightRequest): Promise<SearchFlightResponse> => {
            try {
                const response = await ApiMethods.get<SearchFlightResponse>({
                    url: endpoints.FLIGHTS.SEARCH_FLIGHTS,
                    params: params,
                });
                return response;

            } catch (error) {
                throw error;
            }
        },

        /**
         * Search flights everywhere
         */
        searchFlightEverywhere: async (params: SearchFlightEverywhereRequest): Promise<SearchFlightEverywhereResponse> => {
            try {
                const response = await ApiMethods.get<SearchFlightEverywhereResponse>({
                    url: endpoints.FLIGHTS.SEARCH_FLIGHT_EVERYWHERE,
                    params: params,
                });
                return response;

            } catch (error) {
                throw error;
            }
        }
    }
    
}