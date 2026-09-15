import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import type { UploadFormFields } from "../../app/add-property";

type StepOneProps = {
  control: Control<UploadFormFields>;
  setValue: UseFormSetValue<UploadFormFields>;
  onNext: () => void;
};

export default function StepOne({ control, setValue, onNext }: StepOneProps) {
  // 👇 useWatch subscribes to these fields
  const images =
    useWatch({
      control,
      name: "images",
    }) ?? [];

  const videos =
    useWatch({
      control,
      name: "videos",
    }) ?? [];

  const canContinue = images.length > 0 || videos.length > 0;

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);

      setValue("images", [...images, ...uris], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);

      setValue("videos", [...videos, ...uris], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);

    setValue("images", updatedImages, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <ScrollView
      className="flex-1 w-full"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >
      <View className="gap-3 p-5">
        {/* Image previews */}
        {images.length > 0 && (
          <View className="mb-2">
            <Text className="mb-3 text-right text-sm font-semibold text-[#0F113C]">
              الصور المرفقة ({images.length})
            </Text>

            <View className="gap-3">
              {images.map((item, index) => (
                <View key={`${item}-${index}`} className="relative">
                  <Image
                    source={{ uri: item }}
                    className="w-full h-40 rounded-xl"
                    resizeMode="cover"
                  />

                  {/* Delete button */}
                  <Pressable
                    onPress={() => removeImage(index)}
                    className="absolute items-center justify-center w-7 h-7 rounded-full bg-white -top-2 -right-2"
                    style={{
                      elevation: 3,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 2,
                    }}
                  >
                    <Ionicons name="close" size={18} color="#EF4444" />
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Attach photo */}
        <Pressable
          onPress={pickImages}
          className="flex-row items-center justify-between px-4 py-3.5 border border-[#0F113C] rounded-xl"
        >
          <View className="items-center justify-center w-8 h-8 rounded-lg bg-[#0F113C]/10">
            <Ionicons name="camera-outline" size={18} color="#0F113C" />
          </View>

          <Text className="text-base font-semibold text-[#0F113C]">
            إرفاق صورة
            {images.length > 0 ? ` (${images.length})` : ""}
          </Text>
        </Pressable>

        {/* Attach video */}
        <Pressable
          onPress={pickVideo}
          className="flex-row items-center justify-between px-4 py-3.5 border border-[#0F113C] rounded-xl"
        >
          <View className="items-center justify-center w-8 h-8 rounded-lg bg-[#0F113C]/10">
            <Ionicons name="videocam-outline" size={18} color="#0F113C" />
          </View>

          <Text className="text-base font-semibold text-[#0F113C]">
            إضافة فيديو
            {videos.length > 0 ? ` (${videos.length})` : ""}
          </Text>
        </Pressable>

        {/* Continue */}
        <Pressable
          onPress={onNext}
          disabled={!canContinue}
          className="items-center justify-center py-3.5 mt-1 border rounded-xl"
          style={{
            borderColor: canContinue ? "#10B981" : "#D1D5DB",
            opacity: canContinue ? 1 : 0.5,
          }}
        >
          <Text
            className="text-base font-bold"
            style={{
              color: canContinue ? "#10B981" : "#9CA3AF",
            }}
          >
            استمرار
          </Text>
        </Pressable>

        {/* Note */}
        <Text className="mt-2 text-sm leading-6 text-right text-[#6B7280]">
          إضافة فيديوهات و صور لإعلانك سيرفع من أولوية ظهور إعلانك في التطبيق
        </Text>
      </View>
    </ScrollView>
  );
}
