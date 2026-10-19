import { StepFourProps } from "@/types/forms";
import { Pressable, Text, View } from "react-native";
import MapView, {
  Marker,
  type MapPressEvent,
  type Region,
} from "react-native-maps";

const INITIAL_REGION: Region = {
  latitude: 15.5896,
  longitude: 32.5599,
  latitudeDelta: 0.15,
  longitudeDelta: 0.15,
};

export default function StepFour({
  formValues,
  setValue,
  onSubmit,
}: StepFourProps) {
  const selectedLocation =
    formValues.latitude !== null && formValues.longitude !== null
      ? {
          latitude: formValues.latitude,
          longitude: formValues.longitude,
        }
      : null;

  const selectLocation = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    setValue("latitude", latitude);
    setValue("longitude", longitude);
  };

  return (
    <View className="flex-1 px-4 pt-4 pb-6">
      <Text className="mb-3 text-right text-base font-semibold text-[#0F113C]">
        حدد موقع العقار على الخريطة
      </Text>

      <View className="flex-1 overflow-hidden rounded-xl">
        <MapView
          style={{ flex: 1 }}
          initialRegion={INITIAL_REGION}
          onPress={selectLocation}
        >
          {selectedLocation && <Marker coordinate={selectedLocation} />}
        </MapView>
      </View>

      <Pressable
        onPress={() => onSubmit(formValues)}
        className="items-center justify-center py-3.5 mt-4 rounded-xl"
        style={{ backgroundColor: "#0F113C" }}
      >
        <Text className="text-base font-bold text-white">
          اختيار الموقع والنشر
        </Text>
      </Pressable>
    </View>
  );
}
