import UserAdCard from "@/components/userAdCard";
import { PROPERTIES } from "@/data/myAds";
import { api } from "@/lib/api";
import type { Property } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Advertisements() {
  const router = useRouter();
  const [ads, setAds] = useState<Property[]>(PROPERTIES.slice(0, 3));

  const handleDelete = (id: string) => {
    setAds((prev) => prev.filter((ad) => ad.id !== id));
  };

  const handleEdit = (id: string) => {
    router.push(`/edit-property/${id}` as any);
  };

  const { data: userAds } = useQuery({
    queryKey: ["userAds"],
    queryFn: async () => {
      return (await api.get("/properties/mine/list")).data.properties;
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA]">
      <View className="flex-row items-center justify-between px-4 py-4 w-full border-b border-[#E5E7EB]">
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-forward" size={22} color="#0F113C" />
        </Pressable>

        <View className="flex-row items-center justify-start w-[60%]">
          <Text className="text-lg font-bold text-[#0F113C]">إعلاناتي</Text>
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
            <Ionicons name="home-outline" size={48} color="#9CA3AF" />
            <Text className="text-base font-semibold text-[#6B7280]">
              لا توجد إعلانات منشورة بعد
            </Text>
            <Pressable
              onPress={() => router.push("/add-property" as any)}
              className="px-5 py-2.5 mt-2 rounded-xl bg-[#0F113C]"
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
