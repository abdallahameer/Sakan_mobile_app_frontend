import type { Property } from "@/types";
import { titleHandler } from "@/utilities/functions";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

export default function MapPropertyPreviewCard({
  property,
  onClose,
}: {
  property: Property;
  onClose: () => void;
}) {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View className="absolute bottom-0 left-0 right-0 pb-6">
      <View className="items-end px-4 mb-2">
        <Pressable
          onPress={onClose}
          className="items-center justify-center w-8 h-8 bg-white rounded-full shadow-md dark:bg-[#17192D]"
        >
          <Ionicons name="close" size={18} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 12,
          width: "100%",
        }}
      >
        <Pressable
          key={property.id}
          onPress={() => router.push(`/${property.id}` as any)}
          className="flex-row items-center w-full gap-2 overflow-hidden bg-white shadow-lg rounded-2xl dark:bg-[#17192D]"
          style={{ elevation: 6 }}
        >
          <Image
            source={{ uri: property.images[0] }}
            className="w-28 h-28"
            resizeMode="cover"
          />

          <View className="flex-1 gap-1 py-2 pr-3">
            <Text
              className="text-base font-bold text-left text-[#0F113C] dark:text-[#F3F4F6]"
              numberOfLines={1}
            >
              {titleHandler(property.title, 19)}
            </Text>

            <View className="flex-row items-center gap-1">
              <Text className="text-xs text-[#0F113C] dark:text-[#D1D5DB]" numberOfLines={1}>
                {property.location.address}
              </Text>
              <Ionicons name="location" size={12} color={"#3b82f6"} />
            </View>

            <View className="flex-row items-center gap-3">
              <View className="flex-row items-center gap-1">
                <Text className="text-xs font-semibold text-[#6B7280] dark:text-[#A1A1AA]">
                  {property.area} م
                </Text>
                <MaterialCommunityIcons
                  name="ruler-square"
                  size={13}
                  color={"#3b82f6"}
                />
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="text-xs font-semibold text-[#6B7280] dark:text-[#A1A1AA]">
                  {property.rooms} غرف
                </Text>
                <Ionicons name="bed-outline" size={13} color={"#3b82f6"} />
              </View>
            </View>

            <Text className="text-sm font-bold text-left text-[#3b82f6]">
              {property.price.toLocaleString("ar-EG")} جنيه
            </Text>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}
