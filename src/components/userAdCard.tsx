import type { MyAd } from "@/data/myAds";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Image, Pressable, Text, View } from "react-native";

export default function UserAdCard({
  ad,
  onEdit,
  onDelete,
}: {
  ad: MyAd;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const router = useRouter();

  const confirmDelete = () => {
    Alert.alert("حذف الإعلان", "هل أنت متأكد من حذف هذا الإعلان؟", [
      { text: "إلغاء", style: "cancel" },
      { text: "حذف", style: "destructive", onPress: () => onDelete(ad.id) },
    ]);
  };

  return (
    <Pressable
      onPress={() => router.push(`/propertyDetails?id=${ad.id}` as any)}
      className="overflow-hidden bg-white shadow-sm rounded-2xl"
    >
      <View className="flex-row items-center gap-2">
        <View className="relative w-[30%] h-32">
          <Image source={{ uri: ad.images[0] }} className="w-full h-full" />
        </View>

        <View className="flex-1 gap-1 py-2 pr-3">
          <Text
            className="text-base font-bold text-left text-[#171947]"
            numberOfLines={1}
          >
            {ad.title}
          </Text>

          <View className="flex-row items-center gap-1">
            <Ionicons name="location" size={12} color="#3b82f6" />
            <Text className="text-xs text-blue-900" numberOfLines={1}>
              {ad.location}
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Ionicons name="eye-outline" size={13} color="#6B7280" />
              <Text className="text-xs text-[#6B7280]">{ad.views} مشاهدة</Text>
            </View>
            <Text className="text-[11px] text-[#8587A3]">{ad.postedAt}</Text>
          </View>

          <Text className="text-sm font-bold text-left text-blue-800">
            {ad.price.toLocaleString()} جنيه
          </Text>
        </View>
      </View>

      <View className="flex-row border-t border-[#E5E7EB]">
        <Pressable
          onPress={() => onEdit(ad.id)}
          className="flex-row items-center justify-center flex-1 gap-1.5 py-3"
        >
          <Ionicons name="create-outline" size={16} color="#0F113C" />
          <Text className="text-sm font-semibold text-[#0F113C]">تعديل</Text>
        </Pressable>

        <View className="w-px bg-[#E5E7EB]" />

        <Pressable
          onPress={confirmDelete}
          className="flex-row items-center justify-center flex-1 gap-1.5 py-3"
        >
          <Ionicons name="trash-outline" size={16} color="#EF4444" />
          <Text className="text-sm font-semibold text-[#EF4444]">حذف</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
