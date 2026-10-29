import { api } from "@/lib/api";
import type { Property } from "@/types";
import { PropertiesPage } from "@/types/property";
import { titleHandler } from "@/utilities/functions";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Image, Linking, Pressable, Text, View } from "react-native";

export default function PropertyCard({
  property,
  onFavorite,
}: {
  property: Property;
  onFavorite?: (id: string) => void;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleFavorite = async () => {
    try {
      const shouldFavorite = !property.isFavorite;

      const res = shouldFavorite
        ? await api.post(`/favorites/${property.id}`)
        : await api.delete(`/favorites/${property.id}`);

      if (res.status < 200 || res.status >= 300) return;

      queryClient.setQueriesData<InfiniteData<PropertiesPage>>(
        { queryKey: ["properties"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              properties: page.properties.map((p) =>
                p.id === property.id ? { ...p, isFavorite: shouldFavorite } : p,
              ),
            })),
          };
        },
      );

      queryClient.setQueryData<InfiniteData<PropertiesPage>>(
        ["savedProperties"],
        (oldData) => {
          if (!oldData) {
            return oldData;
          }

          if (!shouldFavorite) {
            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                properties: page.properties.filter((p) => p.id !== property.id),
              })),
            };
          }

          const alreadySaved = oldData.pages.some((page) =>
            page.properties.some((p) => p.id === property.id),
          );

          if (alreadySaved) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page, index) =>
              index === 0
                ? {
                    ...page,
                    properties: [
                      { ...property, isFavorite: true },
                      ...page.properties,
                    ],
                  }
                : page,
            ),
          };
        },
      );
    } catch (err) {
      console.error("Failed to update favorite:", err);
    }
  };

  const phoneNumber = `${property.phoneKey ?? ""}${property.phone ?? ""}`;
  const whatsappNumber = `${property.whatsAppKey ?? property.phoneKey ?? ""}${property.whatsapp ?? property.phone ?? ""}`;

  return (
    <Pressable
      onPress={() => router.push(`/${property.id}`)}
      className="flex-row items-center gap-2 mb-3 bg-white shadow-sm max-h-48 rounded-2xl"
    >
      <View className="relative w-[30%] h-full">
        <Image
          source={{ uri: property.images?.[0] }}
          className="w-full h-full rounded-r-none rounded-2xl"
          resizeMode="cover"
        />

        <View className="absolute px-2 py-0.5 rounded-full top-1 right-1 bg-blue-500/40">
          <Text className="text-[10px] font-semibold text-[#171947]">
            {property.listingType == "rent" ? "إيجار" : "بيع"}
          </Text>
        </View>
      </View>
      <View className="flex-col flex-1 gap-2">
        <View className="flex-row items-end justify-between flex-1 gap-2 p-3 ">
          <View className="flex-row h-full gap-2 w-fit">
            <View className="flex-col items-start gap-1 pr-3">
              <Text
                className="mb-1  text-xl font-bold text-right text-[#171947]"
                numberOfLines={1}
              >
                {titleHandler(property.title, 19)}
              </Text>

              <View className="flex-row-reverse items-center gap-1 mb-1.5">
                <Ionicons name="location" color={"#3b82f6"} size={13} />

                <Text className="text-xs text-blue-900" numberOfLines={1}>
                  {`${property.location.city}-${property.location.neighborhood}`}
                </Text>
              </View>

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
                    {property.rooms} غرف
                  </Text>
                </View>
              </View>

              {property.postedAt && (
                <Text className="mb-1 text-[11px] text-right text-[#8587A3]">
                  {property.postedAt}
                </Text>
              )}

              <Text className="text-lg font-bold text-right text-blue-500">
                {property.price.toLocaleString("ar-EG")} جنيه
              </Text>
            </View>
          </View>

          <View className="flex-row items-start justify-start h-full ">
            <Pressable
              onPress={handleFavorite}
              className="items-center justify-center w-6 h-6 bg-white rounded-full bottom-1 left-1"
            >
              <FontAwesome
                name={property.isFavorite ? "bookmark" : "bookmark-o"}
                size={14}
                color={property.isFavorite ? "#3b82f6" : "black"}
              />
            </Pressable>
          </View>
        </View>
        <View className="flex-row gap-2">
          <Pressable
            onPress={() => {
              Linking.openURL(
                `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`,
              );
            }}
            className="w-[45%] h-full"
          >
            <View className="flex-row items-center justify-center w-full p-2 mb-2 rounded-xl bg-green-400/30">
              <FontAwesome name="whatsapp" size={18} color="black" />
            </View>
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
            disabled={!property.phone}
            className="w-[45%] h-full"
          >
            <View className="flex-row items-center justify-center w-full p-2 mb-2 rounded-xl bg-blue-400/30">
              <FontAwesome name="phone" size={18} color="black" />
            </View>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
