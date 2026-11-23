import LocationPicker, {
  type LocationOption,
} from "@/components/locationPicker";
import { api } from "@/lib/api";
import { StepTwoProps } from "@/types/forms";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import AppNumberInput from "../InputsComponents/Appnumberinput";
import AppTextInput from "../InputsComponents/Apptextinput";
import PhoneNumberInput from "../InputsComponents/PhoneNumberInput";
import { useTheme } from "@/theme/ThemeProvider";

export default function StepTwo({
  control,
  formValues,
  setValue,
  onNext,
  update = false,
}: StepTwoProps) {
  const { isDarkMode, colors } = useTheme();
  const [selectedCityId, setSelectedCityid] = useState<string | null>(null);
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

  const {
    data: neighborhoods = [],
    isPending: loadingNeighborhood,
    isError: neighborhoodsError,
  } = useQuery({
    queryKey: ["neighborhoods", selectedCityId],
    enabled: selectedCityId !== null,
    queryFn: async () => {
      const response = await api.get<{ areas: LocationOption[] }>(
        "/locations/areas",
        { params: { cityId: selectedCityId } },
      );
      return response.data.areas;
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      className="flex-1"
      keyboardVerticalOffset={0}
    >
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
            onChangeCity={({ city, cityId }) => {
              setValue("city", city);
              setValue("neighborhood", "");
              setSelectedCityid(cityId.toString());
            }}
            onChangeNeighborhood={({ neighborhood }) => {
              setValue("neighborhood", neighborhood);
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
                  borderColor: colors.primary,
                  backgroundColor: formValues.termsAccepted
                    ? colors.primary
                    : "transparent",
                }}
              >
                {formValues.termsAccepted && (
                  <Ionicons name="checkmark" size={14} color="#ffffff" />
                )}
              </Pressable>

              <Text className="flex-1 text-sm leading-6 text-[#374151] dark:text-[#D1D5DB]">
                أوافق على{" "}
                <Text
                  onPress={() => Linking.openURL("https://example.com/terms")}
                  className="font-semibold text-blue-900 dark:text-blue-300"
                >
                  شروط الاستخدام
                </Text>{" "}
                و ألتزم{" "}
                <Text
                  onPress={() => Linking.openURL("https://example.com/ad-fees")}
                  className="font-semibold text-blue-900 dark:text-blue-300"
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
                borderColor: formValues.termsAccepted
                  ? colors.primary
                  : isDarkMode
                    ? colors.border
                    : "#D1D5DB",
                opacity: formValues.termsAccepted ? 1 : 0.5,
              }}
            >
              <Text
                className="text-base font-bold"
                style={{
                  color: formValues.termsAccepted
                    ? isDarkMode
                      ? "#F3F4F6"
                      : "#0F113C"
                    : isDarkMode
                      ? colors.secondaryText
                      : "#9CA3AF",
                }}
              >
                التالي
              </Text>
            </Pressable>
          ) : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
