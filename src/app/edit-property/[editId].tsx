import StepOne from "@/components/uploadSteps/stepOne";
import StepThree from "@/components/uploadSteps/stepThree";
import StepTwo from "@/components/uploadSteps/stepTwo";
import { api } from "@/lib/api";
import type { UploadFormFields } from "@/types";
import type { Property } from "@/types/property";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function EditProperty() {
  const router = useRouter();
  const params = useLocalSearchParams<{ editId: string | string[] }>();
  const editId = Array.isArray(params.editId)
    ? params.editId[0]
    : params.editId;
  const [activeStep, setActiveStep] = useState(1);
  const queryClient = useQueryClient();
  const { data: property } = useQuery({
    queryKey: ["property", editId],
    queryFn: async () => {
      const response = await api.get<Property | { property: Property }>(
        `/properties/${encodeURIComponent(editId!)}`,
      );

      return "property" in response.data
        ? response.data.property
        : response.data;
    },
    enabled: !!editId,
  });

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

  useEffect(() => {
    if (!property) return;

    reset({
      images: property.images ?? [],
      videos: property.videos ?? [],
      title: property.title ?? "",
      price: String(property.price ?? ""),
      area: String(property.area ?? ""),
      city: property.location?.city ?? "",
      neighborhood: property.location?.neighborhood ?? "",
      description: property.description ?? "",
      phone: property.phone ?? "",
      whatsapp: property.whatsapp ?? "",
      propertyType: property.propertyType,
      listingType: property.listingType,
      familyOrSingle: property.familyOrSingle,
      propertyStatus: property.propertyStatus,
      paymentType: property.paymentType,
      phoneKey: property.phoneKey ?? "+249",
      whatsAppKey: property.whatsAppKey ?? "+249",
      termsAccepted: true,
      rooms: property.rooms ?? 0,
      bathrooms: property.bathrooms ?? 0,
      livingRoom: property.livingRoom ?? 0,
      floorNumber: property.floorNumber ?? 0,
      propertyAge: property.propertyAge ?? 0,
      furnished: property.furnished ?? false,
      kitchen: property.kitchen ?? false,
      annex: property.annex ?? false,
      carEntrance: property.carEntrance ?? false,
      elevator: property.elevator ?? false,
      airConditioners: property.airConditioners ?? false,
      water: property.water ?? false,
      roof: property.roof ?? false,
      electricity: property.electricity ?? false,
      solarSystem: property.solarSystem ?? false,
      latitude: property.location?.latitude ?? null,
      longitude: property.location?.longitude ?? null,
    });
  }, [property, reset]);

  const formValues = watch();

  const updateProperty = async () => {
    const v = formValues;

    // the same field names and types the upload sends
    const payload = {
      title: v.title,
      description: v.description,
      price: Number(String(v.price).replace(/,/g, "")),
      areaSize: Number(String(v.area).replace(/,/g, "")),
      listingType: v.listingType,
      propertyType: v.propertyType,
      propertyStatus: v.propertyStatus,
      familyOrSingle: v.familyOrSingle,
      paymentType: v.paymentType,
      rooms: v.rooms,
      bathrooms: v.bathrooms,
      livingRoom: v.livingRoom,
      floorNumber: v.floorNumber,
      propertyAge: v.propertyAge,
      furnished: v.furnished,
      kitchen: v.kitchen,
      annex: v.annex,
      carEntrance: v.carEntrance,
      elevator: v.elevator,
      airConditioners: v.airConditioners,
      water: v.water,
      roof: v.roof,
      electricity: v.electricity,
      solarSystem: v.solarSystem,
      city: v.city,
      neighborhood: v.neighborhood,
      latitude: v.latitude,
      longitude: v.longitude,
      phone: v.phone,
      phoneKey: v.phoneKey,
      whatsapp: v.whatsapp,
      whatsAppKey: v.whatsAppKey,
    };

    try {
      await api.put(`/properties/${editId}`, payload);
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      queryClient.invalidateQueries({ queryKey: ["property", editId] });
      Toast.show({
        text1: "تم التحديث",
        text2: "تم تحديث الأعلان بنجاح",
        type: "success",
      });
      router.replace("/profile");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "فشل التحديث",
        text2: error?.response?.data?.error ?? "حاول مرة أخرى",
      });
    }
  };

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
            onPress={updateProperty}
            className="items-center justify-center py-4 rounded-xl bg-[#0F113C]"
          >
            <Text className="text-base font-bold text-white">تحديث</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
