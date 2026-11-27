import UserAdCard from "@/components/userAdCard";
import { PROPERTIES } from "@/data/myAds";
import { api } from "@/lib/api";
import { useTheme } from "@/theme/ThemeProvider";
import type { Property } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
export default function Advertisements() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { colors } = useTheme();
  const [ads, setAds] = useState<Property[]>(PROPERTIES.slice(0, 3));

  const handleEdit = (id: string) => {
    router.push(`/edit-property/${id}` as any);
  };

  const { data: userAds } = useQuery({
    queryKey: ["userAds"],
    queryFn: async () => {
      return (await api.get("/properties/mine/list")).data.properties;
    },
  });

  const handleDelete = async (id: string) => {
    try {
      api.delete(`/properties/${id}`);
      queryClient.invalidateQueries({ queryKey: ["userAds"] });
      Toast.show({
        text1: "تم الحذف",
        text2: "تم حذف اعلانك بنجاح",
        type: "success",
      });
    } catch (error) {
      Toast.show({
        text1: "فشل الحذف",
        text2: "فشل حذف الأعلان",
        type: "error",
      });
    }
  };

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
          <Text className="text-lg font-bold text-[#0F113C] dark:text-[#F3F4F6]">
            إعلاناتي
          </Text>
        </View>
      </View>

      <FlatList
        data={userAds}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <UserAdCard ad={item} onEdit={handleEdit} onDelete={handleDelete} />
        )}
        ListEmptyComponent={
          <View className="items-center justify-center gap-3 mt-24">
            <Ionicons
              name="home-outline"
              size={48}
              color={colors.secondaryText}
            />
            <Text className="text-base font-semibold text-[#6B7280] dark:text-[#A1A1AA]">
              لا توجد إعلانات منشورة بعد
            </Text>
            <Pressable
              onPress={() => router.push("/add-property" as any)}
              className="px-5 py-2.5 mt-2 rounded-xl bg-[#0F113C] dark:bg-[#2D3158]"
            >
              <Text className="text-sm font-bold text-white">
                أضف إعلانك الأول
              </Text>
            </Pressable>
          </View>
        }
      />
    </SafeAreaView>
  );
}
