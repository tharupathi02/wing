import AppColors from "@/constant/Colors";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import ASSETS from "../constant/Assets";

export default function Index() {

  const router = useRouter();
  const [loading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      router.replace("/(screens)/(tabs)");
    }, 5000);
  }, []);

  return (
    <View className="flex-1 bg-primary">
      {/* Center Content - Logo, App Name & Tagline */}
      <View className="flex-1 items-center justify-center">
        <Image 
          source={ASSETS.LOGO.WHITE} 
          className="w-24 h-24 mb-2"
          resizeMode="contain"
        />
        <Text className="text-5xl font-extrabold text-white h-14">
          Wing
        </Text>
        <Text className="text-xl font-light text-white/90">
          Your Flight Finder
        </Text>
      </View>

      {/* Bottom Center - Airplane Side */}
      <View className="absolute -bottom-20 left-0 right-0 items-center">
        <Image 
          source={ASSETS.CLOUD.CLOUD_1} 
          className="w-[750px] h-[300px]"
          resizeMode="contain"
        />
      </View>
      <View className="absolute bottom-0 left-0 right-0 items-center">
        <Image 
          source={ASSETS.PLANE.AIRPLANE_SIDE} 
          className="w-[300px]"
          resizeMode="contain"
        />
      </View>

      {/* Loading */}
      {loading && (
        <View className="absolute bottom-10 left-0 right-0 items-center">
          <ActivityIndicator color={AppColors.primary} />
        </View>
      )}
    </View>
  );
}
