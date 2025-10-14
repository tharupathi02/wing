import React, { ReactNode } from "react";
import { TouchableOpacity, Text } from "react-native";

interface SocialAuthButtonProps {
  text: string;
  icon: ReactNode;
  onPress?: () => void;
  className?: string;
  textClassName?: string;
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  text,
  icon,
  onPress,
  className = "",
  textClassName = "",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`rounded-xl py-4 flex-row items-center justify-center shadow-sm ${className}`.trim()}
    >
      {icon}
      <Text className={`ml-2 text-sm font-semibold ${textClassName}`.trim()}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default SocialAuthButton;
