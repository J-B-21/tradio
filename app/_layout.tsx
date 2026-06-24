import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Colors } from "../constants/colors"

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ 
        headerShown: false, 
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}>
        <Stack.Screen name="dashboard/index" />
        <Stack.Screen name="freeze/index" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
