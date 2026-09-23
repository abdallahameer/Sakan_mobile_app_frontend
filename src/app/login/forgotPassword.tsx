import PhoneNumberInput from "@/components/InputsComponents/PhoneNumberInput";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type ForgotPasswordForm = {
  phone: string;
  countryKey: string;
};

export default function ForgotPassword() {
  const router = useRouter();
  const { control, handleSubmit, setValue, watch } =
    useForm<ForgotPasswordForm>({
      defaultValues: { phone: "", countryKey: "+249" },
    });

  const onSubmit = (_values: ForgotPasswordForm) => {
    Toast.show({
      type: "success",
      text1: "إرسال الرمز",
      text2: "تم إرسال رمز التحقق بنجاح",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA]">
      <View className="flex-row items-center justify-start gap-2 px-4 py-4 border-b border-[#0F113C]">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={22} color="#0F113C" />
        </Pressable>
        <Text className="text-lg font-bold text-[#0F113C]">
          نسيت كلمة المرور
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 24 }}>
        <View className="gap-1.5">
          <Text className="text-2xl font-bold text-left text-[#0F113C]">
            استعادة كلمة المرور
          </Text>
          <Text className="text-sm leading-6 text-left text-[#9CA3AF]">
            أدخل رقم هاتفك المسجل في سكن، وسنرسل لك رمز تحقق لإعادة تعيين كلمة
            المرور.
          </Text>
        </View>

        {/* <AppNumberInput
          control={control}
          name="phone"
          label="رقم الهاتف*"
          placeholder="9x xxxxxxxx"
          suffix="🇸🇩"
        /> */}

        <PhoneNumberInput
          countryFieldName="countryKey"
          name="phone"
          setValue={setValue}
          control={control}
        />

        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="items-center justify-center py-4 mt-2 rounded-xl bg-[#0F113C]"
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
          <Text className="text-sm text-[#6B7280]">تذكرت كلمة المرور؟</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
