import CustomToast from "@/components/notifications/CustomToast";
import UploadBanner from "@/components/Uploadbanner ";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationBar } from "expo-navigation-bar";
import { Stack } from "expo-router";
import { I18nManager, StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";
import "../global.css";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}

function RootLayoutContent() {
  const { isDarkMode, colors } = useTheme();
  const toastConfig = {
    success: (props: any) => <CustomToast {...props} type="success" />,

    error: (props: any) => <CustomToast {...props} type="error" />,

    warning: (props: any) => <CustomToast {...props} type="warning" />,

    info: (props: any) => <CustomToast {...props} type="info" />,
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <NavigationBar style={isDarkMode ? "light" : "dark"} />

      <QueryClientProvider client={queryClient}>
        <View style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: isDarkMode ? colors.background : "#0F113C",
              },
            }}
          />

          <UploadBanner />

          <Toast
            config={toastConfig}
            position="top"
            topOffset={60}
            visibilityTime={4000}
          />
        </View>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
