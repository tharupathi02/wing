import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  User, 
  Edit3, 
  Lock, 
  Heart, 
  Bell, 
  Globe, 
  History, 
  CreditCard, 
  FileText, 
  HelpCircle, 
  Mail, 
  Info,
  LogOut
} from 'lucide-react-native';
import { toast } from 'sonner-native';
import ProfileHeader from '@/components/profile/ProfileHeader';
import SettingsSection from '@/components/profile/SettingsSection';
import { SettingsMenuItemProps } from '@/components/profile/SettingsMenuItem';
import { useUserStore } from '@/store/useUserStore';
import LogoutModal from '@/components/modals/LogoutModal';

const ProfileScreen = () => {
  const router = useRouter();
  const { currentUser, logout, isAuthenticated } = useUserStore();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  
  // Get user data from Zustand store
  const userData = {
    name: currentUser?.name || 'Guest',
    email: currentUser?.email || 'guest@example.com',
    imageUri: currentUser?.profileImage,
  };

  // Handle logout button press
  const handleLogoutPress = () => {
    setLogoutModalVisible(true);
  };

  // Handle logout confirmation
  const handleLogoutConfirm = () => {
    setLogoutModalVisible(false);
    logout();
    toast.success('Logged out successfully');
    router.replace('/(screens)/auth/signin/signin-screen');
  };

  // Account Settings
  const accountSettings: SettingsMenuItemProps[] = [
    {
      icon: <User size={22} color="#1153EC" />,
      title: 'View Profile',
      subtitle: 'See your profile information',
      onPress: () => console.log('View Profile'),
    },
    {
      icon: <Edit3 size={22} color="#1153EC" />,
      title: 'Edit Profile',
      subtitle: 'Update your personal details',
      onPress: () => console.log('Edit Profile'),
    },
    {
      icon: <Lock size={22} color="#1153EC" />,
      title: 'Change Password',
      subtitle: 'Update your password',
      onPress: () => console.log('Change Password'),
    },
  ];

  // Preferences Settings
  const preferencesSettings: SettingsMenuItemProps[] = [
    {
      icon: <Heart size={22} color="#1153EC" />,
      title: 'Saved Flights',
      subtitle: 'View your favorite flights',
      onPress: () => console.log('Saved Flights'),
    },
    {
      icon: <Bell size={22} color="#1153EC" />,
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      onPress: () => console.log('Notifications'),
    },
    {
      icon: <Globe size={22} color="#1153EC" />,
      title: 'Language & Region',
      subtitle: 'English (US)',
      onPress: () => console.log('Language'),
    },
  ];

  // Booking Settings
  const bookingSettings: SettingsMenuItemProps[] = [
    {
      icon: <History size={22} color="#1153EC" />,
      title: 'Booking History',
      subtitle: 'View all your bookings',
      onPress: () => console.log('Booking History'),
    },
    {
      icon: <CreditCard size={22} color="#1153EC" />,
      title: 'Payment Methods',
      subtitle: 'Manage saved payment options',
      onPress: () => console.log('Payment Methods'),
    },
    {
      icon: <FileText size={22} color="#1153EC" />,
      title: 'Travel Documents',
      subtitle: 'Passport, ID, and other documents',
      onPress: () => console.log('Travel Documents'),
    },
  ];

  // Support Settings
  const supportSettings: SettingsMenuItemProps[] = [
    {
      icon: <HelpCircle size={22} color="#1153EC" />,
      title: 'Help Center',
      subtitle: 'FAQs and troubleshooting',
      onPress: () => console.log('Help Center'),
    },
    {
      icon: <Mail size={22} color="#1153EC" />,
      title: 'Contact Support',
      subtitle: 'Get in touch with our team',
      onPress: () => console.log('Contact Support'),
    },
    {
      icon: <Info size={22} color="#1153EC" />,
      title: 'About',
      subtitle: 'App version 1.0.0',
      onPress: () => console.log('About'),
    },
  ];

  // Logout
  const logoutSettings: SettingsMenuItemProps[] = [
    {
      icon: <LogOut size={22} color="#EF4444" />,
      title: 'Logout',
      onPress: handleLogoutPress,
      showChevron: false,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background mb-20">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <ProfileHeader
          name={userData.name}
          email={userData.email}
          imageUri={userData.imageUri}
        />

        {/* Settings Sections */}
        <SettingsSection title="Account" items={accountSettings} />
        <SettingsSection title="Preferences" items={preferencesSettings} />
        <SettingsSection title="Booking" items={bookingSettings} />
        <SettingsSection title="Support" items={supportSettings} />
        <SettingsSection title="" items={logoutSettings} />

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>

      {/* Logout Modal */}
      <LogoutModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={handleLogoutConfirm}
        userName={currentUser?.name}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;