import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SearchAirportItem } from '@/types/searchAirport';
import AppColors from '@/constant/Colors';

interface AirportCardProps {
  airport: SearchAirportItem;
}

const AirportCard: React.FC<AirportCardProps> = ({ airport }) => {
  return (
    <View className="bg-white rounded-3xl p-5 mb-4 shadow-md">
      {/* Header - City/Airport Name */}
      <View className="mb-4">
        <Text className="text-lg font-bold text-textPrimary text-center" numberOfLines={1}>
          {airport.presentation.title}
        </Text>
      </View>

      {/* Main Content - Airport Code and Icon */}
      <View className="flex-row items-center justify-between mb-5">
        {/* Left - Airport Code */}
        <View className="flex-1">
          <Text className="text-2xl font-bold text-textPrimary">
            {airport.skyId}
          </Text>
          <Text className="text-sm text-textSecondary mt-1" numberOfLines={1}>
            {airport.navigation.localizedName}
          </Text>
        </View>

        {/* Center - Icon */}
        <View className="mx-4">
          <View 
            className="rounded-full p-3"
            style={{ backgroundColor: AppColors.primary }}
          >
            <Ionicons name="airplane" size={24} color="white" />
          </View>
        </View>

        {/* Right - Location Type */}
        <View className="flex-1 items-end">
          <Text className="text-xs font-semibold text-primary uppercase">
            {airport.navigation.entityType}
          </Text>
          <Text className="text-sm text-textSecondary mt-1" numberOfLines={2}>
            {airport.presentation.subtitle}
          </Text>
        </View>
      </View>

      {/* Dashed Line */}
      <View className="border-t border-dashed border-border mt-3 mb-3"></View>

      {/* Footer - Action Button */}
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-xs text-textSecondary">Entity ID</Text>
          <Text className="text-sm font-semibold text-textPrimary mt-0.5">
            #{airport.entityId.slice(0, 8)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AirportCard;
