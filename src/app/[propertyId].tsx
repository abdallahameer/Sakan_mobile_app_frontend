import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
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

interface PropertyDetails {
  id: string;
  title: string;
  address: string;
  price: number;
  originalPrice?: number;
  images: string[];
  isFavorite: boolean;
  info: {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    label: string;
    value: string;
  }[];
  features: string[];
  description: string;
  phone: string;
}

const MOCK_PROPERTY: PropertyDetails = {
  id: "1",
  title: "شقة للبيع",
  address: "شارع 7127967، حي اليرموك، مدينة الرياض، منطقة الرياض",
  price: 800000,
  originalPrice: 900000,
  images: [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  ],
  isFavorite: false,
  info: [
    { icon: "ruler-square", label: "المساحة", value: "89 م²" },
    { icon: "compass-outline", label: "الواجهة", value: "شمال" },
    { icon: "bed-outline", label: "غرف النوم", value: "1" },
    { icon: "sofa-outline", label: "الصالات", value: "2" },
    { icon: "toilet", label: "دورات مياه", value: "2" },
    { icon: "road-variant", label: "عرض الشارع", value: "30 م" },
  ],
  features: [
    "مطبخ",
    "ملحق",
    "مدخل سيارة",
    "مصعد",
    "توفر الماء",
    "توفر الكهرباء",
    "سطح خاص",
    "مدخلين",
    "مدخل خاص",
    "قريب من محطة باص",
  ],
  description:
    "للبيع مباشرة من المالك — شقة مع ملحق علوي في حي اليرموك بالرياض. تتميز بوجود سطح خاص كبير يوفر مساحة خارجية ممتازة، بالإضافة إلى مدخل مستقل وموقع قريب من الخدمات ووسائل المواصلات. تشطيبات حديثة وتصميم عملي يناسب العائلات.",
  phone: "+249900000000",
};

const screenWidth = Dimensions.get("screen").width;

function chunkPairs<T>(items: T[]): T[][] {
  const pairs: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push(items.slice(i, i + 2));
  }
  return pairs;
}

export default function PropertyDetailsScreen() {
  const router = useRouter();
  const { propertyId } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const property = MOCK_PROPERTY;

  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(property.isFavorite);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const discountPercent =
    property.originalPrice && property.originalPrice > property.price
      ? Math.round(
          ((property.originalPrice - property.price) / property.originalPrice) *
            100,
        )
      : null;

  const featureRows = chunkPairs(property.features);

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA]" edges={["top"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 33 }}>
        <View className="relative">
          <Image
            source={{ uri: property.images[currentImage] }}
            style={{ width: screenWidth, height: 320 }}
          />

          <View className="absolute flex-row items-center justify-between w-full px-4 top-4">
            <Pressable
              onPress={() => router.back()}
              className="items-center justify-center bg-white rounded-full w-11 h-11"
            >
              <Ionicons name="arrow-forward" size={22} color="#0F113C" />
            </Pressable>

            <View className="flex-row items-center gap-3">
              <Pressable
                onPress={() => setIsFavorited((prev) => !prev)}
                className="items-center justify-center bg-white rounded-full w-11 h-11"
              >
                <Ionicons
                  name={isFavorited ? "heart" : "heart-outline"}
                  size={20}
                  color={isFavorited ? "#EF4444" : "#0F113C"}
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

          <Pressable className="absolute flex-row items-center gap-1 px-3 py-1.5 rounded-full bottom-4 left-4 bg-black/50">
            <Ionicons name="images-outline" size={14} color="#ffffff" />
            <Text className="text-xs font-semibold text-white">
              {property.images.length} · شاهد الصور
            </Text>
          </Pressable>
        </View>

        <View className="gap-3 px-5 pt-5">
          <Text className="text-xl font-bold text-left text-[#0F113C]">
            {propertyId}
          </Text>
          <View className="flex-row items-center gap-1">
            <Ionicons name="location-outline" size={15} color="#6B7280" />
            <Text className="flex-1 text-sm text-left text-[#6B7280]">
              {property.address}
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Text className="text-2xl font-bold text-[#10B981]">
              {property.price.toLocaleString("ar-EG")} ريال
            </Text>
          </View>

          <Text className="mt-4 mb-1 text-lg font-bold text-left text-[#0F113C]">
            معلومات العقار
          </Text>

          <View className="overflow-hidden border border-[#E5E7EB] rounded-2xl">
            {property.info.map((item, index) => (
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

          <Text className="mt-4 mb-1 text-lg font-bold text-left text-[#0F113C]">
            مميزات العقار
          </Text>

          <View className="overflow-hidden border border-[#E5E7EB] rounded-2xl">
            {featureRows.map((pair, rowIndex) => (
              <View
                key={rowIndex}
                className="flex-row"
                style={{
                  backgroundColor: rowIndex % 2 === 0 ? "#F8F9FA" : "#ffffff",
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
            onPress={() => setDescriptionExpanded((prev) => !prev)}
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
          onPress={() => Linking.openURL(`https://wa.me/${property.phone}`)}
          className="flex-row w-[50%] p-2 rounded-xl border border-green-800 items-center justify-center bg-green-400/30"
        >
          <FontAwesome name="whatsapp" size={18} color="black" />
        </Pressable>

        <Pressable
          onPress={() => Linking.openURL(`tel:${property.phone}`)}
          className="flex-row w-[50%] p-2 rounded-xl border border-gray-500 items-center justify-center bg-blue-400/30"
        >
          <FontAwesome name="phone" size={18} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
