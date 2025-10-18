import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { LogOut } from 'lucide-react-native';

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onClose,
  onConfirm,
  userName,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/50 items-center justify-center px-6"
      >
        {/* Modal Content */}
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl"
        >
          {/* Icon */}
          <View className="items-center mb-4">
            <View className="w-20 h-20 rounded-full bg-red-50 items-center justify-center">
              <LogOut size={40} color="#EF4444" />
            </View>
          </View>

          {/* Title */}
          <Text className="text-2xl font-bold text-textPrimary text-center mb-2">
            Logout
          </Text>

          {/* Message */}
          <Text className="text-base text-textSecondary text-center mb-6">
            {userName 
              ? `${userName}, are you sure you want to logout? You'll need to sign in again to access your account.`
              : 'Are you sure you want to logout? You\'ll need to sign in again to access your account.'
            }
          </Text>

          {/* Buttons */}
          <View className="flex-row gap-3">
            {/* Cancel Button */}
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.8}
              className="flex-1 bg-background border-2 border-border rounded-3xl py-4"
            >
              <Text className="text-textPrimary text-center text-base font-bold">
                Cancel
              </Text>
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity
              onPress={onConfirm}
              activeOpacity={0.8}
              className="flex-1 bg-red-500 rounded-3xl py-4"
            >
              <Text className="text-white text-center text-base font-bold">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default LogoutModal;
