import ASSETS from "@/constant/Assets";
import AppColors from "@/constant/Colors";
import { Itinerary } from "@/types/searchFlight";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeftRight,
  Ban,
  Check,
  Clock,
  MoveRight,
  Plane,
  RefreshCcw,
} from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

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
            <ArrowLeftRight size={16} color={AppColors.primary} />
          ) : (
            <MoveRight size={16} color={AppColors.primary} />
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
          {leg.origin.country && (
            <Text className="text-xs font-poppins-regular text-textSecondary">
              {leg.origin.country}
            </Text>
          )}
        </View>

        {/* Flight Path */}
        <View className="flex-1 items-center px-2">
          <View>
            <Text className="text-xs font-poppins-medium text-primary">{}</Text>
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
          {leg.destination.country && (
            <Text className="text-xs font-poppins-regular text-textSecondary">
              {leg.destination.country}
            </Text>
          )}
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
          <View className="flex-row items-center gap-2">
            <Text
              className="text-xs font-poppins-semibold text-textPrimary"
              numberOfLines={1}
            >
              {leg.carriers.marketing[0]?.name || "Airline"}
            </Text>
            {leg.segments && leg.segments[0]?.flightNumber && (
              <Text className="text-xs font-poppins-medium text-primary">
                ({leg.carriers.marketing[0]?.alternateId || ""}{" "}
                {leg.segments[0].flightNumber})
              </Text>
            )}
          </View>
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

          {/* Fare Policy Badges */}
          {(itinerary.farePolicy.isPartiallyRefundable ||
            itinerary.farePolicy.isCancellationAllowed ||
            itinerary.farePolicy.isChangeAllowed) && (
            <View className="flex-row flex-wrap gap-2 mb-4">
              {itinerary.farePolicy.isCancellationAllowed && (
                <View className="bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 flex-row items-center">
                  <Check size={12} color="#10B981" />
                  <Text className="text-xs font-poppins-medium text-green-700 ml-1">
                    Cancellable
                  </Text>
                </View>
              )}
              {itinerary.farePolicy.isPartiallyRefundable && (
                <View className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 flex-row items-center">
                  <RefreshCcw size={12} color="#3B82F6" />
                  <Text className="text-xs font-poppins-medium text-blue-700 ml-1">
                    Refundable
                  </Text>
                </View>
              )}
              {itinerary.farePolicy.isChangeAllowed && (
                <View className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 flex-row items-center">
                  <RefreshCcw size={12} color="#F59E0B" />
                  <Text className="text-xs font-poppins-medium text-amber-700 ml-1">
                    Changeable
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Non-refundable/Non-changeable Warning */}
          {!itinerary.farePolicy.isPartiallyRefundable &&
            !itinerary.farePolicy.isCancellationAllowed &&
            !itinerary.farePolicy.isChangeAllowed && (
              <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex-row items-center">
                <Ban size={14} color="#EF4444" />
                <Text className="text-xs font-poppins-medium text-red-700 ml-2 flex-1">
                  Non-refundable • No changes allowed
                </Text>
              </View>
            )}

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
