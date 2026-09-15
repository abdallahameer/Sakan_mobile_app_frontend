import PropertyCard from "@/components/propertyCard";
import { SAVEDPROPERTIES } from "@/data/myAds";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedProperties() {
  return (
    <SafeAreaView className="flex-1">
      <View>
        <View className="flex-row pt-3 pl-3 items-center justify-center  border-b-[#0F113C] border-b-[1px] mb-3">
          <Text className="text-2xl font-bold text-[#0F113C] ">المحفوظات</Text>
        </View>
        <FlatList
          keyExtractor={(p) => p.id}
          data={SAVEDPROPERTIES}
          renderItem={({ item }) => <PropertyCard property={item} />}
          contentContainerClassName="p-4"
        />
      </View>
    </SafeAreaView>
  );
}
