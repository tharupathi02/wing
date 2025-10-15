import AppColors from "@/constant/Colors";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export interface ChipOption {
  label: string;
  value: string;
}

interface ChipSelectorProps {
  label: string;
  options: ChipOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const ChipSelector: React.FC<ChipSelectorProps> = ({
  label,
  options,
  selectedValue,
  onSelect,
}) => {
  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-textPrimary mb-3">
        {label}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => onSelect(option.value)}
              activeOpacity={0.7}
              className={`mr-2 px-4 py-2.5 rounded-full border mb-2 ${
                isSelected
                  ? "bg-primary border-primary"
                  : "bg-white border-border"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  isSelected ? "text-white" : "text-textPrimary"
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ChipSelector;
