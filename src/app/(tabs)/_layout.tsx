import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";

export default function TabBar() {
  const router = useRouter();
  const { isDarkMode, colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? colors.surface : "#0F113C",
          borderTopColor: isDarkMode ? colors.border : "#FFFFFF",
          borderTopWidth: 1,
        },
        tabBarItemStyle: {
          alignItems: "center",
          justifyContent: "center",
          height: 100,
          paddingVertical: 8,
        },
        tabBarActiveTintColor: isDarkMode ? colors.accent : "#FFFFFF",
        tabBarInactiveTintColor: isDarkMode ? colors.secondaryText : "#A0AEC0",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "location" : "location-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="upload"
        options={{
          title: "upload",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name={"plus"} size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome
              name={focused ? "bookmark" : "bookmark-o"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
