import type { UploadFormFields } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Control, UseFormSetValue } from "react-hook-form";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const MIN_IMAGES = 1;
const MAX_IMAGES = 10;

type StepOneProps = {
  control: Control<UploadFormFields>;
  formValues: UploadFormFields;
  setValue: UseFormSetValue<UploadFormFields>;
  onNext: () => void;
  update?: boolean;
};

export default function StepOne({
  control,
  formValues,
  setValue,
  onNext,
  update = false,
}: StepOneProps) {
  const imageCount = formValues.images?.length ?? 0;
  const isFull = imageCount >= MAX_IMAGES;

  const pickImages = async () => {
    const remaining = MAX_IMAGES - imageCount;

    if (remaining <= 0) {
      Toast.show({
        type: "error",
        text1: "وصلت للحد الأقصى",
        text2: `يمكنك إرفاق ${MAX_IMAGES} صور كحد أقصى`,
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: remaining,
      quality: 0.8,
    });

    if (!result.canceled) {
      const validUris = result.assets
        .filter(
          (asset) =>
            asset.mimeType === undefined || asset.mimeType === "image/jpeg",
        )
        .map((asset) => asset.uri);

      const uris = validUris.slice(0, remaining);

      setValue("images", [...(formValues.images ?? []), ...uris], {
        shouldValidate: true,
        shouldDirty: true,
      });

      if (validUris.length !== result.assets.length) {
        Toast.show({
          type: "error",
          text1: "صيغة صورة غير مدعومة",
          text2: "يرجى اختيار الصور بصيغة JPEG",
        });
      } else if (uris.length < validUris.length) {
        Toast.show({
          type: "error",
          text1: "وصلت للحد الأقصى",
          text2: `تمت إضافة ${uris.length} صور فقط (الحد الأقصى ${MAX_IMAGES})`,
        });
      }
    }
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0]?.uri;

      setValue("videos", uri ? [uri] : [], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = (formValues.images ?? []).filter(
      (_, index) => index !== indexToRemove,
    );

    setValue("images", updatedImages, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const goNext = () => {
    if (imageCount < MIN_IMAGES) {
      Toast.show({
        type: "error",
        text1: "الصورة مطلوبة",
        text2: "أضف صورة واحدة على الأقل للمتابعة",
      });
      return;
    }
    onNext();
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
        {imageCount > 0 && (
          <View className="mb-2">
            <Text className="mb-3 text-right text-sm font-semibold text-[#0F113C]">
              الصور المرفقة ({imageCount}/{MAX_IMAGES})
            </Text>

            <View className="gap-3">
              {(formValues.images ?? []).map((item, index) => (
                <View key={`${item}-${index}`} className="relative">
                  <Image
                    source={{ uri: item }}
                    className="w-full h-40 rounded-xl"
                    resizeMode="cover"
                  />

                  <Pressable
                    onPress={() => removeImage(index)}
                    className="absolute items-center justify-center bg-white rounded-full w-7 h-7 -top-2 -right-2"
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

        <Pressable
          onPress={pickImages}
          className="flex-row items-center justify-between px-4 py-3.5 border bg-white border-[#0F113C] rounded-xl"
          style={{ opacity: isFull ? 0.5 : 1 }}
        >
          <View className="items-center justify-center w-8 h-8 rounded-lg bg-[#0F113C]/10">
            <Ionicons name="camera-outline" size={18} color="#0F113C" />
          </View>

          <Text className="text-base font-semibold text-[#0F113C]">
            إرفاق صورة* ({imageCount}/{MAX_IMAGES})
          </Text>
        </Pressable>

        <Text className="text-sm text-left text-[#6B7280]">
          أضف من {MIN_IMAGES} إلى {MAX_IMAGES} صور
        </Text>

        <Pressable
          onPress={pickVideo}
          className="flex-row items-center justify-between px-4 py-3.5 border bg-white border-[#0F113C] rounded-xl"
        >
          <View className="items-center justify-center w-8 h-8 rounded-lg bg-[#0F113C]/10">
            <Ionicons name="videocam-outline" size={18} color="#0F113C" />
          </View>

          <Text className="text-base font-semibold text-[#0F113C]">
            إضافة فيديو
            {(formValues.videos?.length ?? 0) > 0
              ? ` (${formValues.videos?.length ?? 0})`
              : ""}
          </Text>
        </Pressable>

        {update == false ? (
          <Pressable
            onPress={goNext}
            className="items-center justify-center py-3.5 mt-1 border rounded-xl"
            style={{ borderColor: "#10B981" }}
          >
            <Text className="text-base font-bold text-[#10B981]">استمرار</Text>
          </Pressable>
        ) : null}

        <Text className="mt-2 text-sm leading-6 text-left text-[#6B7280]">
          إضافة فيديوهات و صور لإعلانك سيرفع من أولوية ظهور إعلانك في التطبيق
        </Text>
      </View>
    </ScrollView>
  );
}
