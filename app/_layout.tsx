import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";
import { Toaster } from "sonner-native";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "ios_from_right",
        }}
      />
      <Toaster
        position="top-center"
        duration={3000}
        richColors
        theme="light"
        swipeToDismissDirection="up"
        closeButton
      />
    </GestureHandlerRootView>
  );
}
