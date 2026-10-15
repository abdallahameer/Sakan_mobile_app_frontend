import type { UploadFormFields } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Control, UseFormSetValue } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Video } from "react-native-compressor";
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
  const [compressing, setCompressing] = useState<number | null>(null);
  const isCompressing = compressing !== null;

  const imageCount = formValues.images?.length ?? 0;
  const isFull = imageCount >= MAX_IMAGES;
  const hasVideo = (formValues.videos?.length ?? 0) > 0;

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
      mediaTypes: ["images"],
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
    if (isCompressing) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    if (!asset?.uri) return;

    const MAX_SIZE = 40 * 1024 * 1024;
    const size = asset.fileSize;

    if (size != null && size <= MAX_SIZE) {
      setValue("videos", [asset.uri], {
        shouldValidate: true,
        shouldDirty: true,
      });
      return;
    }

    setCompressing(0);

    try {
      const compressedUri = await Video.compress(
        asset.uri,
        { compressionMethod: "auto" },
        (progress) => setCompressing(Math.round(progress * 100)),
      );

      const info = await FileSystem.getInfoAsync(compressedUri);

      if (!info.exists || info.size == null || info.size > MAX_SIZE) {
        Toast.show({
          type: "error",
          text1: "حجم الفيديو كبير جدًا",
          text2: "تعذر تقليل حجم الفيديو إلى 40 ميغابايت أو أقل",
        });
        return;
      }

      setValue("videos", [compressedUri], {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "تعذر ضغط الفيديو",
        text2: "حاول اختيار فيديو آخر",
      });
    } finally {
      setCompressing(null);
    }
  };

  const removeVideo = () => {
    setValue("videos", [], {
      shouldValidate: true,
      shouldDirty: true,
    });
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
    if (isCompressing) return;
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
          disabled={isCompressing}
          className="flex-row items-center justify-between px-4 py-3.5 border bg-white border-[#0F113C] rounded-xl"
          style={{ opacity: isCompressing ? 0.5 : 1 }}
        >
          <View className="items-center justify-center w-8 h-8 rounded-lg bg-[#0F113C]/10">
            <Ionicons name="videocam-outline" size={18} color="#0F113C" />
          </View>

          <Text className="text-base font-semibold text-[#0F113C]">
            {hasVideo ? "تغيير الفيديو" : "إضافة فيديو (اختياري)"}
          </Text>
        </Pressable>

        {isCompressing ? (
          <View className="flex-row items-center justify-between px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl">
            <ActivityIndicator color="#0F113C" />
            <Text className="text-sm font-semibold text-[#0F113C]">
              جاري تحميل الفيديو... {compressing}%
            </Text>
          </View>
        ) : hasVideo ? (
          <View className="flex-row items-center justify-between px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl">
            <Pressable onPress={removeVideo} hitSlop={10}>
              <Ionicons name="close-circle" size={22} color="#EF4444" />
            </Pressable>
            <Text className="text-sm font-semibold text-[#0F113C]">
              تم إرفاق فيديو
            </Text>
          </View>
        ) : (
          <Text className="text-sm text-left text-[#6B7280]">
            فيديو واحد فقط، بحد أقصى دقيقة واحدة
          </Text>
        )}

        {update == false ? (
          <Pressable
            onPress={goNext}
            disabled={isCompressing}
            className="items-center justify-center py-3.5 mt-1 border rounded-xl"
            style={{
              borderColor: "#10B981",
              opacity: isCompressing ? 0.5 : 1,
            }}
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
