import { api } from "@/lib/api";
import type { Property } from "@/types";
import { PropertiesPage } from "@/types/property";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { InfiniteData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type PropertyDetails = Omit<Property, "location"> & {
  location: Omit<Property["location"], "address"> & { address?: string };
  phoneKey?: string;
  whatsAppKey?: string;
};

function chunkPairs<T>(items: T[]): T[][] {
  const rows: T[][] = [];
  for (let index = 0; index < items.length; index += 2) {
    rows.push(items.slice(index, index + 2));
  }
  return rows;
}

export default function PropertyDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ propertyId: string | string[] }>();
  const propertyId = Array.isArray(params.propertyId)
    ? params.propertyId[0]
    : params.propertyId;
  const insets = useSafeAreaInsets();
  const [currentImage, setCurrentImage] = useState(0);

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const queryClient = useQueryClient();
  const {
    data: property,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["property", propertyId],
    enabled: Boolean(propertyId),
    queryFn: async () => {
      const response = await api.get<
        PropertyDetails | { property: PropertyDetails }
      >(`/properties/${encodeURIComponent(propertyId!)}`);
      return "property" in response.data
        ? response.data.property
        : response.data;
    },
  });

  const handleFavorite = async () => {
    if (property == undefined) return;
    try {
      const shouldFavorite = !property.isFavorite;

      const res = shouldFavorite
        ? await api.post(`/favorites/${property.id}`)
        : await api.delete(`/favorites/${property.id}`);

      if (res.status < 200 || res.status >= 300) return;

      queryClient.setQueryData(
        ["property", propertyId],
        (oldData: Property | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            isFavorite: shouldFavorite,
          };
        },
      );

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

      // Update favorites cache
      queryClient.setQueryData<InfiniteData<PropertiesPage>>(
        ["savedProperties"],
        (oldData) => {
          if (!oldData) return oldData;

          if (!shouldFavorite) {
            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                properties: page.properties.filter((p) => p.id !== property.id),
              })),
            };
          }

          return oldData;
        },
      );

      if (shouldFavorite) {
        await queryClient.invalidateQueries({
          queryKey: ["savedProperties"],
        });
      }
    } catch (err) {
      console.error("Failed to update favorite:", err);
    }
  };

  if (isPending) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-[#F0F1FA]">
        <ActivityIndicator size="large" color="#10B981" />
      </SafeAreaView>
    );
  }

  if (isError || !property) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 gap-4 bg-[#F0F1FA]">
        <Text className="text-base text-[#6B7280]">
          تعذر تحميل بيانات العقار
        </Text>
        <Pressable onPress={() => router.back()}>
          <Text className="font-semibold text-[#10B981]">العودة</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const features = [
    property.kitchen && "مطبخ",
    property.annex && "ملحق",
    property.carEntrance && "مدخل سيارة",
    property.elevator && "مصعد",
    property.airConditioners && "مكيفات",
    property.water && "توفر الماء",
    property.electricity && "توفر الكهرباء",
    property.solarSystem && "نظام طاقة شمسية",
    property.roof && "سطح",
  ].filter((feature): feature is string => Boolean(feature));

  const propertyInfo = [
    {
      icon: "home-city-outline",
      label: "نوع العقار",
      value: property.propertyType === "residential" ? "سكني" : "تجاري",
    },
    {
      icon: "tag-outline",
      label: "نوع الإعلان",
      value: property.listingType === "rent" ? "للإيجار" : "للبيع",
    },
    {
      icon: "ruler-square",
      label: "المساحة",
      value: `${property.area} م²`,
    },
    {
      icon: "bed-outline",
      label: "غرف النوم",
      value: String(property.rooms),
    },
    {
      icon: "sofa-outline",
      label: "الصالات",
      value: String(property.livingRoom),
    },
    {
      icon: "toilet",
      label: "دورات المياه",
      value: String(property.bathrooms),
    },
    {
      icon: "stairs",
      label: "الطابق",
      value: String(property.floorNumber),
    },
    {
      icon: "home-outline",
      label: "عمر العقار",
      value: `${property.propertyAge} سنوات`,
    },
    {
      icon: "account-group-outline",
      label: "مناسب لـ",
      value: property.familyOrSingle === "family" ? "عائلات" : "أفراد",
    },
    {
      icon: "calendar-month-outline",
      label: "حالة العقار",
      value: property.propertyStatus === "ready" ? "جاهز" : "قيد الإنشاء",
    },
    {
      icon: "sofa-outline",
      label: "التأثيث",
      value: property.furnished ? "مفروش" : "غير مفروش",
    },
    {
      icon: "cash-clock",
      label: "طريقة الدفع",
      value:
        property.paymentType === "monthly"
          ? "شهري"
          : property.paymentType === "yearly"
            ? "سنوي"
            : "يومي",
    },
  ] as const;

  const phoneNumber = `${property.phoneKey ?? ""}${property.phone ?? ""}`;
  const whatsappNumber = `${property.whatsAppKey ?? property.phoneKey ?? ""}${property.whatsapp ?? property.phone ?? ""}`;

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA]" edges={["top"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 33 }}>
        <View className="relative">
          {property.images.length > 0 ? (
            <Image
              source={{ uri: property.images[currentImage] }}
              style={{ width: "100%", height: 320 }}
              onError={() => setCurrentImage(0)}
            />
          ) : (
            <View className="items-center justify-center w-full h-80 bg-[#E5E7EB]">
              <Ionicons name="image-outline" size={40} color="#9CA3AF" />
            </View>
          )}

          <View className="absolute flex-row items-center justify-between w-full px-4 top-4">
            <Pressable
              onPress={() => router.back()}
              className="items-center justify-center bg-white rounded-full w-11 h-11"
            >
              <Ionicons name="arrow-forward" size={22} color="#0F113C" />
            </Pressable>

            <View className="flex-row items-center gap-3">
              <Pressable
                onPress={handleFavorite}
                className="items-center justify-center bg-white rounded-full w-11 h-11"
              >
                <Ionicons
                  name={property.isFavorite ? "bookmark" : "bookmark-outline"}
                  size={20}
                  color={property.isFavorite ? "#3b82f6" : "blck"}
                />
              </Pressable>
              <Pressable className="items-center justify-center bg-white rounded-full w-11 h-11">
                <Ionicons
                  name="share-social-outline"
                  size={20}
                  color="#0F113C"
                />
              </Pressable>
            </View>
          </View>

          {property.images.length > 0 && (
            <Pressable
              onPress={() =>
                setCurrentImage((index) => (index + 1) % property.images.length)
              }
              className="absolute flex-row items-center gap-1 px-3 py-1.5 rounded-full bottom-4 left-4 bg-black/50"
            >
              <Ionicons name="images-outline" size={14} color="#ffffff" />
              <Text className="text-xs font-semibold text-white">
                {property.images.length} · شاهد الصور
              </Text>
            </Pressable>
          )}
        </View>

        <View className="gap-3 px-5 pt-5">
          <Text className="text-xl font-bold text-left text-[#0F113C]">
            {property.title}
          </Text>
          <View className="flex-row items-center gap-1">
            <Ionicons name="location-outline" size={15} color="#6B7280" />
            <Text className="flex-1 text-sm text-left text-[#6B7280]">
              {property.location.address ??
                `${property.location.city}، ${property.location.neighborhood}`}
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Text className="text-2xl font-bold text-[#10B981]">
              {property.price.toLocaleString("ar-EG")} جنيه
            </Text>
          </View>

          <Text className="mt-4 mb-1 text-lg font-bold text-left text-[#0F113C]">
            معلومات العقار
          </Text>

          <View className="overflow-hidden border border-[#E5E7EB] rounded-2xl">
            {propertyInfo.map((item, index) => (
              <View
                key={item.label}
                className="flex-row items-center justify-between px-4 py-3.5"
                style={{
                  backgroundColor: index % 2 === 0 ? "#F8F9FA" : "#ffffff",
                }}
              >
                <View className="flex-row items-center gap-2">
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={18}
                    color="#10B981"
                  />
                  <Text className="text-sm font-semibold text-left text-[#0F113C]">
                    {item.label}
                  </Text>
                </View>
                <Text className="text-sm text-[#374151]">{item.value}</Text>
              </View>
            ))}
          </View>

          {features.length > 0 && (
            <>
              <Text className="mt-4 mb-1 text-lg font-bold text-left text-[#0F113C]">
                مميزات العقار
              </Text>
              <View className="overflow-hidden border border-[#E5E7EB] rounded-2xl">
                {chunkPairs(features).map((pair, rowIndex) => (
                  <View
                    key={pair.join("-")}
                    className="flex-row"
                    style={{
                      backgroundColor:
                        rowIndex % 2 === 0 ? "#F8F9FA" : "#ffffff",
                    }}
                  >
                    {pair.map((feature) => (
                      <View
                        key={feature}
                        className="flex-row items-center justify-start flex-1 gap-2 px-2 py-3.5"
                      >
                        <Text className="text-sm font-medium text-[#374151]">
                          {feature}
                        </Text>
                        <Ionicons
                          name="checkmark-circle"
                          size={16}
                          color="#10B981"
                        />
                      </View>
                    ))}
                    {pair.length === 1 && <View className="flex-1" />}
                  </View>
                ))}
              </View>
            </>
          )}

          <Text className="mt-4 mb-1 text-lg font-bold text-left text-[#0F113C]">
            وصف العقار
          </Text>

          <Text
            className="text-sm leading-7 text-left text-[#374151]"
            numberOfLines={descriptionExpanded ? undefined : 2}
          >
            {property.description}
          </Text>
          <Pressable
            onPress={() => setDescriptionExpanded((previous) => !previous)}
            className="self-start"
          >
            <Text className="text-sm font-semibold underline text-[#10B981]">
              {descriptionExpanded ? "اقرأ أقل" : "اقرأ المزيد"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      <View
        className="flex-row items-center justify-between w-full gap-2 px-4 pt-3 border-t border-[#E5E7EB] bg-[#F8F9FA]"
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <Pressable
          onPress={() =>
            Linking.openURL(
              `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`,
            )
          }
          disabled={!property.whatsapp && !property.phone}
          className="flex-row w-[50%] p-2 rounded-xl border border-green-800 items-center justify-center bg-green-400/30"
        >
          <FontAwesome name="whatsapp" size={18} color="black" />
        </Pressable>

        <Pressable
          onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
          disabled={!property.phone}
          className="flex-row w-[50%] p-2 rounded-xl border border-gray-500 items-center justify-center bg-blue-400/30"
        >
          <FontAwesome name="phone" size={18} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
