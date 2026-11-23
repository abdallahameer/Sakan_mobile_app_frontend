import { Pressable, ScrollView, Text, View } from "react-native";

import { StepThreeProps } from "@/types/forms";
import NumberRow from "../uploadpropertyHelperComponents/NumberRow";
import SliderRow from "../uploadpropertyHelperComponents/SliderRow";
import ToggleRow from "../uploadpropertyHelperComponents/ToggleRow";

export default function StepThree({
  formValues,
  setValue,
  onSubmit,
  onNext,
  update = false,
}: StepThreeProps) {
  const selectRent = () => {
    setValue("listingType", "rent", { shouldDirty: true });
    setValue("familyOrSingle", "family", { shouldDirty: true });
    setValue("paymentType", "monthly", { shouldDirty: true });
  };

  const selectSale = () => {
    setValue("listingType", "sale", { shouldDirty: true });
    setValue("familyOrSingle", null, { shouldDirty: true });
    setValue("paymentType", null, { shouldDirty: true });
  };

  const selectPropertyType = (propertyType: "residential" | "commercial") => {
    setValue("propertyType", propertyType, { shouldDirty: true });
    setValue(
      "familyOrSingle",
      propertyType === "residential" && formValues.listingType === "rent"
        ? "family"
        : null,
      { shouldDirty: true },
    );
  };

  const updateNumber = (
    field: "floorNumber" | "propertyAge",
    amount: number,
  ) => {
    const current =
      field === "floorNumber" ? formValues.floorNumber : formValues.propertyAge;

    setValue(field, Math.max(0, current + amount), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <View className="flex-1 ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-6"
      >
        <View className="px-4 pt-3 ">
          <View className="flex-row h-9 overflow-hidden bg-[#F0F0F3] border border-[#0F113C] rounded-lg dark:bg-[#22243A] dark:border-[#36384D]">
            <Pressable
              onPress={selectRent}
              className={`items-center justify-center flex-1 ${
                formValues.listingType === "rent"
                  ? "bg-[#0F113C] dark:bg-[#2D3158]"
                  : "bg-transparent"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  formValues.listingType === "rent"
                    ? "text-white"
                    : "text-[#0F113C] dark:text-[#F3F4F6]"
                }`}
              >
                إيجار
              </Text>
            </Pressable>

            <Pressable
              onPress={selectSale}
              className={`items-center justify-center flex-1 ${
                formValues.listingType === "sale"
                  ? "bg-[#0F113C] dark:bg-[#2D3158]"
                  : "bg-transparent"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  formValues.listingType === "sale"
                    ? "text-white"
                    : "text-[#0F113C] dark:text-[#F3F4F6]"
                }`}
              >
                بيع
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="px-4 pt-3">
          <View className="flex-row-reverse h-9 overflow-hidden bg-[#F0F0F3] border border-[#0F113C] rounded-lg dark:bg-[#22243A] dark:border-[#36384D]">
            {(["residential", "commercial"] as const).map((type) => (
              <Pressable
                key={type}
                onPress={() => selectPropertyType(type)}
                className={`items-center justify-center flex-1 ${
                  formValues.propertyType === type
                    ? "bg-[#0F113C] dark:bg-[#2D3158]"
                    : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    formValues.propertyType === type
                      ? "text-white"
                      : "text-[#0F113C] dark:text-[#F3F4F6]"
                  }`}
                >
                  {type === "residential" ? "سكني" : "تجاري"}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {formValues.listingType === "rent" &&
          formValues.propertyType === "residential" && (
            <View className="px-4 pt-3">
              <View className="flex-row-reverse h-9 overflow-hidden bg-[#F0F0F3] border border-[#0F113C] rounded-lg dark:bg-[#22243A] dark:border-[#36384D]">
                {(["family", "single"] as const).map((type) => (
                  <Pressable
                    key={type}
                    onPress={() =>
                      setValue("familyOrSingle", type, {
                        shouldDirty: true,
                      })
                    }
                    className={`items-center justify-center flex-1 ${
                      formValues.familyOrSingle === type
                        ? "bg-[#0F113C] dark:bg-[#2D3158]"
                        : "bg-transparent"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        formValues.familyOrSingle === type
                          ? "text-white"
                          : "text-[#0F113C] dark:text-[#F3F4F6]"
                      }`}
                    >
                      {type === "family" ? "عوائل" : "عزاب"}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

        {formValues.listingType === "rent" && (
          <View className="px-4 pt-3">
            <View className="flex-row-reverse h-9 overflow-hidden border border-[#0F113C] bg-[#F0F0F3] rounded-lg">
              {(["monthly", "yearly", "daily"] as const).map((type) => (
                <Pressable
                  key={type}
                  onPress={() =>
                    setValue("paymentType", type, { shouldDirty: true })
                  }
                  className={`items-center justify-center flex-1 ${
                    formValues.paymentType === type
                      ? "bg-[#0F113C]"
                      : "bg-transparent"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      formValues.paymentType === type
                        ? "text-white"
                        : "text-[#0F113C] dark:text-[#F3F4F6]"
                    }`}
                  >
                    {type === "monthly"
                      ? "شهري"
                      : type === "yearly"
                        ? "سنوي"
                        : "يومي"}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        <View className="px-4 pt-3">
          <View className="flex-row-reverse h-9 overflow-hidden bg-[#F0F0F3] border border-[#0F113C] rounded-lg">
            {(["ready", "underConstruction"] as const).map((status) => (
              <Pressable
                key={status}
                onPress={() =>
                  setValue("propertyStatus", status, { shouldDirty: true })
                }
                className={`items-center justify-center flex-1 ${
                  formValues.propertyStatus === status
                    ? "bg-[#0F113C]"
                    : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    formValues.propertyStatus === status
                      ? "text-white"
                      : "text-[#0F113C] dark:text-[#F3F4F6]"
                  }`}
                >
                  {status === "ready" ? "جاهز" : "قيد الإنشاء"}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View className="w-full h-0.5 mt-1 bg-[#0F113C]" />

        <View className="mt-2">
          <SliderRow
            label="الغرف"
            value={formValues.rooms}
            min={0}
            max={10}
            onChange={(value) =>
              setValue("rooms", value, {
                shouldDirty: true,
              })
            }
          />

          <SliderRow
            label="دورات المياه"
            value={formValues.bathrooms}
            min={0}
            max={10}
            onChange={(value) =>
              setValue("bathrooms", value, {
                shouldDirty: true,
              })
            }
          />

          <SliderRow
            label="الصالات"
            value={formValues.livingRoom}
            min={0}
            max={10}
            onChange={(value) =>
              setValue("livingRoom", value, {
                shouldDirty: true,
              })
            }
          />
        </View>

        <NumberRow
          label="رقم الدور"
          value={formValues.floorNumber}
          onMinus={() => updateNumber("floorNumber", -1)}
          onPlus={() => updateNumber("floorNumber", 1)}
        />

        <NumberRow
          label="عمر العقار"
          value={formValues.propertyAge}
          onMinus={() => updateNumber("propertyAge", -1)}
          onPlus={() => updateNumber("propertyAge", 1)}
        />
        <ToggleRow
          label="مؤثثة"
          value={formValues.furnished}
          onChange={(value) =>
            setValue("furnished", value, {
              shouldDirty: true,
            })
          }
        />

        <ToggleRow
          label="مطبخ"
          value={formValues.kitchen}
          onChange={(value) =>
            setValue("kitchen", value, {
              shouldDirty: true,
            })
          }
        />

        <ToggleRow
          label="ملحق"
          value={formValues.annex}
          onChange={(value) =>
            setValue("annex", value, {
              shouldDirty: true,
            })
          }
        />

        <ToggleRow
          label="مدخل سيارة"
          value={formValues.carEntrance}
          onChange={(value) =>
            setValue("carEntrance", value, {
              shouldDirty: true,
            })
          }
        />

        <ToggleRow
          label="سطح خاص"
          value={formValues.roof}
          onChange={(value) =>
            setValue("roof", value, {
              shouldDirty: true,
            })
          }
        />
        <ToggleRow
          label="توفر الماء"
          value={formValues.water}
          onChange={(value) =>
            setValue("water", value, {
              shouldDirty: true,
            })
          }
        />
        <ToggleRow
          label="طاقة شمسية"
          value={formValues.solarSystem}
          onChange={(value) =>
            setValue("solarSystem", value, {
              shouldDirty: true,
            })
          }
        />
        <ToggleRow
          label="توفر كهرباء"
          value={formValues.electricity}
          onChange={(value) =>
            setValue("electricity", value, {
              shouldDirty: true,
            })
          }
        />
        <ToggleRow
          label="مصعد"
          value={formValues.elevator}
          onChange={(value) =>
            setValue("elevator", value, {
              shouldDirty: true,
            })
          }
        />

        <ToggleRow
          label="مكيف"
          value={formValues.airConditioners}
          onChange={(value) =>
            setValue("airConditioners", value, {
              shouldDirty: true,
            })
          }
        />

        {update == false ? (
          <View className="flex-row gap-3 px-4 mt-5">
            <Pressable
              onPress={() => (onNext ? onNext() : onSubmit(formValues))}
              className="items-center justify-center flex-1 py-3.5 rounded-xl bg-[#0F113C]"
            >
              <Text className="text-base font-bold text-white">
                {onNext ? "التالي" : "نشر"}
              </Text>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
