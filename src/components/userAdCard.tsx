import type { Property } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

export default function UserAdCard({
  ad,
  onEdit,
  onDelete,
}: {
  ad: Property;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const router = useRouter();
  const { colors } = useTheme();

  const confirmDelete = () => {
    Alert.alert("حذف الإعلان", "هل أنت متأكد من حذف هذا الإعلان؟", [
      { text: "إلغاء", style: "cancel" },
      { text: "حذف", style: "destructive", onPress: () => onDelete(ad.id) },
    ]);
  };

  return (
    <Pressable
      onPress={() => router.push(`/propertyDetails?id=${ad.id}` as any)}
      className="overflow-hidden bg-white shadow-sm rounded-2xl dark:bg-[#17192D]"
    >
      <View className="flex-row items-center gap-2">
        <View className="relative w-[30%] h-32">
          <Image source={{ uri: ad.images[0] }} className="w-full h-full" />
        </View>

        <View className="flex-1 gap-1 py-2 pr-3">
          <Text
            className="text-base font-bold text-left text-[#171947] dark:text-[#F3F4F6]"
            numberOfLines={1}
          >
            {ad.title}
          </Text>

          <View className="flex-row items-center gap-1">
            <Ionicons name="location" size={12} color="#3b82f6" />
            <Text className="text-xs text-blue-900 dark:text-[#A1A1AA]" numberOfLines={1}>
              {ad.location.address}
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Ionicons
                name="eye-outline"
                size={13}
                color={colors.secondaryText}
              />
              <Text className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">{ad.views} مشاهدة</Text>
            </View>
            <Text className="text-[11px] text-[#8587A3] dark:text-[#A1A1AA]">
              {ad.postedAt ??
                new Date(ad.createdAt).toLocaleDateString("ar-EG")}
            </Text>
          </View>

          <Text className="text-sm font-bold text-left text-blue-800">
            {ad.price.toLocaleString()} جنيه
          </Text>
        </View>
      </View>

      <View className="flex-row border-t border-[#E5E7EB] dark:border-[#36384D]">
        <Pressable
          onPress={() => onEdit(ad.id)}
          className="flex-row items-center justify-center flex-1 gap-1.5 py-3"
        >
          <Ionicons name="create-outline" size={16} color={colors.text} />
          <Text className="text-sm font-semibold text-[#0F113C] dark:text-[#F3F4F6]">تعديل</Text>
        </Pressable>

        <View className="w-px bg-[#E5E7EB] dark:bg-[#36384D]" />

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
