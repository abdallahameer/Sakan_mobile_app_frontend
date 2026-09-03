import PropertyCard from "@/components/propertyCard";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PROPERTIES = [
  {
    id: "1",
    title: "Modern Luxury Apartment",
    location: "New Cairo, Cairo",
    price: 3900000,
    beds: 3,
    baths: 2,
    area: 125,
    description: "3 غرف بخصم 64% أو مقدم 900 الف بتشطيب فاخر شق...",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1565183938294-7563f3ff688c?w=500&h=400&fit=crop",
    ],
    isFavorite: false,
  },
  {
    id: "2",
    title: "Residential Villa",
    location: "Heliopolis, Cairo",
    price: 5200000,
    beds: 4,
    baths: 3,
    area: 200,
    description: "فيلا سكنية راقية مع حديقة وملحق خدم...",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9b274b3f0399?w=500&h=400&fit=crop",
    ],
    isFavorite: false,
  },
  {
    id: "3",
    title: "Contemporary Studio",
    location: "Downtown Cairo, Cairo",
    price: 1800000,
    beds: 1,
    baths: 1,
    area: 65,
    description: "استوديو عصري مع تشطيب ديلوكس في قلب القاهرة...",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&h=400&fit=crop",
    ],
    isFavorite: false,
  },
];

export default function SavedProperties() {
  return (
    <SafeAreaView className="flex-1">
      <View>
        <View className="flex-row pt-3 pl-3 items-center justify-start border-b-[#0F113C] border-b-[1px] mb-2">
          <Text className="text-3xl font-bold text-[#0F113C] ">المحفوظات</Text>
        </View>
        <FlatList
          keyExtractor={(p) => p.id}
          data={PROPERTIES}
          renderItem={({ item }) => <PropertyCard property={item} />}
          contentContainerStyle={{ padding: 16 }}
        />
      </View>
    </SafeAreaView>
  );
}
