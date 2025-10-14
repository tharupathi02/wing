import { SearchAirportRequest, SearchAirportResponse } from "@/types/searchAirport";
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
        }
    }
    
}