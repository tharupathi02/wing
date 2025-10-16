import React, { useState, useMemo, useCallback, useRef, useImperativeHandle, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import AppColors from '@/constant/Colors';
import { useAirportStore } from '@/store/useAirportStore';
import { SearchAirportItem } from '@/types/searchAirport';
import { useDebounce } from '@/hooks/useDebounce';

// Define the ref methods we want to expose to the parent component
export interface AirportBottomSheetRefProps {
  expand: () => void;
  close: () => void;
}

interface AirportBottomSheetProps {
  onSelectAirport: (airport: SearchAirportItem) => void;
  title?: string;
  visible: boolean;
  onClose: () => void;
}

const AirportBottomSheet = React.forwardRef<
  AirportBottomSheetRefProps,
  AirportBottomSheetProps
>(({
  onSelectAirport,
  title = 'Select Airport',
  visible,
  onClose,
}, ref) => {
  // Internal bottom sheet reference
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { airports, loading, searchAirports } = useAirportStore();
  const [searchQuery, setSearchQuery] = useState('');
  const snapPoints = useMemo(() => ['75%', '90%'], []);

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    expand: () => {
      bottomSheetRef.current?.expand();
    },
    close: () => {
      bottomSheetRef.current?.close();
    }
  }));

  const debouncedSearch = useDebounce((query: string) => {
    searchAirports(query);
  }, 500);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };

  const handleAirportSelect = (airport: SearchAirportItem) => {
    bottomSheetRef.current?.close();
    setTimeout(() => onSelectAirport(airport), 300); // Call after animation is complete
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
      />
    ),
    []
  );

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (visible) {
      // Use requestAnimationFrame to ensure the bottom sheet ref is ready
      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(0);
      });
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  const renderAirportItem = ({ item }: { item: SearchAirportItem }) => (
    <TouchableOpacity
      onPress={() => handleAirportSelect(item)}
      activeOpacity={0.7}
      className="flex-row items-center p-4 border-b border-gray-100"
    >
      <View className="bg-accent rounded-full p-2 mr-3">
        <Ionicons name="airplane" size={20} color={AppColors.primary} />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-textPrimary" numberOfLines={1}>
          {item.presentation.title}
        </Text>
        <Text className="text-sm text-textSecondary mt-0.5" numberOfLines={1}>
          {item.presentation.subtitle}
        </Text>
        <Text className="text-xs text-primary mt-1">
          {item.skyId} • {item.navigation.entityType}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={AppColors.textSecondary} />
    </TouchableOpacity>
  );

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View className="flex-1 items-center justify-center py-10">
          <ActivityIndicator size="large" color={AppColors.primary} />
          <Text className="text-sm text-textSecondary mt-4">Searching airports...</Text>
        </View>
      );
    }

    if (!searchQuery) {
      return (
        <View className="flex-1 items-center justify-center py-10">
          <Ionicons name="search-outline" size={48} color={AppColors.textSecondary} />
          <Text className="text-base font-semibold text-textPrimary mt-4">
            Search for Airports
          </Text>
          <Text className="text-sm text-textSecondary mt-2 text-center px-6">
            Start typing to search for airports, cities, or locations
          </Text>
        </View>
      );
    }

    return (
      <View className="flex-1 items-center justify-center py-10">
        <Ionicons name="airplane-outline" size={48} color={AppColors.textSecondary} />
        <Text className="text-base font-semibold text-textPrimary mt-4">
          No Airports Found
        </Text>
        <Text className="text-sm text-textSecondary mt-2">
          Try searching with a different keyword
        </Text>
      </View>
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      enableContentPanningGesture={false}
    >
      <View className="flex-1 px-4 pt-2">
        {/* Header */}
        <Text className="text-xl font-bold text-textPrimary mb-4">
          {title}
        </Text>

        {/* Search Input */}
        <View className="relative mb-4">
          <View className="absolute left-4 top-4 z-10">
            <Ionicons name="search" size={20} color={AppColors.textSecondary} />
          </View>
          <TextInput
            className="bg-background border border-border rounded-xl pl-12 pr-4 py-4 text-base text-textPrimary"
            placeholder="Search airports, cities..."
            placeholderTextColor={AppColors.textSecondary}
            value={searchQuery}
            onChangeText={handleSearchChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => handleSearchChange('')}
              className="absolute right-4 top-4"
            >
              <Ionicons name="close-circle" size={20} color={AppColors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Results Count */}
        {airports.length > 0 && (
          <Text className="text-sm text-textSecondary mb-2">
            {airports.length} {airports.length === 1 ? 'result' : 'results'} found
          </Text>
        )}

        {/* Airport List */}
        <FlatList
          data={airports}
          keyExtractor={(item) => item.entityId}
          renderItem={renderAirportItem}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </BottomSheet>
  );
});

export default AirportBottomSheet;