import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function TabBar() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0F113C", // Dark blue background
          borderTopColor: "#ffffff", // White border
          borderTopWidth: 1,
          height: 100,
          paddingBottom: 8,
        },
        tabBarItemStyle: {
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 8,
        },
        tabBarActiveTintColor: "#ffffff", // White when active
        tabBarInactiveTintColor: "#A0AEC0", // Light gray when inactive
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
        name="upload"
        options={{
          tabBarButton: () => (
            <Pressable
              className="flex-1 items-center"
              onPress={() => router.replace("/add-property")}
            >
              <AntDesign name="plus" size={28} color="#a0aec0" />
            </Pressable>
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
