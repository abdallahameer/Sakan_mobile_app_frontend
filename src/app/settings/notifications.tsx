import PropertyCard from "@/components/propertyCard";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

const LATEST_NOTIFICATIONS = [
  {
    id: "1",
    title: "شقة فاخرة في الرياض",
    location: "الرياض، الخرطوم",
    price: 3900000,
    beds: 3,
    baths: 2,
    area: 125,
    description:
      "شقة أنيقة من 3 غرف في حي الرياض بالخرطوم، بتشطيب فاخر ومساحات مريحة مناسبة للعائلات.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1565183938294-7563f3ff688c?w=500&h=400&fit=crop",
    ],
    isFavorite: false,
  },
  {
    id: "2",
    title: "فيلا راقية في المنشية",
    location: "المنشية، الخرطوم",
    price: 5200000,
    beds: 4,
    baths: 3,
    area: 200,
    description:
      "فيلا سكنية راقية في منطقة المنشية، تضم 4 غرف وحديقة ومساحات واسعة مناسبة للسكن العائلي.",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9b274b3f0399?w=500&h=400&fit=crop",
    ],
    isFavorite: false,
  },
  {
    id: "3",
    title: "استوديو عصري في العمارات",
    location: "العمارات، الخرطوم",
    price: 1800000,
    beds: 1,
    baths: 1,
    area: 65,
    description:
      "استوديو عصري ومريح في حي العمارات، بتصميم حديث وتشطيب أنيق وموقع قريب من الخدمات.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&h=400&fit=crop",
    ],
    isFavorite: false,
  },
  {
    id: "4",
    title: "شقة عائلية في كافوري",
    location: "كافوري، الخرطوم بحري",
    price: 3900000,
    beds: 3,
    baths: 2,
    area: 125,
    description:
      "شقة عائلية مميزة في كافوري، تتكون من 3 غرف وتشطيب جيد مع مساحة مناسبة للعائلة.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1565183938294-7563f3ff688c?w=500&h=400&fit=crop",
    ],
    isFavorite: false,
  },
  {
    id: "5",
    title: "فيلا عصرية في الطائف",
    location: "الطائف، الخرطوم",
    price: 5200000,
    beds: 4,
    baths: 3,
    area: 200,
    description:
      "فيلا عصرية واسعة في حي الطائف، تحتوي على 4 غرف وحديقة ومساحات داخلية مريحة.",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9b274b3f0399?w=500&h=400&fit=crop",
    ],
    isFavorite: false,
  },
  {
    id: "6",
    title: "استوديو مفروش في أركويت",
    location: "أركويت، الخرطوم",
    price: 1800000,
    beds: 1,
    baths: 1,
    area: 65,
    description:
      "استوديو مفروش بتصميم عصري في أركويت، مناسب للسكن الفردي وقريب من عدد من الخدمات والمرافق.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&h=400&fit=crop",
    ],
    isFavorite: false,
  },
  {
    id: "7",
    title: "شقة فاخرة في المقرن",
    location: "المقرن، الخرطوم",
    price: 3900000,
    beds: 3,
    baths: 2,
    area: 125,
    description:
      "شقة فاخرة في منطقة المقرن، تضم 3 غرف وصالة واسعة وتشطيب أنيق ومناسب للعائلات.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1565183938294-7563f3ff688c?w=500&h=400&fit=crop",
    ],
    isFavorite: false,
  },
  {
    id: "8",
    title: "فيلا عائلية في شمبات",
    location: "شمبات، الخرطوم بحري",
    price: 5200000,
    beds: 4,
    baths: 3,
    area: 200,
    description:
      "فيلا عائلية واسعة في شمبات، تتكون من 4 غرف مع مساحات داخلية مريحة ومناسبة للعائلات الكبيرة.",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9b274b3f0399?w=500&h=400&fit=crop",
    ],
    isFavorite: false,
  },
  {
    id: "9",
    title: "استوديو حديث في أم درمان",
    location: "الموردة، أم درمان",
    price: 1800000,
    beds: 1,
    baths: 1,
    area: 65,
    description:
      "استوديو حديث في منطقة الموردة بأم درمان، بتصميم عملي وتشطيب أنيق ومناسب للسكن الفردي.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&h=400&fit=crop",
    ],
    isFavorite: false,
  },
];

export default function NotificationsSettings() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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
          <Text className="text-lg font-bold text-[#0F113C]">الإشعارات</Text>
        </View>
      </View>

      <FlatList
        data={LATEST_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
        ListHeaderComponent={
          <View>
            <View className="flex-row bg-white items-center justify-between px-4 py-4 mb-6 border border-[#E5E7EB] rounded-2xl">
              <View className="flex-col items-start flex-1 gap-1 pr-3">
                <Text className="text-base font-semibold text-right text-[#0F113C]">
                  تفعيل الإشعارات
                </Text>
                <Text className="text-xs text-right text-[#9CA3AF]">
                  {notificationsEnabled
                    ? "ستصلك تنبيهات بأحدث العقارات المطابقة لبحثك"
                    : "تم إيقاف الإشعارات مؤقتًا"}
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#E5E7EB", true: "#10B98155" }}
                thumbColor={notificationsEnabled ? "#10B981" : "#ffffff"}
              />
            </View>

            <Text className="mb-3 text-base font-bold text-left text-[#0F113C]">
              أحدث الإشعارات
            </Text>
          </View>
        }
        renderItem={({ item }) => <PropertyCard property={item} />}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListEmptyComponent={
          <Text className="mt-10 text-sm text-center text-[#9CA3AF]">
            لا توجد إشعارات حاليًا
          </Text>
        }
      />
    </SafeAreaView>
  );
}
