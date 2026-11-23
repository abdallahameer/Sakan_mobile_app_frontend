import AppTextInput from "@/components/InputsComponents/Apptextinput";
import EmailInput from "@/components/InputsComponents/EmailInput";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useTheme } from "@/theme/ThemeProvider";

type SignUpForm = {
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm<SignUpForm>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = (_values: SignUpForm) => {
    Toast.show({
      type: "success",
      text1: "إنشاء الحساب",
      text2: "تم إنشاء الحساب بنجاح",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA] dark:bg-[#0B0D1D]">
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <View className="flex-row items-center justify-start gap-2 px-4 py-4 border-b border-[#0F113C] dark:border-[#36384D]">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-forward" size={22} color={colors.text} />
          </Pressable>
          <Text className="text-lg font-bold text-[#0F113C] dark:text-[#F3F4F6]">إنشاء حساب</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20, gap: 24 }}>
          <View className="gap-1.5">
            <Text className="text-2xl font-bold text-left text-[#0F113C] dark:text-[#F3F4F6]">
              أنشئ حسابك في سكن
            </Text>
            <Text className="text-sm text-left text-[#9CA3AF] dark:text-[#A1A1AA]">
              ابدأ رحلتك في البحث عن السكن المناسب
            </Text>
          </View>

          <AppTextInput
            control={control}
            name="name"
            label="الاسم*"
            placeholder="الاسم الكامل"
          />

          <EmailInput control={control} name="email" />

          <AppTextInput
            control={control}
            name="password"
            label="كلمة المرور*"
            placeholder="أدخل 8 احرف على الأقل"
            secureTextEntry={!showPassword}
            rightElement={
              <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#9CA3AF"
                />
              </Pressable>
            }
          />

          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="items-center justify-center py-4 mt-2 rounded-xl bg-[#0F113C] dark:bg-[#2D3158]"
          >
            <Text className="text-base font-bold text-white">إنشاء حساب</Text>
          </Pressable>

          <View className="flex-row justify-center gap-1 mt-2">
            <Pressable onPress={() => router.push("/login/login")}>
              <Text className="text-sm font-bold text-[#10B981]">
                تسجيل الدخول
              </Text>
            </Pressable>
            <Text className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">لديك حساب بالفعل؟</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
