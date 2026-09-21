import { PropertyFilterForm, RoomsNumber } from "@/data/typs";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormReset,
  UseFormSetError,
} from "react-hook-form";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

import AppNumberInput from "../InputsComponents/Appnumberinput";
import SmallOptionButton from "../buttons/SmallOptionButton";
import OptionButton from "../buttons/optionButton";

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
  useEffect(() => {
    if (visible) {
      setNewValues(formValues);
      clearErrors(["maxPrice", "maxSpace"]);
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

      return;
    }

    clearErrors("maxPrice");

    setNewValues((currentValues) => ({
      ...currentValues,
      maxPrice: value,
    }));
  };

  const handleMaxSpaceChange = (value: string) => {
    setNewValues((currentValues) => ({
      ...currentValues,
      maxSpace: value,
    }));

    const min = newValues.minSpace;

    if (!value || !min) {
      clearErrors("maxSpace");
      return;
    }

    const minNumber = Number(min);
    const maxNumber = Number(value);

    if (maxNumber < minNumber) {
      setError("maxSpace", {
        type: "validate",
        message: "أقصى مساحة يجب أن تكون أكبر من أو تساوي أقل مساحة",
      });
      return;
    }

    clearErrors("maxSpace");
  };

  const handleApply = () => {
    const values = newValues;

    const minPrice = Number(values.minPrice);
    const maxPrice = Number(values.maxPrice);

    const minSpace = Number(values.minSpace);
    const maxSpace = Number(values.maxSpace);

    let hasError = false;

    if (values.minPrice && values.maxPrice && maxPrice < minPrice) {
      setError("maxPrice", {
        type: "validate",
        message: "أعلى سعر يجب أن يكون أكبر من أو يساوي أقل سعر",
      });

      hasError = true;
    }

    if (values.minSpace && values.maxSpace && maxSpace < minSpace) {
      setError("maxSpace", {
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

  const selectPropertyType = (propertyType: "sale" | "rent") => {
    setNewValues((currentValues) => {
      const nextPropertyType =
        currentValues.propertyType === propertyType ? null : propertyType;

      return {
        ...currentValues,
        propertyType: nextPropertyType,
        paymentType:
          nextPropertyType === "rent" ? currentValues.paymentType : null,
        status: nextPropertyType === "sale" ? currentValues.status : null,
        familyOrSingle:
          nextPropertyType === "rent" &&
          currentValues.residentialOrCommercial === "residential"
            ? currentValues.familyOrSingle
            : null,
      };
    });
  };

  const selectResidentialOrCommercial = (
    residentialOrCommercial: "residential" | "commercial",
  ) => {
    setNewValues((currentValues) => {
      const nextValue =
        currentValues.residentialOrCommercial === residentialOrCommercial
          ? null
          : residentialOrCommercial;

      return {
        ...currentValues,
        residentialOrCommercial: nextValue,
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
    const defaultValues: PropertyFilterForm = {
      propertyType: "rent",
      familyOrSingle: "family",
      paymentType: "monthly",
      status: "all",
      residentialOrCommercial: "residential",
      furnished: "furnished",
      rooms: null,
      bathRooms: null,
      minPrice: "",
      maxPrice: "",
      minSpace: "",
      maxSpace: "",
    };
    reset(defaultValues);

    setNewValues(defaultValues);
    clearErrors();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
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
                  label="للبيع"
                  selected={newValues.propertyType === "sale"}
                  onPress={() => selectPropertyType("sale")}
                />

                <OptionButton
                  label="للإيجار"
                  selected={newValues.propertyType === "rent"}
                  onPress={() => selectPropertyType("rent")}
                />
              </View>
            </FilterSection>

            {newValues.propertyType == "sale" ? (
              <FilterSection title="جاهزية العقار">
                <View className="flex-row flex-wrap gap-3">
                  <OptionButton
                    label="الكل"
                    selected={newValues.status === "all"}
                    onPress={() => toggleValue("status", "all")}
                  />

                  <OptionButton
                    label="جاهز"
                    selected={newValues.status === "ready"}
                    onPress={() => toggleValue("status", "ready")}
                  />

                  <OptionButton
                    label="قيد الإنشاء"
                    selected={newValues.status === "underConstruction"}
                    onPress={() => toggleValue("status", "underConstruction")}
                  />
                </View>
              </FilterSection>
            ) : null}

            {newValues.propertyType == "rent" ? (
              <FilterSection title="نظام الدفع">
                <View className="flex-row flex-wrap gap-3">
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
                  label="سكني"
                  selected={newValues.residentialOrCommercial === "residential"}
                  onPress={() => selectResidentialOrCommercial("residential")}
                />

                <OptionButton
                  label="تجاري"
                  selected={newValues.residentialOrCommercial === "commercial"}
                  onPress={() => selectResidentialOrCommercial("commercial")}
                />
              </View>
            </FilterSection>

            <FilterSection title="التأثيث">
              <View className="flex-row gap-3">
                <OptionButton
                  label="مفروش"
                  selected={newValues.furnished === "furnished"}
                  onPress={() => toggleValue("furnished", "furnished")}
                />

                <OptionButton
                  label="غير مفروش"
                  selected={newValues.furnished === "unfurnished"}
                  onPress={() => toggleValue("furnished", "unfurnished")}
                />
              </View>
            </FilterSection>

            <FilterSection title="عدد الغرف">
              <View className="flex-row flex-wrap gap-3">
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
                {["1", "2", "3", "4", "5", "6", "7", "+8"].map((bath) => {
                  const selected = newValues.bathRooms === bath;

                  return (
                    <SmallOptionButton
                      key={bath}
                      label={bath === "+8" ? "8+" : bath}
                      selected={selected}
                      onPress={() => {
                        setNewValues((currentValues) => ({
                          ...currentValues,
                          bathRooms: selected ? null : (bath as RoomsNumber),
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
            </FilterSection>

            <FilterSection title="نطاق المساحة">
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <AppNumberInput
                    value={newValues.minSpace}
                    label="من"
                    placeholder="أقل مساحة"
                    onChangeText={(val) =>
                      setNewValues((currentValues) => ({
                        ...currentValues,
                        minSpace: val,
                      }))
                    }
                    suffix="م²"
                  />
                </View>

                <View className="flex-1">
                  <AppNumberInput
                    label="إلى"
                    value={newValues.maxSpace}
                    placeholder="أعلى مساحة"
                    suffix="م²"
                    error={errors.maxSpace?.message as string}
                    onChangeText={handleMaxSpaceChange}
                  />
                </View>
              </View>
            </FilterSection>
          </ScrollView>

          <View className="absolute bottom-0 left-0 right-0 px-5 pt-3 pb-6 bg-white border-t border-[#E5E7EB]">
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
    </Modal>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="pb-6 mb-6 border-b border-[#E5E7EB]">
      <Text className="mb-4 text-lg font-bold text-[#0F113C] text-right">
        {title}
      </Text>

      {children}
    </View>
  );
}
