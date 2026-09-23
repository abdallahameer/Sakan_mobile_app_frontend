import { UseFormSetValue } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";

import { MyAd } from "@/data/myAds";
import { UploadFormFields } from "@/data/typs";
import NumberRow from "../uploadpropertyHelperComponents/NumberRow";
import SliderRow from "../uploadpropertyHelperComponents/SliderRow";
import ToggleRow from "../uploadpropertyHelperComponents/ToggleRow";
type StepThreeProps = {
  formValues: UploadFormFields | MyAd;
  setValue: UseFormSetValue<UploadFormFields>;
  onSubmit: (formValues: UploadFormFields) => void;
  update?: boolean;
};

export default function StepThree({
  formValues,
  setValue,
  onSubmit,
  update = false,
}: StepThreeProps) {
  const selectRent = () => {
    setValue("forRent", true, { shouldDirty: true });
    setValue("forSell", false, { shouldDirty: true });
    setValue("propertyStatus", null, { shouldDirty: true });
    setValue("propertyType", "resedencial", { shouldDirty: true });
    setValue("familyOrSingle", "family", { shouldDirty: true });
    setValue("paymentType", "شهري", { shouldDirty: true });
  };

  const selectSale = () => {
    setValue("forRent", false, { shouldDirty: true });
    setValue("forSell", true, { shouldDirty: true });
    setValue("propertyStatus", "ready", { shouldDirty: true });
    setValue("propertyType", null, { shouldDirty: true });
    setValue("familyOrSingle", null, { shouldDirty: true });
    setValue("paymentType", null, { shouldDirty: true });
  };

  const selectPropertyType = (propertyType: "resedencial" | "commercial") => {
    setValue("propertyType", propertyType, { shouldDirty: true });
    setValue(
      "familyOrSingle",
      propertyType === "resedencial" ? "family" : null,
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
          <View className="flex-row h-9 overflow-hidden bg-[#F0F0F3] border border-[#0F113C] rounded-lg">
            <Pressable
              onPress={selectRent}
              className={`items-center justify-center flex-1 ${
                formValues.forRent === true ? "bg-[#0F113C]" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  formValues.forRent === true ? "text-white" : "text-[#0F113C]"
                }`}
              >
                إيجار
              </Text>
            </Pressable>

            <Pressable
              onPress={selectSale}
              className={`items-center justify-center flex-1 ${
                formValues.forRent === false ? "bg-[#0F113C]" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  formValues.forRent === false ? "text-white" : "text-[#0F113C]"
                }`}
              >
                بيع
              </Text>
            </Pressable>
          </View>
        </View>

        {formValues.forRent ? (
          <>
            <View className="px-4 pt-3">
              <View className="flex-row-reverse h-9 overflow-hidden bg-[#F0F0F3] border border-[#0F113C] rounded-lg">
                <Pressable
                  onPress={() => selectPropertyType("resedencial")}
                  className={`items-center justify-center flex-1 ${
                    formValues.propertyType === "resedencial"
                      ? "bg-[#0F113C]"
                      : "bg-transparent"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      formValues.propertyType === "resedencial"
                        ? "text-white"
                        : "text-[#0F113C]"
                    }`}
                  >
                    سكني
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => selectPropertyType("commercial")}
                  className={`items-center justify-center flex-1 ${
                    formValues.propertyType === "commercial"
                      ? "bg-[#0F113C]"
                      : "bg-transparent"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      formValues.propertyType === "commercial"
                        ? "text-white"
                        : "text-[#0F113C]"
                    }`}
                  >
                    تجاري
                  </Text>
                </Pressable>
              </View>
            </View>

            {formValues.propertyType === "resedencial" && (
              <View className="px-4 pt-3">
                <View className="flex-row-reverse h-9 overflow-hidden bg-[#F0F0F3] border border-[#0F113C] rounded-lg">
                  <Pressable
                    onPress={() =>
                      setValue("familyOrSingle", "single", {
                        shouldDirty: true,
                      })
                    }
                    className={`items-center justify-center flex-1 ${
                      formValues.familyOrSingle === "single"
                        ? "bg-[#0F113C]"
                        : "bg-transparent"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        formValues.familyOrSingle === "single"
                          ? "text-white"
                          : "text-[#0F113C]"
                      }`}
                    >
                      عزاب
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() =>
                      setValue("familyOrSingle", "family", {
                        shouldDirty: true,
                      })
                    }
                    className={`items-center justify-center flex-1 ${
                      formValues.familyOrSingle === "family"
                        ? "bg-[#0F113C]"
                        : "bg-transparent"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        formValues.familyOrSingle === "family"
                          ? "text-white"
                          : "text-[#0F113C]"
                      }`}
                    >
                      عوائل
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}

            <View className="px-4 pt-3 ">
              <View className="flex-row-reverse h-9 overflow-hidden border border-[#0F113C] bg-[#F0F0F3] rounded-lg">
                {(["سنوي", "شهري", "يومي"] as const).map((type) => (
                  <Pressable
                    key={type}
                    onPress={() =>
                      setValue("paymentType", type, {
                        shouldDirty: true,
                      })
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
                          : "text-[#0F113C]"
                      }`}
                    >
                      {type}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </>
        ) : (
          <View className="px-4 pt-3">
            <View className="flex-row-reverse h-9 overflow-hidden bg-[#F0F0F3] border border-[#0F113C] rounded-lg">
              <Pressable
                onPress={() =>
                  setValue("propertyStatus", "ready", {
                    shouldDirty: true,
                  })
                }
                className={`items-center justify-center flex-1 ${
                  formValues.propertyStatus === "ready"
                    ? "bg-[#0F113C]"
                    : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    formValues.propertyStatus === "ready"
                      ? "text-white"
                      : "text-[#0F113C]"
                  }`}
                >
                  جاهز
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  setValue("propertyStatus", "underConstruction", {
                    shouldDirty: true,
                  })
                }
                className={`items-center justify-center flex-1 ${
                  formValues.propertyStatus === "underConstruction"
                    ? "bg-[#0F113C]"
                    : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    formValues.propertyStatus === "underConstruction"
                      ? "text-white"
                      : "text-[#0F113C]"
                  }`}
                >
                  قيد الإنشاء
                </Text>
              </Pressable>
            </View>
          </View>
        )}
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
              onPress={() => onSubmit(formValues)}
              className="items-center justify-center flex-1 py-3.5 rounded-xl bg-[#0F113C]"
            >
              <Text className="text-base font-bold text-white">نشر</Text>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
