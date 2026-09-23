import CustomToast from "@/components/notifications/CustomToast";
import { NavigationBar } from "expo-navigation-bar";
import { Stack } from "expo-router";
import { I18nManager, StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "../global.css";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function RootLayout() {
  const toastConfig = {
    success: (props: any) => <CustomToast {...props} type="success" />,

    error: (props: any) => <CustomToast {...props} type="error" />,

    warning: (props: any) => <CustomToast {...props} type="warning" />,

    info: (props: any) => <CustomToast {...props} type="info" />,
  };
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="default" />
      <NavigationBar style="inverted" />

      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#0F113C",
            },
          }}
        />

        <Toast
          config={toastConfig}
          position="top"
          topOffset={60}
          visibilityTime={4000}
        />
      </View>
    </SafeAreaProvider>
  );
}
