import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";

import { UploadFormFields } from "../../app/add-property";
import NumberRow from "../uploadpropertyHelperComponents/NumberRow";
import SliderRow from "../uploadpropertyHelperComponents/SliderRow";
import ToggleRow from "../uploadpropertyHelperComponents/ToggleRow";
type StepThreeProps = {
  control: Control<UploadFormFields>;
  setValue: UseFormSetValue<UploadFormFields>;
  onNext: () => void;
  onBack: () => void;
};

export default function StepThree({
  control,
  setValue,
  onNext,
  onBack,
}: StepThreeProps) {
  const propertyType = useWatch({
    control,
    name: "propertyType",
  });

  const paymentType = useWatch({
    control,
    name: "paymentType",
  });

  const rooms =
    useWatch({
      control,
      name: "rooms",
    }) ?? 0;

  const bathrooms =
    useWatch({
      control,
      name: "bathrooms",
    }) ?? 0;

  const livingRoom =
    useWatch({
      control,
      name: "livingRoom",
    }) ?? 0;

  const floorNumber =
    useWatch({
      control,
      name: "floorNumber",
    }) ?? 0;

  const propertyAge =
    useWatch({
      control,
      name: "propertyAge",
    }) ?? 0;

  const furnished =
    useWatch({
      control,
      name: "furnished",
    }) ?? false;

  const kitchen =
    useWatch({
      control,
      name: "kitchen",
    }) ?? false;

  const annex =
    useWatch({
      control,
      name: "annex",
    }) ?? false;

  const carEntrance =
    useWatch({
      control,
      name: "carEntrance",
    }) ?? false;

  const elevator =
    useWatch({
      control,
      name: "elevator",
    }) ?? false;

  const airConditioners =
    useWatch({
      control,
      name: "airConditioners",
    }) ?? false;

  const water =
    useWatch({
      control,
      name: "water",
    }) ?? false;

  const roof =
    useWatch({
      control,
      name: "roof",
    }) ?? false;

  const electricity =
    useWatch({
      control,
      name: "electricity",
    }) ?? false;

  const solarSystem =
    useWatch({
      control,
      name: "solarSystem",
    }) ?? false;

  const forRent =
    useWatch({
      control,
      name: "forRent",
    }) ?? false;

  const updateNumber = (
    field: "floorNumber" | "propertyAge",
    amount: number,
  ) => {
    const current = field === "floorNumber" ? floorNumber : propertyAge;

    setValue(field, Math.max(0, (current ?? 0) + amount), {
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
        {/* Rent or Sell */}
        <View className="px-4 pt-3 ">
          <View className="flex-row h-9 overflow-hidden bg-[#F0F0F3] border border-[#0F113C] rounded-lg">
            <Pressable
              onPress={() => {
                setValue("forRent", true, {
                  shouldDirty: true,
                });
                setValue("forSell", false);
              }}
              className={`items-center justify-center flex-1 ${
                forRent === true ? "bg-[#0F113C]" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  forRent === true ? "text-white" : "text-[#0F113C]"
                }`}
              >
                إيجار
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setValue("forRent", false, {
                  shouldDirty: true,
                });
                setValue("forSell", true);
              }}
              className={`items-center justify-center flex-1 ${
                forRent === false ? "bg-[#0F113C]" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  forRent === false ? "text-white" : "text-[#0F113C]"
                }`}
              >
                بيع
              </Text>
            </Pressable>
          </View>
        </View>

        {forRent ? (
          <>
            <View className="px-4 pt-3">
              <View className="flex-row-reverse h-9 overflow-hidden bg-[#F0F0F3] border border-[#0F113C] rounded-lg">
                <Pressable
                  onPress={() =>
                    setValue("propertyType", "عزاب", {
                      shouldDirty: true,
                    })
                  }
                  className={`items-center justify-center flex-1 ${
                    propertyType === "عزاب" ? "bg-[#0F113C]" : "bg-transparent"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      propertyType === "عزاب" ? "text-white" : "text-[#0F113C]"
                    }`}
                  >
                    عزاب
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() =>
                    setValue("propertyType", "عوائل", {
                      shouldDirty: true,
                    })
                  }
                  className={`items-center justify-center flex-1 ${
                    propertyType === "عوائل" ? "bg-[#0F113C]" : "bg-transparent"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      propertyType === "عوائل" ? "text-white" : "text-[#0F113C]"
                    }`}
                  >
                    عوائل
                  </Text>
                </Pressable>
              </View>
            </View>

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
                      paymentType === type ? "bg-[#0F113C]" : "bg-transparent"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        paymentType === type ? "text-white" : "text-[#0F113C]"
                      }`}
                    >
                      {type}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </>
        ) : null}
        <View className="w-full h-0.5 mt-1 bg-[#0F113C]" />

        {/* Sliders */}
        <View className="mt-2">
          <SliderRow
            label="الغرف"
            value={rooms}
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
            value={bathrooms}
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
            value={livingRoom}
            min={0}
            max={10}
            onChange={(value) =>
              setValue("livingRoom", value, {
                shouldDirty: true,
              })
            }
          />
        </View>

        {/* Number fields */}
        <NumberRow
          label="رقم الدور"
          value={floorNumber}
          onMinus={() => updateNumber("floorNumber", -1)}
          onPlus={() => updateNumber("floorNumber", 1)}
        />

        <NumberRow
          label="عمر العقار"
          value={propertyAge}
          onMinus={() => updateNumber("propertyAge", -1)}
          onPlus={() => updateNumber("propertyAge", 1)}
        />
        {/* Boolean options */}
        <ToggleRow
          label="مؤثثة"
          value={furnished}
          onChange={(value) =>
            setValue("furnished", value, {
              shouldDirty: true,
            })
          }
        />

        <ToggleRow
          label="مطبخ"
          value={kitchen}
          onChange={(value) =>
            setValue("kitchen", value, {
              shouldDirty: true,
            })
          }
        />

        <ToggleRow
          label="ملحق"
          value={annex}
          onChange={(value) =>
            setValue("annex", value, {
              shouldDirty: true,
            })
          }
        />

        <ToggleRow
          label="مدخل سيارة"
          value={carEntrance}
          onChange={(value) =>
            setValue("carEntrance", value, {
              shouldDirty: true,
            })
          }
        />

        <ToggleRow
          label="سطح خاص"
          value={roof}
          onChange={(value) =>
            setValue("roof", value, {
              shouldDirty: true,
            })
          }
        />
        <ToggleRow
          label="توفر الماء"
          value={water}
          onChange={(value) =>
            setValue("water", value, {
              shouldDirty: true,
            })
          }
        />
        <ToggleRow
          label="طاقة شمسية"
          value={solarSystem}
          onChange={(value) =>
            setValue("solarSystem", value, {
              shouldDirty: true,
            })
          }
        />
        <ToggleRow
          label="توفر كهرباء"
          value={electricity}
          onChange={(value) =>
            setValue("electricity", value, {
              shouldDirty: true,
            })
          }
        />
        <ToggleRow
          label="مصعد"
          value={elevator}
          onChange={(value) =>
            setValue("elevator", value, {
              shouldDirty: true,
            })
          }
        />

        <ToggleRow
          label="مكيف"
          value={airConditioners}
          onChange={(value) =>
            setValue("airConditioners", value, {
              shouldDirty: true,
            })
          }
        />

        {/* Navigation */}
        <View className="flex-row gap-3 px-4 mt-5">
          <Pressable
            onPress={onNext}
            className="items-center justify-center flex-1 py-3.5 rounded-xl bg-[#0F113C]"
          >
            <Text className="text-base font-bold text-white">نشر</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
