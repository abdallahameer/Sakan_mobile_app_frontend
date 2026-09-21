import UserAdCard from "@/components/userAdCard";
import { MOCK_MY_ADS, MyAd } from "@/data/myAds";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Advertisements() {
  const router = useRouter();
  const [ads, setAds] = useState<MyAd[]>(MOCK_MY_ADS);

  const handleDelete = (id: string) => {
    setAds((prev) => prev.filter((ad) => ad.id !== id));
  };

  const handleEdit = (id: string) => {
    router.push(`/edit-property/${id}` as any);
  };

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
        data={ads}
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
