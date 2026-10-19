import MapPropertyMarker from "@/components/mapPropertyMarker";
import MapPropertyPreviewCard from "@/components/mapPropertyPreviewCard";
import PropertySearchBar from "@/components/propertySearchBar";
import { PROPERTIES } from "@/data/myAds";
import type { Property } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import MapView, { MapType, Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const MAP_STYLES: { label: string; value: MapType }[] = [
  { label: "قياسي", value: "standard" },
  { label: "قمر صناعي", value: "satellite" },
  { label: "هجين", value: "hybrid" },
  { label: "تضاريس", value: "terrain" },
];

const INITIAL_REGION = {
  latitude: 15.5896,
  longitude: 32.5599,
  latitudeDelta: 0.15,
  longitudeDelta: 0.15,
};

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [mapStyle, setMapStyle] = useState<MapType>("standard");
  const [isMapStyleSelectorVisible, setIsMapStyleSelectorVisible] =
    useState(false);

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="flex-1">
        <MapView
          style={{ flex: 1 }}
          mapType={mapStyle}
          initialRegion={INITIAL_REGION}
          onPress={() => {
            if (selectedProperty) {
              setSelectedProperty(null);
            } else {
              return;
            }
          }}
        >
          {PROPERTIES.map((property) => (
            <Marker
              key={property.id}
              coordinate={{
                latitude: property.location.latitude,
                longitude: property.location.longitude,
              }}
              onPress={() => {
                setSelectedProperty(property);
              }}
            >
              <MapPropertyMarker />
            </Marker>
          ))}
        </MapView>

        <View className="absolute top-0 left-0 right-0">
          <PropertySearchBar
            value={searchText}
            onChangeText={setSearchText}
            placeholder="ابحث عن موقع أو حي..."
          />
        </View>

        <View className="absolute top-[68px] right-3 z-10">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="اختيار نمط الخريطة"
            accessibilityState={{ expanded: isMapStyleSelectorVisible }}
            className="flex-row-reverse items-center gap-2 rounded-xl bg-white px-3 py-2.5 shadow-md"
            onPress={() =>
              setIsMapStyleSelectorVisible(!isMapStyleSelectorVisible)
            }
          >
            <Ionicons name="layers-outline" size={18} color="#0F113C" />
            <Text className="text-sm font-medium text-[#0F113C]">
              {MAP_STYLES.find((style) => style.value === mapStyle)?.label}
            </Text>
            <Ionicons
              name={isMapStyleSelectorVisible ? "chevron-up" : "chevron-down"}
              size={16}
              color="#0F113C"
            />
          </Pressable>

          {isMapStyleSelectorVisible && (
            <View className="mt-2 overflow-hidden rounded-xl bg-white shadow-md">
              {MAP_STYLES.map((style) => (
                <Pressable
                  key={style.value}
                  accessibilityRole="button"
                  accessibilityLabel={`نمط الخريطة ${style.label}`}
                  accessibilityState={{ selected: mapStyle === style.value }}
                  className="flex-row-reverse items-center justify-between px-3 py-2.5"
                  onPress={() => {
                    setMapStyle(style.value);
                    setIsMapStyleSelectorVisible(false);
                  }}
                >
                  <Text
                    className={`text-sm ${
                      mapStyle === style.value
                        ? "font-semibold text-[#0F113C]"
                        : "text-gray-600"
                    }`}
                  >
                    {style.label}
                  </Text>
                  {mapStyle === style.value && (
                    <Ionicons name="checkmark" size={16} color="#0F113C" />
                  )}
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <Pressable className="absolute items-center justify-center bg-white rounded-full shadow-md w-11 h-11 right-4 bottom-4">
          <Ionicons name="locate" size={20} color="#0F113C" />
        </Pressable>

        {selectedProperty && (
          <MapPropertyPreviewCard
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
