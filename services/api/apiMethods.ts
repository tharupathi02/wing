import axios, { AxiosInstance } from 'axios';
import endpoints from './endpoints';

// Types
export interface ApiResponse<T = any> {
    data: T;
    message: string;
    status: number;
    error?: string;
}

export interface ApiError {
    message: string;
    status: number;
    error: string;
    details?: any;
}

// Create Axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
    baseURL: endpoints.BASE_URL,
    timeout: 30000, // 30 seconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-rapidapi-key': '',
        'x-rapidapi-host': ''
    },
});

// Main API methods class
class ApiMethods {
    /**
     * Generic request method with error handling
     */
    static async apiRequest<T>({
        method,
        url,
        data,
        params,
        headers,
    }: {
        method: string;
        url: string;
        data?: any;
        params?: any;
        headers?: any;
    }): Promise<T> {
        try {
            const response = await axiosInstance({
                method,
                url,
                data,
                params,
                headers,
            });

            // Return just the data object from the response
            return response.data;
        } catch (error: any) {
            throw error.message;
        }
    }

    /**
     * GET request
     */
    static async get<T>({
        url,
        params,
        headers,
    }: {
        url: string;
        params?: any;
        headers?: any;
    }): Promise<T> {
        return this.apiRequest<T>({ method: 'GET', url, params, headers });
    }

    /**
     * POST request
     */
    static async post<T>({
        url,
        data,
        params,
        headers,
    }: {
        url: string;
        data: any;
        params?: any;
        headers?: any;
    }): Promise<T> {
        return this.apiRequest<T>({ method: 'POST', url, data, params, headers });
    }

    /**
     * PUT request
     */
    static async put<T>({
        url,
        data,
        params,
        headers,
    }: {
        url: string;
        data: any;
        params?: any;
        headers?: any;
    }): Promise<T> {
        return this.apiRequest<T>({ method: 'PUT', url, data, params, headers });
    }

    /**
     * DELETE request
     */
    static async delete<T>({
        url,
        data,
        params,
        headers,
    }: {
        url: string;
        data?: any;
        params?: any;
        headers?: any;
    }): Promise<T> {
        return this.apiRequest<T>({ method: 'DELETE', url, data, params, headers });
    }

    /**
     * PATCH request
     */
    static async patch<T>({
        url,
        data,
        params,
        headers,
    }: {
        url: string;
        data: any;
        params?: any;
        headers?: any;
    }): Promise<T> {
        return this.apiRequest<T>({ method: 'PATCH', url, data, params, headers });
    }
}

export default ApiMethods; 