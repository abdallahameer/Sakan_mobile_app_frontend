import type { PropertyFilterForm, RoomsNumber } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormReset,
  UseFormSetError,
} from "react-hook-form";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppNumberInput from "../InputsComponents/Appnumberinput";
import SmallOptionButton from "../buttons/SmallOptionButton";
import OptionButton from "../buttons/optionButton";
import FilterSection from "./filterSection";

type AllFiltersModalProps = {
  visible: boolean;
  onClose: () => void;

  formValues: PropertyFilterForm;

  setError: UseFormSetError<PropertyFilterForm>;
  clearErrors: UseFormClearErrors<PropertyFilterForm>;

  errors: FieldErrors<PropertyFilterForm>;

  reset: UseFormReset<PropertyFilterForm>;
};

export default function AllFiltersModal({
  visible,
  onClose,
  formValues,
  setError,
  clearErrors,
  errors,
  reset,
}: AllFiltersModalProps) {
  const [newValues, setNewValues] = useState(formValues);
  const inSet = useSafeAreaInsets();
  useEffect(() => {
    if (visible) {
      setNewValues(formValues);
      clearErrors(["maxPrice", "maxArea"]);
    }
  }, [visible, clearErrors]);

  const handleMaxPriceChange = (value: string) => {
    const min = newValues.minPrice;

    if (!value || !min) {
      clearErrors("maxPrice");

      setNewValues((currentValues) => ({
        ...currentValues,
        maxPrice: value,
      }));

      return;
    }

    const minNumber = Number(min);
    const maxNumber = Number(value);

    if (maxNumber < minNumber) {
      setError("maxPrice", {
        type: "validate",
        message: "أعلى سعر يجب أن يكون أكبر من أو يساوي أقل سعر",
      });
    }

    setNewValues((currentValues) => ({
      ...currentValues,
      maxPrice: value,
    }));
  };

  const handleMaxAreaChange = (value: string) => {
    setNewValues((currentValues) => ({
      ...currentValues,
      maxArea: value,
    }));

    const min = newValues.minArea;

    if (!value || !min) {
      clearErrors("maxArea");
      return;
    }

    const minNumber = Number(min);
    const maxNumber = Number(value);

    if (maxNumber < minNumber) {
      setError("maxArea", {
        type: "validate",
        message: "أقصى مساحة يجب أن تكون أكبر من أو تساوي أقل مساحة",
      });
      return;
    }
  };

  const handleApply = () => {
    const values = newValues;

    const minPrice = Number(values.minPrice);
    const maxPrice = Number(values.maxPrice);

    const minArea = Number(values.minArea);
    const maxArea = Number(values.maxArea);

    let hasError = false;

    if (values.minPrice && values.maxPrice && maxPrice < minPrice) {
      setError("maxPrice", {
        type: "validate",
        message: "أعلى سعر يجب أن يكون أكبر من أو يساوي أقل سعر",
      });

      hasError = true;
    }

    if (values.minArea && values.maxArea && maxArea < minArea) {
      setError("maxArea", {
        type: "validate",
        message: "أقصى مساحة يجب أن تكون أكبر من أو تساوي أقل مساحة",
      });

      hasError = true;
    }

    if (hasError) {
      return;
    }

    reset({ ...newValues });
    onClose();
  };

  const selectListingType = (listingType: "sale" | "rent" | null) => {
    setNewValues((currentValues) => {
      const nextListingType =
        listingType === null || currentValues.listingType === listingType
          ? null
          : listingType;

      return {
        ...currentValues,
        listingType: nextListingType,
        paymentType:
          nextListingType === "rent" ? currentValues.paymentType : null,
        propertyStatus:
          nextListingType === "sale" ? currentValues.propertyStatus : null,
        familyOrSingle:
          nextListingType === "rent" &&
          currentValues.propertyType === "residential"
            ? currentValues.familyOrSingle
            : null,
      };
    });
  };

  const selectResidentialOrCommercial = (
    propertyType: "residential" | "commercial" | null,
  ) => {
    setNewValues((currentValues) => {
      const nextValue =
        propertyType === null || currentValues.propertyType === propertyType
          ? null
          : propertyType;

      return {
        ...currentValues,
        propertyType: nextValue,
        familyOrSingle:
          nextValue === "residential" ? currentValues.familyOrSingle : null,
      };
    });
  };

  const toggleValue = <K extends keyof PropertyFilterForm>(
    field: K,
    value: PropertyFilterForm[K],
  ) => {
    setNewValues((currentValues) => ({
      ...currentValues,
      [field]: currentValues[field] === value ? null : value,
    }));
  };

  const handleReset = () => {
    reset();

    setNewValues(formValues);
    clearErrors();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <View className="flex-1 bg-black/40">
          <View className="flex-1 mt-10 bg-white rounded-t-[30px]">
            <View className="flex-row items-center justify-between px-5 pt-4 pb-4 border-b border-[#E5E7EB]">
              <Pressable
                onPress={onClose}
                className="items-center justify-center w-10 h-10 bg-gray-100 rounded-full"
              >
                <Ionicons name="close" size={22} color={"#0F113C"} />
              </Pressable>

              <Text className="text-xl font-bold text-[#0F113C]">البحث</Text>

              <View className="w-10" />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 150,
              }}
            >
              <FilterSection title="نوع العملية">
                <View className="flex-row gap-3">
                  <OptionButton
                    label="الكل"
                    selected={newValues.listingType === null}
                    onPress={() => selectListingType(null)}
                  />

                  <OptionButton
                    label="للبيع"
                    selected={newValues.listingType === "sale"}
                    onPress={() => selectListingType("sale")}
                  />

                  <OptionButton
                    label="للإيجار"
                    selected={newValues.listingType === "rent"}
                    onPress={() => selectListingType("rent")}
                  />
                </View>
              </FilterSection>

              {newValues.listingType === "sale" ? (
                <FilterSection title="جاهزية العقار">
                  <View className="flex-row flex-wrap gap-3">
                    <OptionButton
                      label="الكل"
                      selected={newValues.propertyStatus === null}
                      onPress={() => toggleValue("propertyStatus", null)}
                    />

                    <OptionButton
                      label="جاهز"
                      selected={newValues.propertyStatus === "ready"}
                      onPress={() => toggleValue("propertyStatus", "ready")}
                    />

                    <OptionButton
                      label="قيد الإنشاء"
                      selected={
                        newValues.propertyStatus === "underConstruction"
                      }
                      onPress={() =>
                        toggleValue("propertyStatus", "underConstruction")
                      }
                    />
                  </View>
                </FilterSection>
              ) : null}

              {newValues.listingType === "rent" ? (
                <FilterSection title="نظام الدفع">
                  <View className="flex-row flex-wrap gap-3">
                    <OptionButton
                      label="الكل"
                      selected={newValues.paymentType === null}
                      onPress={() => toggleValue("paymentType", null)}
                    />

                    <OptionButton
                      label="سنوي"
                      selected={newValues.paymentType === "yearly"}
                      onPress={() => toggleValue("paymentType", "yearly")}
                    />

                    <OptionButton
                      label="شهري"
                      selected={newValues.paymentType === "monthly"}
                      onPress={() => toggleValue("paymentType", "monthly")}
                    />

                    <OptionButton
                      label="يومي"
                      selected={newValues.paymentType === "daily"}
                      onPress={() => toggleValue("paymentType", "daily")}
                    />
                  </View>
                </FilterSection>
              ) : null}

              <FilterSection title="نوع العقار">
                <View className="flex-row gap-3">
                  <OptionButton
                    label="الكل"
                    selected={newValues.propertyType === null}
                    onPress={() => selectResidentialOrCommercial(null)}
                  />

                  <OptionButton
                    label="سكني"
                    selected={newValues.propertyType === "residential"}
                    onPress={() => selectResidentialOrCommercial("residential")}
                  />

                  <OptionButton
                    label="تجاري"
                    selected={newValues.propertyType === "commercial"}
                    onPress={() => selectResidentialOrCommercial("commercial")}
                  />
                </View>
              </FilterSection>

              <FilterSection title="التأثيث">
                <View className="flex-row gap-3">
                  <OptionButton
                    label="الكل"
                    selected={newValues.furnished === null}
                    onPress={() => toggleValue("furnished", null)}
                  />

                  <OptionButton
                    label="مفروش"
                    selected={newValues.furnished === true}
                    onPress={() => toggleValue("furnished", true)}
                  />

                  <OptionButton
                    label="غير مفروش"
                    selected={newValues.furnished === false}
                    onPress={() => toggleValue("furnished", false)}
                  />
                </View>
              </FilterSection>

              <FilterSection title="عدد الغرف">
                <View className="flex-row flex-wrap gap-3">
                  <SmallOptionButton
                    label="الكل"
                    selected={newValues.rooms === null}
                    onPress={() =>
                      setNewValues((currentValues) => ({
                        ...currentValues,
                        rooms: null,
                      }))
                    }
                  />

                  {["1", "2", "3", "4", "5", "6", "7", "+8"].map((room) => {
                    const selected = newValues.rooms === room;

                    return (
                      <SmallOptionButton
                        key={room}
                        label={room === "+8" ? "8+" : room}
                        selected={selected}
                        onPress={() => {
                          setNewValues((currentValues) => ({
                            ...currentValues,
                            rooms: selected ? null : (room as RoomsNumber),
                          }));
                        }}
                      />
                    );
                  })}
                </View>
              </FilterSection>

              <FilterSection title="عدد الحمامات">
                <View className="flex-row flex-wrap gap-3">
                  <SmallOptionButton
                    label="الكل"
                    selected={newValues.bathrooms === null}
                    onPress={() =>
                      setNewValues((currentValues) => ({
                        ...currentValues,
                        bathrooms: null,
                      }))
                    }
                  />

                  {["1", "2", "3", "4", "5", "6", "7", "+8"].map((bath) => {
                    const selected = newValues.bathrooms === bath;

                    return (
                      <SmallOptionButton
                        key={bath}
                        label={bath === "+8" ? "8+" : bath}
                        selected={selected}
                        onPress={() => {
                          setNewValues((currentValues) => ({
                            ...currentValues,
                            bathrooms: selected ? null : (bath as RoomsNumber),
                          }));
                        }}
                      />
                    );
                  })}
                </View>
              </FilterSection>

              <FilterSection title="نطاق السعر">
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <AppNumberInput
                      onChangeText={(val) =>
                        setNewValues((currentValues) => ({
                          ...currentValues,
                          minPrice: val,
                        }))
                      }
                      value={newValues.minPrice}
                      label="من"
                      placeholder="أقل سعر"
                      suffix="ج.م"
                    />
                  </View>

                  <View className="flex-1">
                    <AppNumberInput
                      label="إلى"
                      value={newValues.maxPrice}
                      placeholder="أعلى سعر"
                      suffix="ج.م"
                      error={errors.maxPrice?.message as string}
                      onChangeText={handleMaxPriceChange}
                    />
                  </View>
                </View>
                <View className="flex-row justify-start mt-3">
                  <SmallOptionButton
                    label="الكل"
                    selected={!newValues.minPrice && !newValues.maxPrice}
                    onPress={() => {
                      setNewValues((currentValues) => ({
                        ...currentValues,
                        minPrice: null,
                        maxPrice: null,
                      }));
                      clearErrors("maxPrice");
                    }}
                  />
                </View>
              </FilterSection>

              <FilterSection title="نطاق المساحة">
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <AppNumberInput
                      value={newValues.minArea}
                      label="من"
                      placeholder="أقل مساحة"
                      onChangeText={(val) =>
                        setNewValues((currentValues) => ({
                          ...currentValues,
                          minArea: val,
                        }))
                      }
                      suffix="م²"
                    />
                  </View>

                  <View className="flex-1">
                    <AppNumberInput
                      label="إلى"
                      value={newValues.maxArea}
                      placeholder="أعلى مساحة"
                      suffix="م²"
                      error={errors.maxArea?.message}
                      onChangeText={handleMaxAreaChange}
                    />
                  </View>
                </View>
                <View className="flex-row justify-start mt-3">
                  <SmallOptionButton
                    label="الكل"
                    selected={!newValues.minArea && !newValues.maxArea}
                    onPress={() => {
                      setNewValues((currentValues) => ({
                        ...currentValues,
                        minArea: null,
                        maxArea: null,
                      }));
                      clearErrors("maxArea");
                    }}
                  />
                </View>
              </FilterSection>
            </ScrollView>

            <View
              className="absolute bottom-0 left-0 right-0 px-5 pt-3 bg-white "
              style={{ paddingBottom: inSet.bottom + 16 }}
            >
              <View className="flex-row gap-3">
                <Pressable
                  onPress={handleReset}
                  className="items-center justify-center flex-1 py-4 border rounded-xl border-[#0F113C]"
                >
                  <Text className="text-base font-bold text-[#0F113C]">
                    إعادة تعيين
                  </Text>
                </Pressable>

                <Pressable
                  onPress={handleApply}
                  className="items-center justify-center flex-1 py-4 rounded-xl bg-[#0F113C]"
                >
                  <Text className="text-base font-bold text-white">تطبيق</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
