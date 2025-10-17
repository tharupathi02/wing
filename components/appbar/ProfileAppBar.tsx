import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AppColors from '@/constant/Colors';
import { Bell, UserRound } from 'lucide-react-native';
import { useUserStore } from '@/store/useUserStore';

interface ProfileAppBarProps {
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

const ProfileAppBar: React.FC<ProfileAppBarProps> = ({
  onNotificationPress,
  onProfilePress,
}) => {
  const { currentUser } = useUserStore();
  
  // Get user data from store
  const userName = currentUser?.name || 'Guest';
  const profileImage = currentUser?.profileImage;

  return (
    <View className="flex-row items-center justify-between px-5 pt-4 pb-3">
      {/* Left Section - Profile */}
      <TouchableOpacity
        onPress={onProfilePress}
        activeOpacity={0.7}
        className="flex-row items-center flex-1"
      >
        {/* Profile Image */}
        <View className="w-12 h-12 rounded-full overflow-hidden bg-accent mr-3">
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full items-center justify-center">
              <UserRound size={24} color={AppColors.primary} />
            </View>
          )}
        </View>

        {/* Name and Welcome Message */}
        <View className="flex-1">
          <Text className="text-sm font-medium text-white" numberOfLines={1}>
            Welcome,
          </Text>
          <Text className="text-lg font-bold text-white" numberOfLines={1}>
            {userName}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Right Section - Notification Bell */}
      <TouchableOpacity
        onPress={onNotificationPress}
        activeOpacity={0.7}
        className="w-10 h-10 rounded-full items-center justify-center ml-3 bg-accent-300"
      >
        <Bell size={24} color={AppColors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileAppBar;
