import { NavigationBar } from "expo-navigation-bar";
import { Stack } from "expo-router";
import { I18nManager } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
export default function RootLayout() {
  I18nManager.forceRTL(true);
  return (
    <>
      <NavigationBar style="inverted" />
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#0F113C" },
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaProvider>
    </>
  );
}
