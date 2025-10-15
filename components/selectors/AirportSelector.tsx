import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppColors from '@/constant/Colors';
import { SearchAirportItem } from '@/types/searchAirport';

interface AirportSelectorProps {
  label: string;
  placeholder: string;
  selectedAirport?: SearchAirportItem | null;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

const AirportSelector: React.FC<AirportSelectorProps> = ({
  label,
  placeholder,
  selectedAirport,
  onPress,
  icon = 'location-outline',
}) => {
  return (
    <View className="mb-3">
      <Text className="text-xs font-semibold text-white/80 mb-2 ml-1">
        {label}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className="bg-white/95 rounded-xl p-4 flex-row items-center"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <View className="mr-3">
          <Ionicons name={icon} size={20} color={AppColors.textSecondary} />
        </View>
        
        <View className="flex-1">
          {selectedAirport ? (
            <>
              <Text className="text-base font-bold text-textPrimary" numberOfLines={1}>
                {selectedAirport.presentation.title}
              </Text>
              <Text className="text-sm text-textSecondary mt-0.5" numberOfLines={1}>
                {selectedAirport.presentation.subtitle}
              </Text>
            </>
          ) : (
            <Text className="text-base text-textSecondary">
              {placeholder}
            </Text>
          )}
        </View>

        <Ionicons name="chevron-down" size={20} color={AppColors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

export default AirportSelector;
