import StepThree from "@/components/uploadSteps/stepThree";
import StepTwo from "@/components/uploadSteps/stepTwo";
import type { UploadFormFields } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import StepOne from "../components/uploadSteps/stepOne";

export default function UploadProperty() {
  const router = useRouter();
  const [steps, setSteps] = useState(1);

  const { control, watch, setValue, getValues } = useForm<UploadFormFields>({
    defaultValues: {
      images: [],
      videos: [],
      title: "",
      price: "",
      area: "",
      description: "",
      propertyType: "residential",
      familyOrSingle: "family",
      propertyStatus: null,
      paymentType: "شهري",

      rooms: 1,
      bathrooms: 0,
      livingRoom: 0,

      floorNumber: 0,
      propertyAge: 0,

      furnished: false,
      kitchen: false,
      annex: false,
      carEntrance: false,
      elevator: false,
      airConditioners: false,
      water: false,
      roof: false,
      electricity: false,
      solarSystem: false,
      forRent: true,
      forSell: false,
    },
  });
  const formValues = watch();

  const onSumbit = (formValues: UploadFormFields) => {
    Toast.show({
      type: "success",
      text1: "تم النشر",
      text2: "تم نشر اعلانك بنجاح 🎊",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA]">
      <View className="flex-row items-center justify-between px-4 py-4 w-full border-b border-[#E5E7EB]">
        <Pressable
          onPress={() => {
            if (steps == 1) {
              router.replace("/(tabs)");
            } else {
              setSteps(steps - 1);
            }
          }}
        >
          <Ionicons name="arrow-forward" size={22} color="#0F113C" />
        </Pressable>

        <View className="flex-row items-center justify-start w-[60%]">
          <Text className="text-lg font-bold text-[#0F113C]">
            {steps == 1
              ? "إرفاق صورة"
              : steps == 2
                ? "السعر و الوصف"
                : steps == 3
                  ? "تفاصيل العقار"
                  : ""}
          </Text>
        </View>
      </View>

      {steps === 1 && (
        <StepOne
          control={control}
          formValues={formValues}
          setValue={setValue}
          onNext={() => setSteps(2)}
        />
      )}

      {steps === 2 && (
        <StepTwo
          control={control}
          formValues={formValues}
          setValue={setValue}
          onNext={() => setSteps(3)}
        />
      )}

      {steps === 3 && (
        <StepThree
          formValues={formValues}
          setValue={setValue}
          onSubmit={onSumbit}
        />
      )}
    </SafeAreaView>
  );
}
