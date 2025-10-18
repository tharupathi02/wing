import AppTopBar from '@/components/appbar/AppTopBar'
import AirportCard from '@/components/cards/AirportCard'
import AppColors from '@/constant/Colors'
import { useDebounce } from '@/hooks/useDebounce'
import { useAirportStore } from '@/store/useAirportStore'
import { SearchAirportItem } from '@/types/searchAirport'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { ActivityIndicator, FlatList, Text, TextInput, View } from 'react-native'
import { toast } from 'sonner-native'

const AirportsScreen = () => {
  const { airports, loading, error, searchQuery, searchAirports, setSearchQuery } = useAirportStore()
  const [inputValue, setInputValue] = useState('')

  // Debounced search function
  /**
   * Debounced search function
   * @param query - The search query
   * @param delay - The delay in milliseconds
   * @returns The debounced search function
   * This function is used to debounce the search function
   */
  const debouncedSearch = useDebounce(
    (query: string) => {
      searchAirports(query)
    },
    500 // 500ms delay
  )

  const handleSearchChange = (text: string) => {
    setInputValue(text)
    setSearchQuery(text)
    debouncedSearch(text)
  }

  const handleAirportPress = (airport: SearchAirportItem) => {
    toast.success('Airport Selected', {
      description: `${airport.presentation.title} - ${airport.skyId}`
    })
    console.log('Selected airport:', airport)
  }

  const renderEmptyState = () => {
    if (loading) return null
    
    if (error) {
      return (
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="alert-circle-outline" size={64} color={AppColors.textSecondary} />
          <Text className="text-lg font-semibold text-textPrimary mt-4 text-center">
            Error
          </Text>
          <Text className="text-sm text-textSecondary mt-2 text-center">
            {error}
          </Text>
        </View>
      )
    }

    if (!searchQuery) {
      return (
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="search-outline" size={64} color={AppColors.textSecondary} />
          <Text className="text-lg font-semibold text-textPrimary mt-4 text-center">
            Search for Airports
          </Text>
          <Text className="text-sm text-textSecondary mt-2 text-center">
            Start typing to search for airports, cities, or locations
          </Text>
        </View>
      )
    }

    return (
      <View className="flex-1 items-center justify-center px-6">
        <Ionicons name="airplane-outline" size={64} color={AppColors.textSecondary} />
        <Text className="text-lg font-semibold text-textPrimary mt-4 text-center">
          No Airports Found
        </Text>
        <Text className="text-sm text-textSecondary mt-2 text-center">
          Try searching with a different keyword
        </Text>
      </View>
    )
  }

  const renderFooter = () => {
    if (!loading) return null
    return (
      <View className="py-4">
        <ActivityIndicator size="large" color={AppColors.primary} />
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white mb-20">
      <AppTopBar
        title="Airports"
        showBackButton={false}
      />
      
      {/* Search Input */}
      <View className="px-4 pt-4 pb-2 bg-white">
        <View className="relative">
          <View className="absolute left-4 top-4 z-10">
            <Ionicons name="search" size={20} color={AppColors.textSecondary} />
          </View>
          <TextInput
            className="bg-white border border-border rounded-xl pl-12 pr-4 py-4 text-base text-textPrimary"
            placeholder="Search airports, cities..."
            placeholderTextColor={AppColors.textSecondary}
            value={inputValue}
            onChangeText={handleSearchChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {inputValue.length > 0 && (
            <View className="absolute right-4 top-4">
              <Ionicons 
                name="close-circle" 
                size={20} 
                color={AppColors.textSecondary}
                onPress={() => handleSearchChange('')}
              />
            </View>
          )}
        </View>
      </View>

      {/* Results Count */}
      {airports.length > 0 && (
        <View className="px-4 py-2 bg-white border-b border-border">
          <Text className="text-sm text-textSecondary">
            {airports.length} {airports.length === 1 ? 'result' : 'results'} found
          </Text>
        </View>
      )}

      {/* Airport List */}
      <FlatList
        data={airports}
        keyExtractor={(item) => item.entityId}
        renderItem={({ item }) => (
          <AirportCard airport={item} />
        )}
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default AirportsScreen