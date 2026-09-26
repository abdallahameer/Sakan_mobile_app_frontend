import AppTextInput from "@/components/InputsComponents/Apptextinput";
import PhoneNumberInput from "@/components/InputsComponents/PhoneNumberInput";
import type { LoginForm } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, watch, setValue } = useForm<LoginForm>({
    defaultValues: { phone: "", password: "", countryKey: "+249" },
  });

  const onSubmit = (_values: LoginForm) => {
    Toast.show({
      type: "success",
      text1: "تسجيل الدخول",
      text2: "تم تسجيل الدخول بنجاح",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA]">
      <ScrollView contentContainerStyle={{ padding: 20, gap: 24 }}>
        <View className="flex-row items-center justify-center">
          <Image
            className="w-36 h-32 "
            resizeMode="contain"
            source={require("../../../assets/progectImages/maskanLogo.png")}
          />
        </View>

        {/* <AppNumberInput
          control={control}
          name="phone"
          label="رقم الهاتف*"
          placeholder="9x xxxxxxxx"
          suffix="🇸🇩"
        /> */}

        <PhoneNumberInput
          name="phone"
          control={control}
          setValue={setValue}
          countryFieldName="countryKey"
        />

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
          className="items-center justify-center py-4 mt-2 rounded-xl bg-[#0F113C]"
        >
          <Text className="text-base font-bold text-white">تسجيل الدخول</Text>
        </Pressable>

        <View className="flex-row justify-center gap-1 mt-2">
          <Pressable onPress={() => router.push("/login/signup" as any)}>
            <Text className="text-sm font-bold text-[#10B981]">إنشاء حساب</Text>
          </Pressable>
          <Text className="text-sm text-[#6B7280]">ليس لديك حساب؟</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
