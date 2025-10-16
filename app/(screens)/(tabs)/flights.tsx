import AppTopBar from "@/components/appbar/AppTopBar";
import DestinationCard from "@/components/cards/DestinationCard";
import AdvancedFilterModal, {
  AdvancedFilterData,
} from "@/components/modals/AdvancedFilterModal";
import AirportSearchModal from "@/components/modals/AirportSearchModal";
import DateSelector from "@/components/selectors/DateSelector";
import AppColors from "@/constant/Colors";
import ApiManager from "@/services/api/apiManager";
import { SearchAirportItem } from "@/types/searchAirport";
import { FlightResult } from "@/types/searchFlightEverywhere";
import { MapPin, Plane, Search, SlidersHorizontal } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { toast } from "sonner-native";

const FlightsScreen = () => {
  const [originAirport, setOriginAirport] = useState<SearchAirportItem | null>(
    null
  );
  const [destinationAirport, setDestinationAirport] =
    useState<SearchAirportItem | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [currentSelector, setCurrentSelector] = useState<
    "origin" | "destination" | null
  >(null);
  const [showModal, setShowModal] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [advancedFilters, setAdvancedFilters] =
    useState<AdvancedFilterData | null>(null);
  const [destinations, setDestinations] = useState<FlightResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleOriginPress = () => {
    setCurrentSelector("origin");
    setShowModal(true);
  };

  const handleDestinationPress = () => {
    setCurrentSelector("destination");
    setShowModal(true);
  };

  const handleAirportSelect = (airport: SearchAirportItem) => {
    if (currentSelector === "origin") {
      setOriginAirport(airport);
    } else if (currentSelector === "destination") {
      setDestinationAirport(airport);
    }
    setShowModal(false);
  };

  const handleAdvancedFilterApply = (filters: AdvancedFilterData) => {
    setAdvancedFilters(filters);
  };

  const handleSearch = async () => {
    if (!originAirport) {
      toast.error("Missing Information", {
        description: "Please select origin airport",
      });
      return;
    }

    setLoading(true);
    setHasSearched(true);
    setDestinations([]);

    try {
      const formattedDate = departureDate 
        ? departureDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]; // Default to today
      const formattedReturnDate = advancedFilters?.returnDate
        ? advancedFilters.returnDate.toISOString().split("T")[0]
        : undefined;

      const response = await ApiManager.flights.searchFlightEverywhere({
        originEntityId: originAirport.entityId,
        destinationEntityId: destinationAirport?.entityId || "",
        travelDate: formattedDate,
        returnDate: formattedReturnDate,
        cabinClass: advancedFilters?.cabinClass || "economy",
        adults: advancedFilters?.adults.toString() || "1",
        journeyType: advancedFilters?.returnDate ? "round-trip" : "one-way",
      });

      if (response.status && response.data.results) {
        setDestinations(response.data.results);
        toast.success("Destinations Found", {
          description: `${response.data.results.length} destinations available`,
        });
      } else {
        setDestinations([]);
        toast.info("No Destinations Found", {
          description: "Try different dates or airports",
        });
      }
    } catch (error) {
      console.error("Flight search error:", error);
      toast.error("Search Failed", {
        description: "Unable to search flights. Please try again.",
      });
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  const renderDestinationCard = ({ item }: { item: FlightResult }) => (
    <DestinationCard destination={item} />
  );

  const renderEmptyState = () => {
    if (loading) {
      return null;
    }

    if (!hasSearched) {
      return (
        <View className="items-center justify-center py-16 px-6">
          <Plane size={64} color={AppColors.textSecondary} />
          <Text className="text-lg font-poppins-bold text-textPrimary mt-4 text-center">
            Discover Destinations
          </Text>
          <Text className="text-sm font-poppins-regular text-textSecondary mt-2 text-center">
            Search for flights to find the best destinations and prices
          </Text>
        </View>
      );
    }

    return (
      <View className="items-center justify-center py-16 px-6">
        <Plane size={64} color={AppColors.textSecondary} />
        <Text className="text-lg font-poppins-bold text-textPrimary mt-4 text-center">
          No Destinations Found
        </Text>
        <Text className="text-sm font-poppins-regular text-textSecondary mt-2 text-center">
          Try searching with different dates or airports
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white mb-20">
      {/* App Bar */}
      <AppTopBar title="Flight Search" />

      <FlatList
        data={destinations}
        renderItem={renderDestinationCard}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <View>
            {/* Search Form Container */}
            <View className="px-5 mt-4 mb-6">
              {/* Origin Airport Selector */}
              <View className="mb-3">
                <Text className="text-xs font-poppins-semibold text-textSecondary mb-2 ml-1">
                  Origin
                </Text>
                <TouchableOpacity
                  onPress={handleOriginPress}
                  activeOpacity={0.7}
                  className="bg-white rounded-xl p-4 flex-row items-center border border-gray-200"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                >
                  <View className="mr-3">
                    <Plane size={20} color={AppColors.textSecondary} />
                  </View>
                  <View className="flex-1">
                    {originAirport ? (
                      <>
                        <Text
                          className="text-base font-poppins-bold text-textPrimary"
                          numberOfLines={1}
                        >
                          {originAirport.presentation.title}
                        </Text>
                        <Text
                          className="text-sm text-textSecondary mt-0.5"
                          numberOfLines={1}
                        >
                          {originAirport.presentation.subtitle}
                        </Text>
                      </>
                    ) : (
                      <Text className="text-base text-textSecondary">
                        Country, city, airport
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              {/* Destination Airport Selector */}
              <View className="mb-3">
                <Text className="text-xs font-poppins-semibold text-textSecondary mb-2 ml-1">
                  To
                </Text>
                <TouchableOpacity
                  onPress={handleDestinationPress}
                  activeOpacity={0.7}
                  className="bg-white rounded-xl p-4 flex-row items-center border border-gray-200"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                >
                  <View className="mr-3">
                    <MapPin size={20} color={AppColors.textSecondary} />
                  </View>
                  <View className="flex-1">
                    {destinationAirport ? (
                      <>
                        <Text
                          className="text-base font-poppins-bold text-textPrimary"
                          numberOfLines={1}
                        >
                          {destinationAirport.presentation.title}
                        </Text>
                        <Text
                          className="text-sm text-textSecondary mt-0.5"
                          numberOfLines={1}
                        >
                          {destinationAirport.presentation.subtitle}
                        </Text>
                      </>
                    ) : (
                      <Text className="text-base text-textSecondary">
                        Country, city, airport
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              {/* Date Selector */}
              <View className="mb-3">
                <Text className="text-xs font-poppins-semibold text-textSecondary mb-2 ml-1">
                  When
                </Text>
                <DateSelector
                  placeholder="Choose your dates"
                  selectedDate={departureDate}
                  onDateChange={setDepartureDate}
                  minimumDate={new Date()}
                />
              </View>

              {/* Advanced Filter Button */}
              <TouchableOpacity
                onPress={() => setShowAdvancedFilter(true)}
                activeOpacity={0.7}
                className="bg-gray-50 rounded-xl py-3 px-4 flex-row items-center justify-center border border-gray-200 mb-3"
              >
                <SlidersHorizontal size={16} color={AppColors.primary} />
                <Text className="text-sm font-poppins-semibold text-primary ml-2">
                  Advanced Filters
                </Text>
                {advancedFilters && (
                  <View className="ml-2 bg-primary rounded-full w-2 h-2" />
                )}
              </TouchableOpacity>

              {/* Search Button */}
              <TouchableOpacity
                onPress={handleSearch}
                activeOpacity={0.8}
                disabled={loading}
                className="bg-primary rounded-2xl py-4 flex-row items-center justify-center"
                style={{
                  shadowColor: AppColors.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <Search size={20} color="white" />
                    <Text className="text-base font-poppins-bold text-white ml-2">
                      Search Destinations
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Results Header */}
            {hasSearched && !loading && destinations.length > 0 && (
              <View className="px-5 mb-4">
                <Text className="text-xl font-poppins-bold text-textPrimary">
                  Available Destinations
                </Text>
                <Text className="text-sm font-poppins-regular text-textSecondary">
                  {destinations.length} destination
                  {destinations.length !== 1 ? "s" : ""} found
                </Text>
              </View>
            )}

            {/* Loading State */}
            {loading && (
              <View className="items-center justify-center py-16">
                <ActivityIndicator size="large" color={AppColors.primary} />
                <Text className="text-sm font-poppins-medium text-textSecondary mt-4">
                  Searching for destinations...
                </Text>
              </View>
            )}
          </View>
        }
      />

      {/* Airport Search Modal */}
      <AirportSearchModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSelectAirport={handleAirportSelect}
        title={
          currentSelector === "origin" ? "Select Origin" : "Select Destination"
        }
      />

      {/* Advanced Filter Modal */}
      <AdvancedFilterModal
        visible={showAdvancedFilter}
        onClose={() => setShowAdvancedFilter(false)}
        onApply={handleAdvancedFilterApply}
        initialFilters={advancedFilters || undefined}
      />
    </View>
  );
};

export default FlightsScreen;
