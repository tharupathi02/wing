import { create } from 'zustand';
import ApiManager from '@/services/api/apiManager';
import { SearchAirportItem } from '@/types/searchAirport';

interface AirportState {
  airports: SearchAirportItem[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  
  // Actions
  searchAirports: (query: string, locale?: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  clearAirports: () => void;
  clearError: () => void;
}

export const useAirportStore = create<AirportState>((set) => ({
  airports: [],
  loading: false,
  error: null,
  searchQuery: '',

  searchAirports: async (query: string, locale: string = 'en-US') => {
    if (!query || query.trim().length < 2) {
      set({ airports: [], error: null });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await ApiManager.flights.searchAirport({
        query: query.trim(),
        locale,
      });

      if (response.status && response.data) {
        set({ airports: response.data, loading: false, error: null });
      } else {
        set({ airports: [], loading: false, error: 'No airports found' });
      }
    } catch (error: any) {
      set({
        airports: [],
        loading: false,
        error: error?.message || 'Failed to search airports',
      });
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  clearAirports: () => {
    set({ airports: [], error: null, searchQuery: '' });
  },

  clearError: () => {
    set({ error: null });
  },
}));
