import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  primary: "#0F113C",
  accent: "#10B981",
  white: "#ffffff",
  textGray: "#6B7280",
  border: "#E5E7EB",
  lightBg: "#F8F9FA",
};

type MenuItem = {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  path?: string;
};

const MENU_ITEMS: MenuItem[] = [
  {
    key: "info",
    label: "معلوماتي",
    icon: "person-outline",
    path: "/settings/information",
  },
  {
    key: "ads",
    label: "اعلاناتي",
    icon: "home-outline",
    path: "/settings/advertisements",
  },
  {
    key: "notifications",
    label: "الإشعارات",
    icon: "notifications-outline",
    path: "/settings/notifications",
  },
  {
    key: "settings",
    label: "اللغة و المظهر",
    icon: "language",
    path: "/settings/languageAndTheme",
  },
  {
    key: "contact",
    label: "تواصل معنا",
    icon: "chatbubble-ellipses-outline",
    path: "/settings/contactWithUs",
  },
  {
    key: "about",
    label: "نبذة عنا",
    icon: "information-circle-outline",
    path: "/settings/aboutUs",
  },

  {
    key: "privacy",
    label: "سياسة الخصوصية",
    icon: "shield-checkmark-outline",
    path: "/settings/privacyPolicy",
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA]">
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View
          className="items-center px-4 pt-6 pb-6 "
          style={{
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
        >
          <View className="relative">
            <View
              className="items-center justify-center overflow-hidden bg-gray-100 rounded-full"
              style={{
                width: 110,
                height: 110,
                borderWidth: 1,
                borderColor: COLORS.border,
              }}
            >
              <Image
                source={{
                  uri: "https://api.dicebear.com/7.x/initials/png?seed=User",
                }}
                style={{ width: "100%", height: "100%" }}
              />
            </View>

            <Pressable
              className="absolute items-center justify-center rounded-full"
              style={{
                width: 32,
                height: 32,
                bottom: 0,
                left: 0,
                backgroundColor: COLORS.accent,
                borderWidth: 2,
                borderColor: COLORS.white,
              }}
            >
              <Ionicons name="camera" size={16} color={COLORS.white} />
            </Pressable>
          </View>

          <Text
            className="mt-3 text-lg font-bold"
            style={{ color: COLORS.primary }}
          >
            username
          </Text>

          <View
            className="px-3 py-1 mt-2 rounded-full"
            style={{ backgroundColor: `${COLORS.accent}1A` }}
          >
            <Text
              className="text-xs font-semibold text-center"
              style={{ color: COLORS.accent }}
            >
              المورد والمشتري
            </Text>
          </View>
        </View>

        <View
          className="mx-4 mt-4 overflow-hidden bg-white rounded-2xl"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 1,
          }}
        >
          <FlatList
            data={MENU_ITEMS}
            keyExtractor={(item) => item.key}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => item.path && router.push(item.path as any)}
                className="flex-row items-center px-4 py-4"
                style={{
                  borderBottomWidth: index === MENU_ITEMS.length - 1 ? 0 : 1,
                  borderBottomColor: COLORS.border,
                }}
              >
                <View
                  className="items-center justify-center rounded-full"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: COLORS.lightBg,
                  }}
                >
                  <Ionicons name={item.icon} size={18} color={COLORS.primary} />
                </View>

                <Text
                  className="flex-1 mr-3 text-base font-semibold text-right"
                  style={{ color: COLORS.primary, marginEnd: 12 }}
                >
                  {item.label}
                </Text>

                <Ionicons
                  name="chevron-back"
                  size={18}
                  color={COLORS.textGray}
                />
              </Pressable>
            )}
          />
        </View>

        <Pressable
          className="flex-row-reverse items-center justify-center gap-2 py-3 mx-4 mt-4 border rounded-2xl"
          style={{ borderColor: "#FCA5A5" }}
        >
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text className="text-sm font-semibold" style={{ color: "#EF4444" }}>
            تسجيل الخروج
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
