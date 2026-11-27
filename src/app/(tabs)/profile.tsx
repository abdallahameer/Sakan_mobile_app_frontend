import { api, setAuthToken } from "@/lib/api";
import { useTheme } from "@/theme/ThemeProvider";
import { User } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import Toast from "react-native-toast-message";

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
    key: "settings",
    label: "اللغة و المظهر",
    icon: "language",
    path: "/settings/languageAndTheme",
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
  const queryClinet = useQueryClient();
  const { colors } = useTheme();

  const { data: userProfile } = useQuery({
    queryKey: ["userId"],
    queryFn: async () => {
      return (await api.get<{ user: User }>("/auth/me")).data.user;
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA] dark:bg-[#0B0D1D]">
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
              className="items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-[#22243A]"
              style={{
                width: 110,
                height: 110,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Image
                source={{
                  uri: userProfile?.avatar_url
                    ? userProfile.avatar_url
                    : "https://api.dicebear.com/7.x/initials/png?seed=User",
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
                backgroundColor: colors.accent,
                borderWidth: 2,
                borderColor: colors.surface,
              }}
            >
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </Pressable>
          </View>

          <Text
            className="mt-3 text-lg font-bold dark:text-[#F3F4F6]"
            style={{ color: colors.text }}
          >
            {userProfile?.name}
          </Text>

          <View
            className="px-3 py-1 mt-2 rounded-full"
            style={{ backgroundColor: `${colors.accent}1A` }}
          >
            <Text
              className="text-xs font-semibold text-center"
              style={{ color: colors.accent }}
            >
              المورد والمشتري
            </Text>
          </View>
        </View>

        <View
          className="mx-4 mt-4 overflow-hidden bg-white rounded-2xl dark:bg-[#17192D]"
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
                  borderBottomColor: colors.border,
                }}
              >
                <View
                  className="items-center justify-center rounded-full"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: colors.elevatedSurface,
                  }}
                >
                  <Ionicons name={item.icon} size={18} color={colors.text} />
                </View>

                <Text
                  className="flex-1 mr-3 text-base font-semibold text-right dark:text-[#F3F4F6]"
                  style={{ color: colors.text, marginEnd: 12 }}
                >
                  {item.label}
                </Text>

                <Ionicons
                  name="chevron-back"
                  size={18}
                  color={colors.secondaryText}
                />
              </Pressable>
            )}
          />
        </View>

        <Pressable
          onPress={async () => {
            await setAuthToken(null);
            queryClinet.clear();
            router.replace("/login/login");

            Toast.show({
              type: "success",
              text1: "تسجيل خروج",
              text2: "تم تسجيل الخروج بنجاح",
            });
          }}
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
