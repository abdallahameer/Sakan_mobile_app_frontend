import MapPropertyMarker from "@/components/mapPropertyMarker";
import MapPropertyPreviewCard from "@/components/mapPropertyPreviewCard";
import PropertySearchBar from "@/components/propertySearchBar";
import { PROPERTIES } from "@/data/myAds";
import type { Property } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

// Centered roughly on Khartoum.
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

  console.log(selectedProperty);

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="flex-1">
        <MapView
          // provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
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
                console.log("MARKER PRESSED:", property.id);
                setSelectedProperty(property);
              }}
            >
              <MapPropertyMarker />
            </Marker>
          ))}
        </MapView>

        {/* Search bar overlay */}
        <View className="absolute top-0 left-0 right-0">
          <PropertySearchBar
            value={searchText}
            onChangeText={setSearchText}
            placeholder="ابحث عن موقع أو حي..."
          />
        </View>

        {/* My-location button */}
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
