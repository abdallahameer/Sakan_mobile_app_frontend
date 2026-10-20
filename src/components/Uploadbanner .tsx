// Put this file at: components/UploadBanner.tsx
import { dismissUpload, retryUpload, useUploadState } from "@/lib/uploadStore";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Floats at the top of the screen, on every screen. Shows the progress of the
// ad that is being uploaded, then "published" or "failed" (with a retry button).
export default function UploadBanner() {
  const state = useUploadState();
  const insets = useSafeAreaInsets();

  // the success message goes away by itself
  useEffect(() => {
    if (state.status !== "success") return;
    const timer = setTimeout(dismissUpload, 4000);
    return () => clearTimeout(timer);
  }, [state.status]);

  if (state.status === "idle") return null;

  const isError = state.status === "error";
  const isSuccess = state.status === "success";

  const title = isError
    ? "فشل نشر الإعلان"
    : isSuccess
      ? "تم نشر إعلانك بنجاح 🎊"
      : state.status === "saving"
        ? "جاري الحفظ..."
        : `جاري نشر إعلانك... ${state.progress}%`;

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        top: insets.top + 8,
        left: 12,
        right: 12,
        zIndex: 1000,
        elevation: 10,
      }}
    >
      <View
        className="px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          gap: 8,
        }}
      >
        <Text
          className="text-sm font-bold"
          style={{
            color: isError ? "#EF4444" : isSuccess ? "#10B981" : "#0F113C",
          }}
        >
          {title}
        </Text>

        {!isError && !isSuccess && (
          <>
            <View className="h-2 overflow-hidden rounded-full bg-[#E5E7EB]">
              <View
                className="h-2 rounded-full bg-[#0F113C]"
                style={{ width: `${state.progress}%` }}
              />
            </View>
            <Text className="text-xs text-[#6B7280]">
              لا تغلق التطبيق حتى يكتمل النشر
            </Text>
          </>
        )}

        {isError && (
          <>
            {state.error ? (
              <Text className="text-xs text-[#6B7280]">{state.error}</Text>
            ) : null}
            <View className="flex-row" style={{ gap: 16 }}>
              <Pressable onPress={retryUpload}>
                <Text className="text-sm font-bold text-[#10B981]">
                  إعادة المحاولة
                </Text>
              </Pressable>
              <Pressable onPress={dismissUpload}>
                <Text className="text-sm font-bold text-[#6B7280]">إغلاق</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
