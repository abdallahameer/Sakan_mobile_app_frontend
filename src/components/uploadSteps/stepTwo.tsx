import LocationPicker, {
  type LocationOption,
} from "@/components/locationPicker";
import { api } from "@/lib/api";
import type { UploadFormFields } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Control, UseFormSetValue } from "react-hook-form";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import AppNumberInput from "../InputsComponents/Appnumberinput";
import AppTextInput from "../InputsComponents/Apptextinput";
import PhoneNumberInput from "../InputsComponents/PhoneNumberInput";

type StepTwoProps = {
  control: Control<UploadFormFields>;
  formValues: UploadFormFields;
  setValue: UseFormSetValue<UploadFormFields>;
  onNext: () => void;
  update?: boolean;
};

export default function StepTwo({
  control,
  formValues,
  setValue,
  onNext,
  update = false,
}: StepTwoProps) {
  const {
    data: cities = [],
    isPending: loadingCities,
    isError: citiesError,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await api.get<{ cities: LocationOption[] }>(
        "/locations/cities",
      );
      return response.data.cities;
    },
  });

  const selectedCityId = cities.find(
    (item) => item.name === formValues.city,
  )?.id;
  const {
    data: neighborhoods = [],
    isPending: loadingNeighborhood,
    isError: neighborhoodsError,
  } = useQuery({
    queryKey: ["neighborhoods", selectedCityId],
    enabled: selectedCityId !== undefined,
    queryFn: async () => {
      const response = await api.get<{ areas: LocationOption[] }>(
        "/locations/areas",
        { params: { cityId: selectedCityId } },
      );
      return response.data.areas;
    },
  });

  console.log(neighborhoods);

  return (
    <ScrollView
      className="flex-1 w-full"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View className="gap-5 p-5">
        <View className="gap-1">
          <AppTextInput
            name="title"
            control={control}
            placeholder="مثال: شقة للإيجار في حي الرياض"
            label="العنوان*"
          />
        </View>

        <View className="flex-row items-center justify-between">
          <AppNumberInput
            label="السعر الإجمالي*"
            suffix="جنيه"
            name="price"
            placeholder="120000"
            control={control}
            containerClassName=" w-full"
          />
        </View>

        <View className="flex-row items-center justify-between">
          <AppNumberInput
            label="المساحة*"
            suffix="م²"
            name="area"
            placeholder="200"
            control={control}
            containerClassName=" w-full"
          />
        </View>

        <LocationPicker
          cities={cities}
          neighborhoods={neighborhoods}
          loadingCities={loadingCities}
          loadingNeighborhood={
            selectedCityId !== undefined && loadingNeighborhood
          }
          citiesError={citiesError}
          neighborhoodsError={neighborhoodsError}
          city={formValues.city}
          neighborhood={formValues.neighborhood}
          onChange={({ city, neighborhood }) => {
            setValue("city", city, {
              shouldDirty: true,
              shouldValidate: true,
            });
            setValue("neighborhood", neighborhood, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        />

        <View className="gap-1">
          <AppTextInput
            name={"description"}
            control={control}
            multiline
            placeholder="اكتب وصف عقارك هنا"
            label="وصف العقار*"
          />
        </View>

        <PhoneNumberInput
          control={control}
          name="phone"
          label="رقم الهاتف للتواصل"
          setValue={setValue}
          countryKeyField="phoneKey"
        />

        <PhoneNumberInput
          control={control}
          name="whatsapp"
          label="رقم واتساب"
          setValue={setValue}
          countryKeyField="whatsAppKey"
        />

        {update == false ? (
          <View className="flex-row items-center gap-2 mt-2">
            <Pressable
              onPress={() =>
                setValue("termsAccepted", !formValues.termsAccepted, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              className="items-center justify-center border rounded"
              style={{
                width: 20,
                height: 20,
                borderColor: "#0F113C",
                backgroundColor: formValues.termsAccepted
                  ? "#0F113C"
                  : "transparent",
              }}
            >
              {formValues.termsAccepted && (
                <Ionicons name="checkmark" size={14} color="#ffffff" />
              )}
            </Pressable>

            <Text className="flex-1 text-sm leading-6 text-[#374151]">
              أوافق على{" "}
              <Text
                onPress={() => Linking.openURL("https://example.com/terms")}
                className="font-semibold text-blue-900"
              >
                شروط الاستخدام
              </Text>{" "}
              و ألتزم{" "}
              <Text
                onPress={() => Linking.openURL("https://example.com/ad-fees")}
                className="font-semibold text-blue-900"
              >
                برسوم الإعلان
              </Text>
            </Text>
          </View>
        ) : null}

        {update == false ? (
          <Pressable
            onPress={onNext}
            disabled={!formValues.termsAccepted}
            className="items-center justify-center py-3.5 mt-1 border rounded-xl"
            style={{
              borderColor: formValues.termsAccepted ? "#0F113C" : "#D1D5DB",
              opacity: formValues.termsAccepted ? 1 : 0.5,
            }}
          >
            <Text
              className="text-base font-bold"
              style={{
                color: formValues.termsAccepted ? "#0F113C" : "#9CA3AF",
              }}
            >
              التالي
            </Text>
          </Pressable>
        ) : null}
      </View>
    </ScrollView>
  );
}
