import AppTextInput from "@/components/InputsComponents/Apptextinput";
import PhoneNumberInput from "@/components/InputsComponents/PhoneNumberInput";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type SignUpForm = {
  name: string;
  phone: string;
  password: string;
  countryKey: string;
};

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, watch, setValue } = useForm<SignUpForm>({
    defaultValues: { name: "", phone: "", password: "", countryKey: "+249" },
  });

  const onSubmit = (_values: SignUpForm) => {
    Toast.show({
      type: "success",
      text1: "إنشاء الحساب",
      text2: "تم إنشاء الحساب بنجاح",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA]">
      <View className="flex-row items-center justify-start gap-2 px-4 py-4 border-b border-[#0F113C]">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={22} color="#0F113C" />
        </Pressable>
        <Text className="text-lg font-bold text-[#0F113C]">إنشاء حساب</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 24 }}>
        <View className="gap-1.5">
          <Text className="text-2xl font-bold text-left text-[#0F113C]">
            أنشئ حسابك في سكن
          </Text>
          <Text className="text-sm text-left text-[#9CA3AF]">
            ابدأ رحلتك في البحث عن السكن المناسب
          </Text>
        </View>

        <AppTextInput
          control={control}
          name="name"
          label="الاسم*"
          placeholder="الاسم الكامل"
        />

        {/* <AppNumberInput
          control={control}
          name="phone"
          label="رقم الهاتف*"
          placeholder="9x xxxxxxxx"
          suffix="🇸🇩"
        /> */}

        <PhoneNumberInput
          countryFieldName="countryKey"
          setValue={setValue}
          name="phone"
          control={control}
        />

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
          className="items-center justify-center py-4 mt-2 rounded-xl bg-[#0F113C]"
        >
          <Text className="text-base font-bold text-white">إنشاء حساب</Text>
        </Pressable>

        <View className="flex-row justify-center gap-1 mt-2">
          <Pressable onPress={() => router.push("/login" as any)}>
            <Text className="text-sm font-bold text-[#10B981]">
              تسجيل الدخول
            </Text>
          </Pressable>
          <Text className="text-sm text-[#6B7280]">لديك حساب بالفعل؟</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
