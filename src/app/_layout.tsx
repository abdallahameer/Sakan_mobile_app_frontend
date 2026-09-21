import { NavigationBar } from "expo-navigation-bar";
import { Stack } from "expo-router";
import { I18nManager, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
export default function RootLayout() {
  I18nManager.forceRTL(true);

  return (
    <>
      <StatusBar barStyle={"default"} />
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
