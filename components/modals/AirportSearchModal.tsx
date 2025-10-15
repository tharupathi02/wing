import ASSETS from "@/constant/Assets";
import AppColors from "@/constant/Colors";
import { useDebounce } from "@/hooks/useDebounce";
import { useAirportStore } from "@/store/useAirportStore";
import { SearchAirportItem } from "@/types/searchAirport";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface AirportSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectAirport: (airport: SearchAirportItem) => void;
  title?: string;
}

const AirportSearchModal: React.FC<AirportSearchModalProps> = ({
  visible,
  onClose,
  onSelectAirport,
  title = "Select Airport",
}) => {
  const { airports, loading, searchAirports } = useAirportStore();
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce((query: string) => {
    searchAirports(query);
  }, 500);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };

  const handleAirportSelect = (airport: SearchAirportItem) => {
    onSelectAirport(airport);
    setSearchQuery(""); // Reset search on close
    onClose();
  };

  const handleClose = () => {
    setSearchQuery(""); // Reset search on close
    onClose();
  };

  const renderAirportItem = ({ item }: { item: SearchAirportItem }) => (
    <TouchableOpacity
      onPress={() => handleAirportSelect(item)}
      activeOpacity={0.7}
      className="flex-row items-center p-4 border-b border-gray-100"
    >
      <Image
        source={ASSETS.PLANE.AIRPLANE_TOP}
        className="w-12 h-12"
        resizeMode="contain"
      />
      <View className="flex-1 ml-4">
        <Text
          className="text-base font-semibold text-textPrimary"
          numberOfLines={1}
        >
          {item.presentation.title}
        </Text>
        <Text className="text-sm text-textSecondary mt-0.5" numberOfLines={1}>
          {item.presentation.subtitle}
        </Text>
        <Text className="text-xs text-primary mt-1">
          {item.skyId} • {item.navigation.entityType}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={AppColors.textSecondary}
      />
    </TouchableOpacity>
  );

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View className="flex-1 items-center justify-center py-10">
          <ActivityIndicator size="large" color={AppColors.primary} />
          <Text className="text-sm text-textSecondary mt-4">
            Searching airports...
          </Text>
        </View>
      );
    }

    if (!searchQuery) {
      return (
        <View className="flex-1 items-center justify-center py-10">
          <Ionicons
            name="search-outline"
            size={48}
            color={AppColors.textSecondary}
          />
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
        <Ionicons
          name="airplane-outline"
          size={48}
          color={AppColors.textSecondary}
        />
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
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <View className="flex-1">
        {/* Backdrop - Pressable to close */}
        <Pressable className="flex-1" onPress={handleClose} />

        {/* Modal Content */}
        <View
          className="bg-white rounded-t-3xl"
          style={{
            height: "90%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 16,
          }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
            <Text className="text-xl font-bold text-textPrimary">{title}</Text>
            <TouchableOpacity
              onPress={handleClose}
              activeOpacity={0.7}
              className="w-8 h-8 items-center justify-center rounded-full bg-gray-100"
            >
              <Ionicons name="close" size={20} color={AppColors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View className="px-6 pt-4 pb-2">
            <View className="relative">
              <View className="absolute left-4 top-4 z-10">
                <Ionicons
                  name="search"
                  size={20}
                  color={AppColors.textSecondary}
                />
              </View>
              <TextInput
                className="bg-background border border-border rounded-xl pl-12 pr-4 py-4 text-base text-textPrimary"
                placeholder="Search airports, cities..."
                placeholderTextColor={AppColors.textSecondary}
                value={searchQuery}
                onChangeText={handleSearchChange}
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={true}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => handleSearchChange("")}
                  className="absolute right-4 top-4"
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={AppColors.textSecondary}
                  />
                </TouchableOpacity>
              )}
            </View>

            {/* Results Count */}
            {airports.length > 0 && (
              <Text className="text-sm text-textSecondary mt-3">
                {airports.length} {airports.length === 1 ? "result" : "results"}{" "}
                found
              </Text>
            )}
          </View>

          {/* Airport List */}
          <FlatList
            data={airports}
            keyExtractor={(item) => item.entityId}
            renderItem={renderAirportItem}
            ListEmptyComponent={renderEmptyState}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AirportSearchModal;
