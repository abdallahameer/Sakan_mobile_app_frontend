import StepOne from "@/components/uploadSteps/stepOne";
import StepThree from "@/components/uploadSteps/stepThree";
import StepTwo from "@/components/uploadSteps/stepTwo";
import type { MyAd, UploadFormFields } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const propData: MyAd = {
  id: "101",
  title: "شقة فاخرة في الرياض",
  location: "الرياض، الخرطوم",
  price: "3900000",
  description: "شقة فاخرة بتشطيب مميز ومساحات واسعة.",
  videos: [],
  propertyStatus: "ready",
  termsAccepted: true,
  propertyType: "residential",
  familyOrSingle: "family",
  paymentType: "شهري",
  rooms: 3,
  bathrooms: 2,
  livingRoom: 1,
  area: "125",
  floorNumber: 2,
  propertyAge: 0,
  furnished: false,
  kitchen: true,
  annex: false,
  carEntrance: true,
  elevator: true,
  airConditioners: true,
  water: true,
  roof: false,
  electricity: true,
  solarSystem: false,
  forRent: true,
  forSell: false,
  images: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop",
  ],
  views: 214,
  postedAt: "12-5-2026",
};

export default function EditProperty() {
  const router = useRouter();
  const { editId } = useLocalSearchParams();
  const [activeStep, setActiveStep] = useState(1);
  const { control, watch, setValue } = useForm<UploadFormFields>({
    defaultValues: propData,
  });

  const formValues = watch();

  if (!editId) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-[#F0F1FA]">
        <Text className="text-base font-semibold text-[#6B7280]">
          لم يتم العثور على الإعلان
        </Text>
        <Pressable onPress={() => router.back()} className="mt-4">
          <Text className="font-bold text-[#10B981]">العودة</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA]">
      <View className="flex-row items-center justify-start gap-2 px-4 py-4 border-b border-[#E5E7EB]">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={22} color="#0F113C" />
        </Pressable>
        <Text className="text-lg font-bold text-[#0F113C]">تعديل الإعلان</Text>
      </View>

      <View className="flex-1">
        <View className="flex-row gap-2 px-4 py-3 border-b border-[#E5E7EB]">
          {["الصور", "المعلومات", "التفاصيل"].map((label, index) => {
            const step = index + 1;
            const isActive = activeStep === step;

            return (
              <Pressable
                key={label}
                onPress={() => setActiveStep(step)}
                className={`items-center justify-center flex-1 py-3 rounded-lg border ${
                  isActive
                    ? "bg-[#0F113C] border-[#0F113C]"
                    : "bg-transparent border-[#0F113C]"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    isActive ? "text-white" : "text-[#0F113C]"
                  }`}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View className="flex-1">
          {activeStep === 1 && (
            <StepOne
              setValue={setValue}
              update={true}
              formValues={formValues}
              onNext={() => setActiveStep(2)}
              control={control}
            />
          )}

          {activeStep === 2 && (
            <StepTwo
              onNext={() => setActiveStep(3)}
              setValue={setValue}
              control={control}
              update={true}
              formValues={formValues}
            />
          )}

          {activeStep === 3 && (
            <StepThree
              control={control}
              formValues={formValues}
              setValue={setValue}
              update={true}
              onNext={() => setActiveStep(1)}
              onBack={() => setActiveStep(2)}
            />
          )}
        </View>

        <View className="px-5 mt-6">
          <Pressable
            onPress={() => {}}
            className="items-center justify-center py-4 rounded-xl bg-[#0F113C]"
          >
            <Text className="text-base font-bold text-white">تحديث</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
