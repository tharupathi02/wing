import ProfileAppBar from '@/components/appbar/ProfileAppBar';
import AirportSearchModal from '@/components/modals/AirportSearchModal';
import AirportSelector from '@/components/selectors/AirportSelector';
import DateSelector from '@/components/selectors/DateSelector';
import AppColors from '@/constant/Colors';
import { SearchAirportItem } from '@/types/searchAirport';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

const HomeScreen = () => {
  const [originAirport, setOriginAirport] = useState<SearchAirportItem | null>(null);
  const [destinationAirport, setDestinationAirport] = useState<SearchAirportItem | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [currentSelector, setCurrentSelector] = useState<'origin' | 'destination' | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleOriginPress = () => {
    console.log('Origin pressed, opening modal');
    setCurrentSelector('origin');
    setShowModal(true);
  };

  const handleDestinationPress = () => {
    console.log('Destination pressed, opening modal');
    setCurrentSelector('destination');
    setShowModal(true);
  };

  const handleAirportSelect = (airport: SearchAirportItem) => {
    if (currentSelector === 'origin') {
      setOriginAirport(airport);
    } else if (currentSelector === 'destination') {
      setDestinationAirport(airport);
    }
    setShowModal(false);
  };

  const handleSearch = () => {
    if (!originAirport || !destinationAirport || !departureDate) {
      toast.error('Missing Information', {
        description: 'Please select origin, destination, and date'
      });
      return;
    }

    toast.success('Searching Flights', {
      description: `${originAirport.skyId} → ${destinationAirport.skyId}`
    });
    console.log('Search:', { originAirport, destinationAirport, departureDate });
  };

  const handleNotification = () => {
    toast.info('Notifications', {
      description: 'No new notifications'
    });
  };

  return (
    <View className="flex-1 bg-white relative">
      {/* Gradient Background Circle */}
      <View
        className="absolute top-0 left-0 right-0"
        style={{
          height: 400,
          overflow: 'hidden',
        }}
      >
        <LinearGradient
          colors={[AppColors.primary, 'transparent']}
          style={{
            position: 'absolute',
            top: -300,
            left: -100,
            right: -100,
            height: 500,
            borderRadius: 500,
          }}
        />
      </View>

      <SafeAreaView
        className="flex-1 mb-10"
      >
        {/* Profile App Bar */}
        <ProfileAppBar
          name="Deshan Tharupathi"
          profileImage="https://avatar.iran.liara.run/public/50"
          onNotificationPress={handleNotification}
        />

        {/* Search Box Container */}
        <View className="px-5 mt-6">
          <LinearGradient
            colors={[AppColors.primary, AppColors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-5"
            style={{
              borderRadius: 24,
            }}
          >
            {/* Trip Type Tabs */}
            <View className="flex-row mb-5">
              <View className="bg-white/20 rounded-full p-1 flex-row">
                <TouchableOpacity
                  className="bg-white rounded-full px-6 py-2"
                  activeOpacity={0.8}
                >
                  <Text className="text-sm font-bold text-primary">
                    One way
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="px-6 py-2"
                  activeOpacity={0.8}
                >
                  <Text className="text-sm font-semibold text-white/80">
                    Return
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Origin Airport Selector */}
            <AirportSelector
              label="From"
              placeholder="Country, city, airport"
              selectedAirport={originAirport}
              onPress={handleOriginPress}
              icon="airplane-outline"
            />

            {/* Destination Airport Selector */}
            <AirportSelector
              label="To"
              placeholder="Country, city, airport"
              selectedAirport={destinationAirport}
              onPress={handleDestinationPress}
              icon="location-outline"
            />

            {/* Date Selector */}
            <DateSelector
              label="When"
              placeholder="Choose your dates"
              selectedDate={departureDate}
              onDateChange={setDepartureDate}
              minimumDate={new Date()}
            />

            {/* Search Button */}
            <TouchableOpacity
              onPress={handleSearch}
              activeOpacity={0.8}
              className="bg-white rounded-2xl py-4 mt-3 flex-row items-center justify-center"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <Text className="text-base font-bold text-primary mr-2">
                Search
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>

      {/* Airport Search Modal */}
      <AirportSearchModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSelectAirport={handleAirportSelect}
        title={currentSelector === 'origin' ? 'Select Origin' : 'Select Destination'}
      />
    </View>
  );
};

export default HomeScreen;