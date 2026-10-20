import StepFour from "@/components/uploadSteps/stepFour";
import StepOne from "@/components/uploadSteps/stepOne";
import StepThree from "@/components/uploadSteps/stepThree";
import StepTwo from "@/components/uploadSteps/stepTwo";
import { isUploadBusy, startUpload } from "@/lib/uploadStore";
import type { UploadFormFields } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
export default function UploadProperty() {
  const router = useRouter();
  const [steps, setSteps] = useState(1);
  const queryClient = useQueryClient();
  const { control, watch, setValue, reset } = useForm<UploadFormFields>({
    defaultValues: {
      images: [],
      videos: [],
      title: "",
      price: "",
      area: "",
      city: "",
      neighborhood: "",
      description: "",
      phone: "",
      whatsapp: "",
      propertyType: "residential",
      listingType: "rent",
      familyOrSingle: "family",
      propertyStatus: "ready",
      paymentType: "monthly",
      phoneKey: "+249",
      whatsAppKey: "+249",
      termsAccepted: false,
      rooms: 0,
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
      latitude: null,
      longitude: null,
    },
  });
  const formValues = watch();

  const onSubmit = async (values: UploadFormFields) => {
    const price = Number(values.price);
    const areaSize = Number(values.area);

    const missing: string[] = [];
    if (!values.title.trim()) missing.push("العنوان");
    if (!Number.isFinite(price) || price <= 0) missing.push("السعر");
    if (!Number.isFinite(areaSize) || areaSize <= 0) missing.push("المساحة");
    if (!values.city) missing.push("المدينة");
    if (!values.neighborhood) missing.push("المنطقة");
    if (!values.description.trim()) missing.push("الوصف");
    if (!values.phone?.trim()) missing.push("رقم الهاتف");
    if (!values.phoneKey) missing.push("مفتاح الهاتف");
    if (!values.whatsapp?.trim()) missing.push("رقم الواتساب");
    if (!values.whatsAppKey) missing.push("مفتاح الواتساب");

    if (missing.length > 0) {
      Toast.show({
        type: "error",
        text1: "بيانات غير مكتملة",
        text2: missing.join("، "),
      });
      return;
    }

    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
      price,
      areaSize,
      city: values.city,
      neighborhood: values.neighborhood,
      phone: values.phone!.trim(),
      phoneKey: values.phoneKey,
      whatsapp: values.whatsapp!.trim(),
      whatsAppKey: values.whatsAppKey,
      listingType: values.listingType,
      propertyType: values.propertyType,
      propertyStatus: values.propertyStatus,
      ...(values.familyOrSingle && {
        familyOrSingle: values.familyOrSingle,
      }),
      ...(values.paymentType && { paymentType: values.paymentType }),
      rooms: values.rooms,
      bathrooms: values.bathrooms,
      livingRoom: values.livingRoom,
      floorNumber: values.floorNumber,
      propertyAge: values.propertyAge,
      furnished: values.furnished,
      kitchen: values.kitchen,
      annex: values.annex,
      carEntrance: values.carEntrance,
      elevator: values.elevator,
      airConditioners: values.airConditioners,
      water: values.water,
      roof: values.roof,
      electricity: values.electricity,
      solarSystem: values.solarSystem,
      ...(values.latitude !== null && { latitude: values.latitude }),
      ...(values.longitude !== null && { longitude: values.longitude }),
    };

    if (isUploadBusy()) {
      Toast.show({
        type: "info",
        text1: "يوجد إعلان قيد النشر",
        text2: "انتظر حتى ينتهي ثم أضف إعلاناً جديداً",
      });
      return;
    }

    startUpload(
      { payload, images: values.images, video: values.videos[0] },
      () => queryClient.invalidateQueries({ queryKey: ["properties"] }),
    );
    router.replace("/(tabs)");
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSteps(1);
        reset();
      };
    }, []),
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA]">
      <View className="flex-row items-center justify-between px-4 py-4 w-full border-b border-[#E5E7EB]">
        <Pressable
          onPress={() => {
            if (steps === 1) {
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
            {steps === 1
              ? "إرفاق صورة"
              : steps === 2
                ? "السعر و الوصف"
                : steps === 3
                  ? "تفاصيل العقار"
                  : steps === 4
                    ? "موقع العقار"
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
          onNext={() => setSteps(4)}
          onSubmit={onSubmit}
        />
      )}

      {steps === 4 && (
        <StepFour
          formValues={formValues}
          setValue={setValue}
          onSubmit={onSubmit}
        />
      )}
    </SafeAreaView>
  );
}
