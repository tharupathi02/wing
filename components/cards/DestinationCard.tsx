import AppColors from "@/constant/Colors";
import { FlightResult } from "@/types/searchFlightEverywhere";
import { LinearGradient } from "expo-linear-gradient";
import { MapPin, Plane } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface DestinationCardProps {
  destination: FlightResult;
  onPress?: () => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onPress,
}) => {
  const { content } = destination;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="mx-5 mb-4 rounded-3xl overflow-hidden"
    >
      <View className="relative h-64">
        {/* Background Image */}
        <Image
          source={{ uri: content.image.url }}
          className="w-full h-full"
          resizeMode="cover"
        />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.85)"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute inset-0"
        />

        {/* Top Row: Continent and Location Type */}
        <View className="absolute top-0 left-0 right-0 p-5">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center bg-secondary rounded-full px-3 py-1">
              <MapPin size={14} color="white" />
              <Text className="text-white text-xs font-medium ml-1">
                {content.location.continent.name}
              </Text>
            </View>
            <View className="bg-primary rounded-full px-3 py-1">
              <Text className="text-white text-xs font-medium">
                {content.location.type}
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Content */}
        <View className="absolute bottom-0 left-0 right-0 p-5">
          {/* Middle Row: Location Name and Direct Available */}
          <View className="flex-row items-center mb-2">
            <Text className="text-white text-[24px] font-bold flex-1 mr-3">
              {content.location.name}
            </Text>
          </View>

          {/* Bottom Row: Cheapest Price and Direct Flight */}
          <View className="flex-row items-center justify-between">
            {/* Cheapest Price */}
            {content.flightQuotes && content.flightQuotes.cheapest && (
              <View className="flex-col">
                <Text className="text-white text-xl font-bold">
                  {content.flightQuotes.cheapest.price}
                </Text>
                <Text className="text-white text-sm font-medium">Cheapest</Text>
                {!content.flightQuotes.cheapest.direct && (
                  <Text className="text-white/60 text-xs font-medium">
                    with stops
                  </Text>
                )}
              </View>
            )}

            {content.flightRoutes &&
              content.flightRoutes.directFlightsAvailable && (
                <View className="bg-accent rounded-full px-3 py-2 flex-row items-center">
                  <Plane size={14} color={AppColors.primary} />
                  <Text className="text-primary text-xs font-medium ml-1">
                    Direct Available
                  </Text>
                </View>
              )}

            {/* Direct Flight */}
            {content.flightQuotes && content.flightQuotes.direct && (
              <View className="flex-col items-end">
                <Text className="text-white text-xl font-bold">
                  {content.flightQuotes.direct.price}
                </Text>
                <Text className="text-white text-sm font-medium">Direct</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DestinationCard;
