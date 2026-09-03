import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const COLORS = {
  primary: "#0F113C", // Dark blue - MAIN
  secondary: "#ffffff", // White - SECONDARY
  active: "#ffffff", // White for active icons
  inactive: "#A0AEC0", // Light gray for inactive
};

export default function TabBar() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.primary, // Dark blue background
          borderTopColor: COLORS.secondary, // White border
          borderTopWidth: 1,
          height: 100,
          paddingBottom: 8,
        },
        tabBarItemStyle: {
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 8,
        },
        tabBarActiveTintColor: COLORS.active, // White when active
        tabBarInactiveTintColor: COLORS.inactive, // Light gray when inactive
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
              size={28}
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
              name={focused ? "search" : "search-outline"}
              size={28}
              color={color}
            />
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
              size={24}
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
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
