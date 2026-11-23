import PropertyCard from "@/components/propertyCard";
import { PROPERTIES } from "@/data/myAds";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/ThemeProvider";

const LATEST_NOTIFICATIONS = PROPERTIES;

export default function NotificationsSettings() {
  const router = useRouter();
  const { colors } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA] dark:bg-[#0B0D1D]">
      <View className="flex-row items-center justify-between px-4 py-4 w-full border-b border-[#E5E7EB] dark:border-[#36384D]">
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-forward" size={22} color={colors.text} />
        </Pressable>

        <View className="flex-row items-center justify-start w-[60%]">
          <Text className="text-lg font-bold text-[#0F113C] dark:text-[#F3F4F6]">الإشعارات</Text>
        </View>
      </View>

      <FlatList
        data={LATEST_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
        ListHeaderComponent={
          <View>
            <View className="flex-row bg-white items-center justify-between px-4 py-4 mb-6 border border-[#E5E7EB] rounded-2xl dark:bg-[#17192D] dark:border-[#36384D]">
              <View className="flex-col items-start flex-1 gap-1 pr-3">
                <Text className="text-base font-semibold text-right text-[#0F113C] dark:text-[#F3F4F6]">
                  تفعيل الإشعارات
                </Text>
                <Text className="text-xs text-right text-[#9CA3AF] dark:text-[#A1A1AA]">
                  {notificationsEnabled
                    ? "ستصلك تنبيهات بأحدث العقارات المطابقة لبحثك"
                    : "تم إيقاف الإشعارات مؤقتًا"}
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#E5E7EB", true: "#10B98155" }}
                thumbColor={notificationsEnabled ? "#10B981" : "#ffffff"}
              />
            </View>

            <Text className="mb-3 text-base font-bold text-left text-[#0F113C] dark:text-[#F3F4F6]">
              أحدث الإشعارات
            </Text>
          </View>
        }
        renderItem={({ item }) => <PropertyCard property={item} />}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListEmptyComponent={
          <Text className="mt-10 text-sm text-center text-[#9CA3AF] dark:text-[#A1A1AA]">
            لا توجد إشعارات حاليًا
          </Text>
        }
      />
    </SafeAreaView>
  );
}
