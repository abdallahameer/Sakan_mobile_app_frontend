import PropertyCard from "@/components/propertyCard";
import PropertyFilter from "@/components/propertyFilter";
import PropertySearchBar from "@/components/propertySearchBar";
import { PROPERTIES } from "@/data/myAds";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#F0F1FA]">
      <PropertySearchBar />
      <PropertyFilter />

      <FlatList
        keyExtractor={(p) => p.id}
        data={PROPERTIES}
        renderItem={({ item }) => <PropertyCard property={item} />}
        contentContainerClassName="px-4 pt-4 pb-4"
      />
    </SafeAreaView>
  );
}
