import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import AppColors from '@/constant/Colors';

interface DateSelectorProps {
  label?: string;
  placeholder: string;
  selectedDate?: Date | null;
  onDateChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  label,
  placeholder,
  selectedDate,
  onDateChange,
  minimumDate,
  maximumDate,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    
    if (date) {
      onDateChange(date);
    }
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View className="mb-3">
      {label && (
        <Text className="text-xs font-semibold text-white/80 mb-2 ml-1">
          {label}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
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
          <Ionicons name="calendar-outline" size={20} color={AppColors.textSecondary} />
        </View>
        
        <View className="flex-1">
          {selectedDate ? (
            <Text className="text-base font-semibold text-textPrimary">
              {formatDate(selectedDate)}
            </Text>
          ) : (
            <Text className="text-base text-textSecondary">
              {placeholder}
            </Text>
          )}
        </View>

        <Ionicons name="chevron-down" size={20} color={AppColors.textSecondary} />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={minimumDate || new Date()}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

export default DateSelector;
