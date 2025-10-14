import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-primary">Welcome to Wing!</Text>
      <Text className="font-semibold text-secondary">
        Your Flight Finder
      </Text>
    </View>
  );
}
