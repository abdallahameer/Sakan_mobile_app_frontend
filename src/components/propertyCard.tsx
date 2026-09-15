import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

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
  postedAt?: string;
}

export default function PropertyCard({
  property,
  onFavorite,
}: {
  property: Property;
  onFavorite?: (id: string) => void;
}) {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(property.isFavorite);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // onFavorite(property.id);
  };

  const titleHandler = (title: string, length: number) => {
    if (title.length <= length) return title;

    return title.slice(0, length) + "...";
  };

  return (
    <Pressable
      onPress={() => router.push(`/${property.id}`)}
      className="flex-row items-center gap-2 mb-3 bg-white shadow-sm max-h-44 rounded-2xl"
    >
      {/* Image thumbnail */}
      <View className="relative w-[30%] h-full">
        <Image
          source={{ uri: property.images[0] }}
          className="w-full h-full rounded-r-none rounded-2xl"
        />

        {/* Property type badge */}
        <View className="absolute px-2 py-0.5 rounded-full top-1 right-1 bg-blue-500/40">
          <Text className="text-[10px] font-semibold text-[#171947]">
            للبيع
          </Text>
        </View>
      </View>
      <View className="flex-col flex-1 gap-2">
        <View className="flex-row items-end justify-between flex-1 gap-2 p-3 ">
          <View className="flex-row h-full gap-2 w-fit">
            {/* Text content */}
            <View className="flex-col items-start gap-1 pr-3">
              {/* Title - High priority */}
              <Text
                className="mb-1  text-xl font-bold text-right text-[#171947]"
                numberOfLines={1}
              >
                {titleHandler(property.title, 19)}
              </Text>

              {/* Location - Medium priority */}
              <View className="flex-row-reverse items-center gap-1 mb-1.5">
                <Ionicons name="location" color={"#3b82f6"} size={13} />

                <Text className="text-xs text-blue-900" numberOfLines={1}>
                  {property.location}
                </Text>
              </View>

              {/* Stats - Lower priority */}
              <View className="flex-row-reverse items-center gap-3 mb-1.5">
                <View className="flex-row-reverse items-center gap-1">
                  <MaterialCommunityIcons
                    name="ruler-square"
                    size={14}
                    color={"#3b82f6"}
                  />

                  <Text className="text-xs font-semibold text-[#5C5E82]">
                    {property.area} م
                  </Text>
                </View>

                <View className="flex-row-reverse items-center gap-1">
                  <Ionicons name="bed-outline" size={14} color={"#3b82f6"} />

                  <Text className="text-xs font-semibold text-[#5C5E82]">
                    {property.beds} غرف
                  </Text>
                </View>
              </View>

              {/* Posted time - Lowest priority */}
              {property.postedAt && (
                <Text className="mb-1 text-[11px] text-right text-[#8587A3]">
                  {property.postedAt}
                </Text>
              )}

              {/* Price - Highest priority */}
              <Text className="text-lg font-bold text-right text-blue-800">
                {property.price.toLocaleString("ar-EG")} جنيه
              </Text>
            </View>
          </View>

          {/* Favorite */}
          <View className="flex-row items-start justify-start h-full ">
            <Pressable
              onPress={handleFavorite}
              className="items-center justify-center w-6 h-6 bg-white rounded-full bottom-1 left-1"
            >
              <FontAwesome
                name={isFavorited ? "bookmark" : "bookmark-o"}
                size={14}
                color={isFavorited ? "#3b82f6" : "black"}
              />
            </Pressable>
          </View>
        </View>
        <View className="flex-row justify-start gap-2">
          <View className="flex-row w-[45%] p-2  mb-2 rounded-xl items-center justify-center bg-green-400/30">
            <FontAwesome name="whatsapp" size={18} color="black" />
          </View>
          <View className="flex-row w-[45%] p-2  mb-2 rounded-xl items-center justify-center bg-blue-400/30">
            <FontAwesome name="phone" size={18} color="black" />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
