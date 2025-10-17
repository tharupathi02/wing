import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

export interface SettingsMenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
  isLast?: boolean;
}

const SettingsMenuItem: React.FC<SettingsMenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
  isLast = false,
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className="flex-row items-center py-4 px-1"
      >
        {/* Icon */}
        <View className="w-10 h-10 rounded-full bg-primary-50 items-center justify-center mr-4">
          {icon}
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text className="text-base font-medium text-textPrimary">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-xs text-textSecondary mt-0.5">
              {subtitle}
            </Text>
          )}
        </View>

        {/* Chevron */}
        {showChevron && (
          <ChevronRight size={20} color="#6B7280" />
        )}
      </TouchableOpacity>

      {/* Divider */}
      {!isLast && (
        <View className="border-t border-border ml-14" />
      )}
    </>
  );
};

export default SettingsMenuItem;
