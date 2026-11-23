import EmailInput from "@/components/InputsComponents/EmailInput";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useTheme } from "@/theme/ThemeProvider";

type ForgotPasswordForm = {
  email: string;
};

export default function ForgotPassword() {
  const router = useRouter();
  const { colors } = useTheme();
  const { control, handleSubmit } = useForm<ForgotPasswordForm>({
    defaultValues: { email: "" },
  });

  const onSubmit = (_values: ForgotPasswordForm) => {
    Toast.show({
      type: "success",
      text1: "إرسال الرمز",
      text2: "تم إرسال رمز التحقق بنجاح",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA] dark:bg-[#0B0D1D]">
      <View className="flex-row items-center justify-start gap-2 px-4 py-4 border-b border-[#0F113C] dark:border-[#36384D]">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={22} color={colors.text} />
        </Pressable>
        <Text className="text-lg font-bold text-[#0F113C] dark:text-[#F3F4F6]">
          نسيت كلمة المرور
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 24 }}>
        <View className="gap-1.5">
          <Text className="text-2xl font-bold text-left text-[#0F113C] dark:text-[#F3F4F6]">
            استعادة كلمة المرور
          </Text>
          <Text className="text-sm leading-6 text-left text-[#9CA3AF] dark:text-[#A1A1AA]">
            أدخل بريدك الإلكتروني المسجل في سكن، وسنرسل لك رمز تحقق لإعادة تعيين كلمة
            المرور.
          </Text>
        </View>

        <EmailInput control={control} name="email" />

        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="items-center justify-center py-4 mt-2 rounded-xl bg-[#0F113C] dark:bg-[#2D3158]"
        >
          <Text className="text-base font-bold text-white">
            إرسال رمز التحقق
          </Text>
        </Pressable>

        <View className="flex-row justify-center gap-1 mt-2">
          <Pressable onPress={() => router.push("/login" as any)}>
            <Text className="text-sm font-bold text-[#10B981]">
              تسجيل الدخول
            </Text>
          </Pressable>
          <Text className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">تذكرت كلمة المرور؟</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
