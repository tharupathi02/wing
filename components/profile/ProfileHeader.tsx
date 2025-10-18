import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';

interface ProfileHeaderProps {
  name: string;
  email: string;
  imageUri?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, imageUri }) => {
  return (
    <View className="p-3 mb-4 items-center">
      {/* Profile Image */}
      <View className="mb-4">
        <View className="w-28 h-28 rounded-full bg-primary-100 border-4 border-primary overflow-hidden items-center justify-center">
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              className="w-full h-full"
              contentFit="cover"
            />
          ) : (
            <Text className="text-4xl font-bold text-primary">
              {name.charAt(0).toUpperCase()}
            </Text>
          )}
        </View>
      </View>

      {/* Name */}
      <Text className="text-2xl font-bold text-textPrimary mb-1">
        {name}
      </Text>

      {/* Email */}
      <Text className="text-base text-textSecondary">
        {email}
      </Text>
    </View>
  );
};

export default ProfileHeader;
