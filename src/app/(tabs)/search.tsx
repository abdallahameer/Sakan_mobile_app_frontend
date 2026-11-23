import MapPropertyMarker from "@/components/mapPropertyMarker";
import MapPropertyPreviewCard from "@/components/mapPropertyPreviewCard";
import PropertyFilter from "@/components/propertyFilter";
import PropertySearchBar from "@/components/propertySearchBar";
import { api } from "@/lib/api";
import type { Property, PropertyFilterForm } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import MapView, { MapType, Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/ThemeProvider";

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
  const { colors } = useTheme();
  const {
    control,
    getValues,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<PropertyFilterForm>({
    defaultValues: {
      listingType: null,
      paymentType: null,
      familyOrSingle: null,
      propertyStatus: null,
      propertyType: null,
      furnished: null,
      rooms: null,
      bathrooms: null,
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
    },
  });

  const [searchText, setSearchText] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [mapStyle, setMapStyle] = useState<MapType>("standard");
  const [isMapStyleSelectorVisible, setIsMapStyleSelectorVisible] =
    useState(false);

  const formValues = watch();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchText.trim()), 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  const { data: properties } = useQuery({
    queryKey: ["propertiesLocations", formValues, debouncedSearch],
    queryFn: async () => {
      const response = await api.get("/properties", {
        params: { hasLocation: true, ...formValues, search: debouncedSearch },
      });
      return response.data;
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA] dark:bg-[#0B0D1D]" edges={["top"]}>
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
          {properties
            ? properties.properties.map((property: Property) => (
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
              ))
            : null}
        </MapView>

        <View className="absolute top-0 left-0 right-0 h-full">
          <PropertySearchBar
            value={searchText}
            onChangeText={setSearchText}
            placeholder="ابحث عن موقع أو حي..."
          />

          <PropertyFilter
            getValues={getValues}
            reset={reset}
            setError={setError}
            errors={errors}
            control={control}
            clearErrors={clearErrors}
            formValues={formValues}
            setValue={setValue}
          />
        </View>

        <View className="absolute top-[130px] right-3 z-10">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="اختيار نمط الخريطة"
            accessibilityState={{ expanded: isMapStyleSelectorVisible }}
            className="flex-row-reverse items-center gap-2 rounded-xl bg-white px-3 py-2.5 shadow-md dark:bg-[#17192D]"
            onPress={() =>
              setIsMapStyleSelectorVisible(!isMapStyleSelectorVisible)
            }
          >
            <Ionicons name="layers-outline" size={18} color={colors.text} />
            <Text className="text-sm font-medium text-[#0F113C] dark:text-[#F3F4F6]">
              {MAP_STYLES.find((style) => style.value === mapStyle)?.label}
            </Text>
            <Ionicons
              name={isMapStyleSelectorVisible ? "chevron-up" : "chevron-down"}
              size={16}
              color={colors.text}
            />
          </Pressable>

          {isMapStyleSelectorVisible && (
            <View className="mt-2 overflow-hidden bg-white shadow-md rounded-xl dark:bg-[#17192D]">
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
                        ? "font-semibold text-[#0F113C] dark:text-[#F3F4F6]"
                        : "text-gray-600 dark:text-[#A1A1AA]"
                    }`}
                  >
                    {style.label}
                  </Text>
                  {mapStyle === style.value && (
                    <Ionicons name="checkmark" size={16} color={colors.text} />
                  )}
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <Pressable className="absolute items-center justify-center bg-white rounded-full shadow-md w-11 h-11 right-4 bottom-4 dark:bg-[#17192D]">
          <Ionicons name="locate" size={20} color={colors.text} />
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
