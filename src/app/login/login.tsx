import AppTextInput from "@/components/InputsComponents/Apptextinput";
import EmailInput from "@/components/InputsComponents/EmailInput";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { api, setAuthToken } from "@/lib/api";
import type { LoginForm } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (_values: LoginForm) => {
    // will be updated soon.
    Toast.show({
      type: "success",
      text1: "تسجيل الدخول",
      text2: "تم تسجيل الدخول بنجاح",
    });
  };

  const { signIn } = useGoogleAuth(async (idToken) => {
    try {
      const { data } = await api.post("/auth/google", { idToken });
      await setAuthToken(data.token);
      router.replace("/(tabs)");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "فشل تسجيل الدخول",
        text2: err?.response?.data?.error ?? "حاول مرة أخرى",
      });
    }
  });

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA] dark:bg-[#0B0D1D]">
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <ScrollView contentContainerStyle={{ padding: 20, gap: 24 }}>
          <View className="flex-row items-center justify-center">
            <Image
              className="h-32 w-36 "
              resizeMode="contain"
              source={require("../../../assets/progectImages/maskanLogo.png")}
            />
          </View>

          <EmailInput control={control} name="email" />

          <AppTextInput
            control={control}
            name="password"
            label="كلمة المرور*"
            placeholder="********"
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
            onPress={() => router.push("/login/forgotPassword" as any)}
            className="self-start"
          >
            <Text className="text-sm font-semibold text-[#10B981]">
              نسيت كلمة المرور؟
            </Text>
          </Pressable>

          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="items-center justify-center py-4 mt-2 rounded-xl bg-[#0F113C] dark:bg-[#2D3158]"
          >
            <Text className="text-base font-bold text-white">تسجيل الدخول</Text>
          </Pressable>

          <View className="flex-row justify-center gap-1 mt-2">
            <Pressable onPress={() => router.push("/login/signup" as any)}>
              <Text className="text-sm font-bold text-[#10B981]">
                إنشاء حساب
              </Text>
            </Pressable>
            <Text className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">ليس لديك حساب؟</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Pressable
        onPress={() => signIn()}
        className="items-center justify-center py-4 mt-2 rounded-xl bg-white border border-[#E5E7EB] dark:bg-[#17192D] dark:border-[#36384D]"
      >
        <Text className="text-base font-bold text-[#0F113C] dark:text-[#F3F4F6]">
          تسجيل الدخول عبر Google
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
