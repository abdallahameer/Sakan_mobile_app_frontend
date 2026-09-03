import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

const COLORS = {
  primary: "#0F113C", // Dark blue - MAIN
  secondary: "#ffffff", // White - SECONDARY
  darkGray: "#6B7280",
  lightGray: "#D1D5DB",
  teal: "#10B981",
  tealBg: "#ECFDF5",
  background: "#F8F9FA",
};

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  description: string;
  images: string[];
  isFavorite: boolean;
  postedAt?: string; // e.g. "منذ ساعتين" — optional, falls back to nothing if omitted
}

export default function PropertyCard({
  property,
  onFavorite,
}: {
  property: Property;
  onFavorite?: (id: string) => void;
}) {
  const [isFavorited, setIsFavorited] = useState(property.isFavorite);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // onFavorite(property.id);
  };

  return (
    <Pressable className="flex-row items-center justify-between gap-2 p-3 mb-3 bg-white shadow-sm rounded-2xl">
      {/* Image thumbnail — rightmost in RTL */}
      <View className="flex-row h-full gap-2 w-fit">
        <View className="relative">
          <Image
            source={{ uri: property.images[0] }}
            style={{ width: 96, height: 96, borderRadius: 16 }}
          />
          {/* Property type badge, overlapping top of the thumbnail */}
          <View
            className="absolute px-2 py-0.5 rounded-full top-1 right-1"
            style={{ backgroundColor: COLORS.secondary }}
          >
            <Text
              className="text-[10px] font-semibold"
              style={{ color: COLORS.primary }}
            >
              للبيع
            </Text>
          </View>
        </View>

        {/* Text content */}
        <View className="flex-col items-start gap-1 pr-3">
          {/* Title */}
          <Text
            className="mb-1 text-base font-bold text-right"
            style={{ color: COLORS.primary }}
            numberOfLines={1}
          >
            {property.title}
          </Text>

          {/* Location */}
          <View className="flex-row-reverse items-center gap-1 mb-1.5">
            <Ionicons name="location" size={13} color={COLORS.darkGray} />
            <Text className="text-xs text-gray-600" numberOfLines={1}>
              {property.location}
            </Text>
          </View>

          {/* Stats row — area + beds, small teal icon chips */}
          <View className="flex-row-reverse items-center gap-3 mb-1.5">
            <View className="flex-row-reverse items-center gap-1">
              <MaterialCommunityIcons
                name="ruler-square"
                size={14}
                color={COLORS.teal}
              />
              <Text className="text-xs font-semibold text-gray-700">
                {property.area} م
              </Text>
            </View>
            <View className="flex-row-reverse items-center gap-1">
              <Ionicons name="bed-outline" size={14} color={COLORS.teal} />
              <Text className="text-xs font-semibold text-gray-700">
                {property.beds} غرف
              </Text>
            </View>
          </View>

          {/* Posted time */}
          {property.postedAt && (
            <Text
              className="mb-1 text-[11px] text-right"
              style={{ color: COLORS.lightGray }}
            >
              {property.postedAt}
            </Text>
          )}

          {/* Price */}
          <Text
            className="text-lg font-bold text-right"
            style={{ color: COLORS.primary }}
          >
            {property.price.toLocaleString("ar-EG")} جنيه
          </Text>
        </View>
      </View>
      {/* Favorite heart, bottom of thumbnail */}
      <View className="flex-row items-end justify-start h-full">
        <Pressable
          onPress={handleFavorite}
          className="bg-white rounded-full bottom-1 left-1"
          // style={{ width: 24, height: 24 }}
        >
          <Ionicons
            name={isFavorited ? "heart" : "heart-outline"}
            size={14}
            color={isFavorited ? "#EF4444" : COLORS.darkGray}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}
