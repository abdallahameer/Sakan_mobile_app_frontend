import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

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

        <View className="gap-2">
          <Text className="text-base font-semibold text-left text-[#0F113C]">
            رقم الهاتف*
          </Text>
          <View className="flex-row-reverse items-center px-3 border border-[#0F113C] rounded-xl">
            <Text className="text-lg">🇸🇩</Text>
            <View className="w-px h-5 mx-2.5 bg-[#E5E7EB]" />
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="9x xxxxxxxx"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              className="flex-1 py-3.5 text-right text-[#0F113C]"
            />
          </View>
        </View>

        <Pressable className="items-center justify-center py-4 mt-2 rounded-xl bg-[#0F113C]">
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
