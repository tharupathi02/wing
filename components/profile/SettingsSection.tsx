import React from 'react';
import { View, Text } from 'react-native';
import SettingsMenuItem, { SettingsMenuItemProps } from './SettingsMenuItem';

interface SettingsSectionProps {
  title: string;
  items: SettingsMenuItemProps[];
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, items }) => {
  return (
    <View className="mb-4">
      {/* Section Title */}
      <Text className="text-sm font-bold text-textSecondary uppercase tracking-wider mb-2 px-1">
        {title}
      </Text>

      {/* Section Content */}
      <View className="bg-white rounded-3xl px-4">
        {items.map((item, index) => (
          <SettingsMenuItem
            key={index}
            {...item}
            isLast={index === items.length - 1}
          />
        ))}
      </View>
    </View>
  );
};

export default SettingsSection;
