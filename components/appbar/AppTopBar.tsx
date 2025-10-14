import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, MoreVertical } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface TopBarAction {
  icon: React.ReactNode;
  onPress: () => void;
  key: string;
  label: string;
  destructive?: boolean;
  disabled?: boolean;
}

interface AppTopBarProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  actions?: TopBarAction[];
  onActionsPress?: (actions: TopBarAction[]) => void;
  backgroundColor?: string;
  textColor?: string;
  statusBarStyle?: 'light' | 'dark';
  actionsTitle?: string;
}

const AppTopBar: React.FC<AppTopBarProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  actions = [],
  onActionsPress,
  backgroundColor = '#FFFFFF',
  textColor = '#1F2937',
  statusBarStyle = 'light',
  actionsTitle = 'Actions'
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const handleActionsPress = () => {
    if (onActionsPress) {
      onActionsPress(actions);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor }} edges={['top']}>
      <StatusBar style={statusBarStyle} backgroundColor={backgroundColor} />
      <View 
        className="flex-row items-center justify-between px-4 py-3"
        style={{ backgroundColor }}
      >
        {/* Left Section - Back Button or Spacer */}
        <View className="flex-1">
          {showBackButton ? (
            <TouchableOpacity
              onPress={handleBackPress}
              className="w-10 h-10 justify-center items-center"
              activeOpacity={0.7}
            >
              <ArrowLeft size={20} color={textColor} />
            </TouchableOpacity>
          ) : (
            <View className="w-10" />
          )}
        </View>

        {/* Center Section - Title */}
        <View className="flex-2 items-center">
          <Text 
            className="font-poppins-medium text-lg text-center"
            style={{ color: textColor }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        </View>

        {/* Right Section - Actions */}
        <View className="flex-1 flex-row justify-end items-center">
          {actions.length > 0 && (
            <TouchableOpacity
              onPress={handleActionsPress}
              className="w-10 h-10 rounded-full justify-center items-center bg-gray-50"
              activeOpacity={0.7}
            >
              <MoreVertical size={20} color={textColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppTopBar;