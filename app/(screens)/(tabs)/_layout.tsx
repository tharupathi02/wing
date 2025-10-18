import AppColors from '@/constant/Colors';
import { Tabs } from 'expo-router';
import { MapPin, Home, Plane, UserRound } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

const TabIconRenderer = ({
    focused,
    iconName,
    label,
    size = 24,
    activeColor = AppColors.primary,
    inactiveColor = AppColors.textSecondary,
}: {
    focused: boolean;
    iconName: 'home' | 'airports' | 'flights' | 'profile';
    label: string;
    size?: number;
    activeColor?: string;
    inactiveColor?: string;
}) => {
    const color = focused ? `${activeColor}` : inactiveColor;

    const renderIcon = () => {
        switch (iconName) {
            case 'home':
                return <Home size={size} color={color} strokeWidth={focused ? 1.5 : 1} />;
            case 'airports':
                return <MapPin size={size} color={color} strokeWidth={focused ? 1.5 : 1} />;
            case 'flights':
                return <Plane size={size} color={color} strokeWidth={focused ? 1.5 : 1} />;
            case 'profile':
                return <UserRound size={size} color={color} strokeWidth={focused ? 1.5 : 1} />;
            default:
                return <Home size={size} color={color} strokeWidth={focused ? 1.5 : 1} />;
        }
    };

    return (
        <View className="flex-1 mt-3 flex flex-col items-center">
            {renderIcon()}
            <Text
                style={{
                    color: focused ? `${activeColor}` : inactiveColor,
                }}
                className={`${focused ? "font-poppins-bold" : "font-poppins-regular"
                    } w-full text-center mt-1 text-sm`}
            >
                {label}
            </Text>
        </View>
    );
};

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "white",
                    position: "absolute",
                    minHeight: 70,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIconRenderer
                            focused={focused}
                            iconName="home"
                            label="Home"
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="airports"
                options={{
                    title: 'Airports',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIconRenderer
                            focused={focused}
                            iconName="airports"
                            label="Airports"
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="flights"
                options={{
                    title: 'Flights',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIconRenderer
                            focused={focused}
                            iconName="flights"
                            label="flights"
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIconRenderer
                            focused={focused}
                            iconName="profile"
                            label="Profile"
                        />  
                    ),
                }}
            />
        </Tabs>
    )
}

export default _layout