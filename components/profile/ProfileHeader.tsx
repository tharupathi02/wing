import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';

const ProfileHeader: React.FC = () => {
  return (
    <View className="p-2 mb-4 items-center">
      {/* Profile Image */}
      <View className="mb-4">
        <View className="w-32 h-32 rounded-full bg-primary-100 border-4 border-primary overflow-hidden items-center justify-center">
          <Image
              source={{ uri: "https://avatar.iran.liara.run/public/50" }}
              className="w-full h-full"
              contentFit="cover"
            />
        </View>
      </View>

      {/* Name */}
      <Text className="text-3xl font-bold text-textPrimary mb-1">
        Deshan Tharupathi
      </Text>

      {/* Email */}
      <Text className="text-sm text-textSecondary">
        tharupathi02@gmail.com
      </Text>
    </View>
  );
};

export default ProfileHeader;
