import ProfileAppBar from "@/components/appbar/ProfileAppBar";
import AirportSearchModal from "@/components/modals/AirportSearchModal";
import AirportSelector from "@/components/selectors/AirportSelector";
import DateSelector from "@/components/selectors/DateSelector";
import FlightCard from "@/components/cards/FlightCard";
import AppColors from "@/constant/Colors";
import ApiManager from "@/services/api/apiManager";
import { SearchAirportItem } from "@/types/searchAirport";
import { Itinerary } from "@/types/searchFlight";
import { LinearGradient } from "expo-linear-gradient";
import { Plane } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const HomeScreen = () => {
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
  const [flights, setFlights] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleOriginPress = () => {
    console.log("Origin pressed, opening modal");
    setCurrentSelector("origin");
    setShowModal(true);
  };

  const handleDestinationPress = () => {
    console.log("Destination pressed, opening modal");
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

  const handleSearch = async () => {
    if (!originAirport || !destinationAirport || !departureDate) {
      toast.error("Missing Information", {
        description: "Please select origin, destination, and date",
      });
      return;
    }

    setLoading(true);
    setHasSearched(true);
    setFlights([]);

    try {
      // Format date as YYYY-MM-DD
      const formattedDate = departureDate.toISOString().split("T")[0];

      const response = await ApiManager.flights.searchFlights({
        originSkyId: originAirport.skyId,
        destinationSkyId: destinationAirport.skyId,
        originEntityId: originAirport.entityId,
        destinationEntityId: destinationAirport.entityId,
        date: formattedDate,
      });

      if (response.status && response.data.itineraries) {
        setFlights(response.data.itineraries);
        toast.success("Flights Found", {
          description: `${response.data.itineraries.length} flights available`,
        });
      } else {
        setFlights([]);
        toast.info("No Flights Found", {
          description: "Try different dates or airports",
        });
      }
    } catch (error) {
      console.error("Flight search error:", error);
      toast.error("Search Failed", {
        description: "Unable to search flights. Please try again.",
      });
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNotification = () => {
    toast.info("Notifications", {
      description: "No new notifications",
    });
  };

  const renderFlightItem = ({ item }: { item: Itinerary }) => (
    <FlightCard
      itinerary={item}
      onPress={() => {
        toast.info("Flight Selected", {
          description: `Price: ${item.price.formatted}`,
        });
      }}
    />
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
            Start Your Journey
          </Text>
          <Text className="text-sm font-poppins-regular text-textSecondary mt-2 text-center">
            Search for flights by selecting your origin, destination, and travel
            date
          </Text>
        </View>
      );
    }

    return (
      <View className="items-center justify-center py-16 px-6">
        <Plane size={64} color={AppColors.textSecondary} />
        <Text className="text-lg font-poppins-bold text-textPrimary mt-4 text-center">
          No Flights Found
        </Text>
        <Text className="text-sm font-poppins-regular text-textSecondary mt-2 text-center">
          Try searching with different dates or airports
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Gradient Background Circle */}
      <View
        className="absolute top-0 left-0 right-0"
        style={{
          height: 400,
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={[AppColors.primary, "transparent"]}
          style={{
            position: "absolute",
            top: -300,
            left: -100,
            right: -100,
            height: 500,
            borderRadius: 500,
          }}
        />
      </View>

      <SafeAreaView className="flex-1 mb-20">
        <FlatList
          data={flights}
          renderItem={renderFlightItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListHeaderComponent={
            <View>
              {/* Profile App Bar */}
              <ProfileAppBar
                name="Deshan Tharupathi"
                profileImage="https://avatar.iran.liara.run/public/50"
                onNotificationPress={handleNotification}
              />

              {/* Search Box Container */}
              <View className="px-5 mt-6 mb-6">
                <LinearGradient
                  colors={[AppColors.primary, AppColors.secondary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="p-5"
                  style={{
                    borderRadius: 24,
                  }}
                >
                  {/* Trip Type Tabs */}
                  <View className="flex-row mb-5">
                    <View className="bg-white/20 rounded-full p-1 flex-row">
                      <TouchableOpacity
                        className="bg-white rounded-full px-6 py-2"
                        activeOpacity={0.8}
                      >
                        <Text className="text-sm font-bold text-primary">
                          One way
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="px-6 py-2"
                        activeOpacity={0.8}
                      >
                        <Text className="text-sm font-semibold text-white/80">
                          Return
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Origin Airport Selector */}
                  <AirportSelector
                    label="From"
                    placeholder="Country, city, airport"
                    selectedAirport={originAirport}
                    onPress={handleOriginPress}
                    icon="airplane-outline"
                  />

                  {/* Destination Airport Selector */}
                  <AirportSelector
                    label="To"
                    placeholder="Country, city, airport"
                    selectedAirport={destinationAirport}
                    onPress={handleDestinationPress}
                    icon="location-outline"
                  />

                  {/* Date Selector */}
                  <DateSelector
                    label="When"
                    placeholder="Choose your dates"
                    selectedDate={departureDate}
                    onDateChange={setDepartureDate}
                    minimumDate={new Date()}
                  />

                  {/* Search Button */}
                  <TouchableOpacity
                    onPress={handleSearch}
                    activeOpacity={0.8}
                    disabled={loading}
                    className="bg-white rounded-2xl py-4 mt-3 flex-row items-center justify-center"
                  >
                    {loading ? (
                      <ActivityIndicator
                        size="small"
                        color={AppColors.primary}
                      />
                    ) : (
                      <Text className="text-base font-bold text-primary mr-2">
                        Search Flights
                      </Text>
                    )}
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              {/* Results Header */}
              {hasSearched && !loading && flights.length > 0 && (
                <View className="px-5 mb-4">
                  <Text className="text-xl font-bold text-textPrimary">
                    Available Flights
                  </Text>
                  <Text className="text-sm font-poppins-regular text-textSecondary">
                    {flights.length} flight{flights.length !== 1 ? "s" : ""}{" "}
                    found
                  </Text>
                </View>
              )}

              {/* Loading State */}
              {loading && (
                <View className="items-center justify-center py-16">
                  <ActivityIndicator size="large" color={AppColors.primary} />
                  <Text className="text-sm font-poppins-medium text-textSecondary mt-4">
                    Searching for best flights...
                  </Text>
                </View>
              )}
            </View>
          }
        />
      </SafeAreaView>

      {/* Airport Search Modal */}
      <AirportSearchModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSelectAirport={handleAirportSelect}
        title={
          currentSelector === "origin" ? "Select Origin" : "Select Destination"
        }
      />
    </View>
  );
};

export default HomeScreen;
