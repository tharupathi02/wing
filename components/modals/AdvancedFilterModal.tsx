import AppColors from "@/constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ChipSelector, { ChipOption } from "../chips/ChipSelector";

export interface AdvancedFilterData {
  returnDate: Date | null;
  cabinClass: string;
  adults: number;
  children: number;
  sortBy: string;
}

interface AdvancedFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: AdvancedFilterData) => void;
  initialFilters?: AdvancedFilterData;
}

const CABIN_CLASS_OPTIONS: ChipOption[] = [
  { label: "Economy", value: "economy" },
  { label: "Premium Economy", value: "premium_economy" },
  { label: "Business", value: "business" },
  { label: "First", value: "first" },
];

const SORT_BY_OPTIONS: ChipOption[] = [
  { label: "Best", value: "best" },
  { label: "Cheapest", value: "price_high" },
  { label: "Fastest", value: "fastest" },
  { label: "Outbound Take Off Time", value: "outbound_take_off_time" },
  { label: "Outbound Landing Time", value: "outbound_landing_time" },
  { label: "Return Take Off Time", value: "return_take_off_time" },
  { label: "Return Landing Time", value: "return_landing_time" },
];

const AdvancedFilterModal: React.FC<AdvancedFilterModalProps> = ({
  visible,
  onClose,
  onApply,
  initialFilters,
}) => {
  const [returnDate, setReturnDate] = useState<Date | null>(
    initialFilters?.returnDate || null
  );
  const [cabinClass, setCabinClass] = useState(
    initialFilters?.cabinClass || "economy"
  );
  const [adults, setAdults] = useState(initialFilters?.adults || 1);
  const [children, setChildren] = useState(initialFilters?.children || 0);
  const [sortBy, setSortBy] = useState(initialFilters?.sortBy || "best");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleApply = () => {
    onApply({
      returnDate,
      cabinClass,
      adults,
      children,
      sortBy,
    });
    onClose();
  };

  const handleReset = () => {
    setReturnDate(null);
    setCabinClass("economy");
    setAdults(1);
    setChildren(0);
    setSortBy("best");
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Select return date";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const incrementValue = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    currentValue: number,
    max: number = 9
  ) => {
    if (currentValue < max) {
      setter(currentValue + 1);
    }
  };

  const decrementValue = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    currentValue: number,
    min: number = 0
  ) => {
    if (currentValue > min) {
      setter(currentValue - 1);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1">
        {/* Backdrop - Pressable to close */}
        <Pressable className="flex-1" onPress={onClose} />

        {/* Modal Content */}
        <View
          className="bg-white rounded-t-3xl"
          style={{
            height: "90%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 16,
          }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
            <Text className="text-xl font-bold text-textPrimary">
              Advanced Filters
            </Text>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              className="w-8 h-8 items-center justify-center rounded-full bg-gray-100"
            >
              <Ionicons name="close" size={20} color={AppColors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView
            className="flex-1 px-6 pt-4"
            showsVerticalScrollIndicator={false}
          >
            {/* Return Date Selector */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-textPrimary mb-3">
                Return Date (Optional)
              </Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                activeOpacity={0.7}
                className="bg-background border border-border rounded-xl p-4 flex-row items-center justify-between"
              >
                <View className="flex-row items-center flex-1">
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={
                      returnDate ? AppColors.primary : AppColors.textSecondary
                    }
                  />
                  <Text
                    className={`ml-3 text-base ${
                      returnDate ? "text-textPrimary" : "text-textSecondary"
                    }`}
                  >
                    {formatDate(returnDate)}
                  </Text>
                </View>
                {returnDate && (
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      setReturnDate(null);
                    }}
                    className="ml-2"
                  >
                    <Ionicons
                      name="close-circle"
                      size={20}
                      color={AppColors.textSecondary}
                    />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            </View>

            {/* Cabin Class */}
            <ChipSelector
              label="Cabin Class"
              options={CABIN_CLASS_OPTIONS}
              selectedValue={cabinClass}
              onSelect={setCabinClass}
            />

            {/* Passengers Section */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-textPrimary mb-3">
                Passengers
              </Text>

              {/* Adults */}
              <View className="bg-background border border-border rounded-xl p-4 mb-3">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-base font-medium text-textPrimary">
                      Adults
                    </Text>
                    <Text className="text-xs text-textSecondary mt-1">
                      12+ years
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() => decrementValue(setAdults, adults, 1)}
                      activeOpacity={0.7}
                      disabled={adults <= 1}
                      className={`w-9 h-9 items-center justify-center rounded-full ${
                        adults <= 1 ? "bg-gray-200" : "bg-primary"
                      }`}
                    >
                      <Ionicons
                        name="remove"
                        size={18}
                        color={adults <= 1 ? AppColors.textSecondary : "white"}
                      />
                    </TouchableOpacity>
                    <Text className="text-lg font-semibold text-textPrimary mx-4 w-6 text-center">
                      {adults}
                    </Text>
                    <TouchableOpacity
                      onPress={() => incrementValue(setAdults, adults)}
                      activeOpacity={0.7}
                      className="w-9 h-9 items-center justify-center rounded-full bg-primary"
                    >
                      <Ionicons name="add" size={18} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Children */}
              <View className="bg-background border border-border rounded-xl p-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-base font-medium text-textPrimary">
                      Children
                    </Text>
                    <Text className="text-xs text-textSecondary mt-1">
                      2-12 years
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() => decrementValue(setChildren, children, 0)}
                      activeOpacity={0.7}
                      disabled={children <= 0}
                      className={`w-9 h-9 items-center justify-center rounded-full ${
                        children <= 0 ? "bg-gray-200" : "bg-primary"
                      }`}
                    >
                      <Ionicons
                        name="remove"
                        size={18}
                        color={
                          children <= 0 ? AppColors.textSecondary : "white"
                        }
                      />
                    </TouchableOpacity>
                    <Text className="text-lg font-semibold text-textPrimary mx-4 w-6 text-center">
                      {children}
                    </Text>
                    <TouchableOpacity
                      onPress={() => incrementValue(setChildren, children)}
                      activeOpacity={0.7}
                      className="w-9 h-9 items-center justify-center rounded-full bg-primary"
                    >
                      <Ionicons name="add" size={18} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Sort By */}
            <ChipSelector
              label="Sort By"
              options={SORT_BY_OPTIONS}
              selectedValue={sortBy}
              onSelect={setSortBy}
            />

            {/* Spacing at bottom */}
            <View className="h-4" />
          </ScrollView>

          {/* Footer Buttons */}
          <View className="px-6 py-4 border-t border-gray-100 flex-row gap-3">
            <TouchableOpacity
              onPress={handleReset}
              activeOpacity={0.7}
              className="flex-1 bg-background border border-border rounded-xl py-4 items-center justify-center"
            >
              <Text className="text-base font-semibold text-textPrimary">
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleApply}
              activeOpacity={0.7}
              className="flex-1 bg-primary rounded-xl py-4 items-center justify-center"
            >
              <Text className="text-base font-semibold text-white">
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={returnDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event: any, date?: Date) => {
            if (Platform.OS === "android") {
              setShowDatePicker(false);
            }
            if (date) {
              setReturnDate(date);
            }
          }}
          minimumDate={new Date()}
        />
      )}
    </Modal>
  );
};

export default AdvancedFilterModal;
