import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Clock, Plane, MoveRight, ArrowLeftRight } from "lucide-react-native";
import AppColors from "@/constant/Colors";
import { Itinerary } from "@/types/searchFlight";
import { LinearGradient } from "expo-linear-gradient";
import ASSETS from "@/constant/Assets";

interface FlightCardProps {
  itinerary: Itinerary;
  onPress?: () => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ itinerary, onPress }) => {
  const outboundLeg = itinerary.legs[0];
  const returnLeg = itinerary.legs[1];

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderLegInfo = (leg: any, isReturn: boolean = false) => (
    <View className="mb-4">
      {/* Route Header */}
      <View className="flex-row items-center mb-3">
        <View className="flex-row items-center flex-1">
          {isReturn ? (
            <ArrowLeftRight
              size={16}
              color={AppColors.primary}
            />
          ) : (
            <MoveRight
              size={16}
              color={AppColors.primary}
            />
          )}
          <Text className="text-xs font-poppins-semibold text-primary ml-1">
            {isReturn ? "Return Flight" : "Outbound Flight"}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Clock size={14} color={AppColors.textSecondary} />
          <Text className="text-xs font-poppins-medium text-textSecondary ml-1">
            {formatDuration(leg.durationInMinutes)}
          </Text>
        </View>
      </View>

      {/* Flight Details */}
      <View className="flex-row items-center justify-between">
        {/* Origin */}
        <View className="flex-1">
          <Text className="text-2xl font-poppins-bold text-textPrimary">
            {formatTime(leg.departure)}
          </Text>
          <Text className="text-sm font-poppins-semibold text-textPrimary mt-1">
            {leg.origin.displayCode}
          </Text>
          <Text className="text-xs font-poppins-regular text-textSecondary mt-0.5">
            {leg.origin.city}
          </Text>
        </View>

        {/* Flight Path */}
        <View className="flex-1 items-center px-2">
          <View>
            <Text className="text-xs font-poppins-medium text-primary">
              {}
            </Text>
          </View>
          <View className="flex-row items-center justify-center w-full">
            <Image
              source={ASSETS.PLANE.AIRPLANE_SIDE}
              className="w-36 h-12"
              resizeMode="contain"
            />
          </View>
          <View className="mt-2 bg-accent px-3 py-1 rounded-full">
            <Text className="text-xs font-poppins-medium text-primary">
              {leg.stopCount === 0
                ? "Direct"
                : `${leg.stopCount} Stop${leg.stopCount > 1 ? "s" : ""}`}
            </Text>
          </View>
        </View>

        {/* Destination */}
        <View className="flex-1 items-end">
          <Text className="text-2xl font-poppins-bold text-textPrimary">
            {formatTime(leg.arrival)}
          </Text>
          <Text className="text-sm font-poppins-semibold text-textPrimary mt-1">
            {leg.destination.displayCode}
          </Text>
          <Text className="text-xs font-poppins-regular text-textSecondary mt-0.5">
            {leg.destination.city}
          </Text>
        </View>
      </View>

      {/* Airline Info */}
      <View className="flex-row items-center mt-3 bg-gray-50 rounded-xl p-3">
        {leg.carriers.marketing[0]?.logoUrl ? (
          <Image
            source={{ uri: leg.carriers.marketing[0].logoUrl }}
            className="w-8 h-8 rounded-md mr-3"
            resizeMode="contain"
          />
        ) : (
          <View className="w-8 h-8 bg-accent rounded-md items-center justify-center mr-3">
            <Plane size={16} color={AppColors.primary} />
          </View>
        )}
        <View className="flex-1">
          <Text
            className="text-xs font-poppins-semibold text-textPrimary"
            numberOfLines={1}
          >
            {leg.carriers.marketing[0]?.name || "Airline"}
          </Text>
          <Text className="text-xs font-poppins-regular text-textSecondary">
            {formatDate(leg.departure)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="mb-4 mx-5"
    >
      <View className="bg-white rounded-3xl overflow-hidden shadow-md shadow-primary-300">
        {/* Tags */}
        {itinerary.tags && itinerary.tags.length > 0 && (
          <View className="absolute top-4 right-4 z-10 flex-row gap-2">
            {itinerary.tags.map((tag, index) => (
              <LinearGradient
                key={index}
                colors={
                  tag === "cheapest"
                    ? ["#10B981", "#059669"]
                    : ["#F59E0B", "#D97706"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="px-3 py-1 rounded-full"
              >
                <Text className="text-xs font-poppins-bold text-white uppercase">
                  {tag.replace("_", " ").toUpperCase()}
                </Text>
              </LinearGradient>
            ))}
          </View>
        )}

        <View className="p-5">
          {/* Outbound Leg */}
          {renderLegInfo(outboundLeg, false)}

          {/* Divider */}
          {returnLeg && <View className="h-[1px] bg-gray-200 my-2" />}

          {/* Return Leg */}
          {returnLeg && renderLegInfo(returnLeg, true)}

          {/* Price and Book Button */}
          <View className="flex-row items-center justify-between pt-4 border-t border-gray-200">
            <View>
              <Text className="text-xs font-poppins-regular text-textSecondary">
                Total Price
              </Text>
              <Text className="text-3xl font-poppins-bold text-primary mt-1">
                {itinerary.price.formatted}
              </Text>
            </View>

            <TouchableOpacity
              onPress={onPress}
              activeOpacity={0.8}
              className="bg-primary rounded-2xl px-8 py-4"
            >
              <Text className="text-base font-poppins-bold text-white">
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FlightCard;
