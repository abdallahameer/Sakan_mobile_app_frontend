import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA]">
      {/* Header */}
      <View className="flex-row items-center justify-start gap-2 px-4 py-4 border-b border-[#0F113C]">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={22} color="#0F113C" />
        </Pressable>
        <Text className="text-lg font-bold text-[#0F113C]">تسجيل الدخول</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 24 }}>
        <View className="flex-row items-center justify-center">
          <Image
            className="w-36 h-32 "
            resizeMode="contain"
            source={require("../../../assets/progectImages/sakanLogo.png")}
          />
        </View>

        {/* Phone number */}
        <View className="gap-2">
          <Text className="text-base font-semibold text-left text-[#0F113C]">
            رقم الهاتف*
          </Text>
          <View className="flex-row items-center px-3 border border-[#0F113C] rounded-xl">
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="9x xxxxxxxx"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              className="flex-1 py-3.5 text-right text-[#0F113C]"
            />
            <View className="w-px h-5 mx-2.5 bg-[#E5E7EB]" />
            <Text className="text-lg">🇸🇩</Text>
          </View>
        </View>

        {/* Password */}
        <View className="gap-2">
          <Text className="text-base font-semibold text-left text-[#0F113C]">
            كلمة المرور*
          </Text>
          <View className="flex-row items-center px-3 border border-[#0F113C] rounded-xl">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="********"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              className="flex-1 py-3.5 text-right text-[#0F113C]"
            />
            <Pressable onPress={() => setShowPassword((prev) => !prev)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#9CA3AF"
              />
            </Pressable>
          </View>
        </View>

        {/* Forgot password */}
        <Pressable
          onPress={() => router.push("/forgot-password" as any)}
          className="self-start"
        >
          <Text className="text-sm font-semibold text-[#10B981]">
            نسيت كلمة المرور؟
          </Text>
        </Pressable>

        {/* Submit */}
        <Pressable className="items-center justify-center py-4 mt-2 rounded-xl bg-[#0F113C]">
          <Text className="text-base font-bold text-white">تسجيل الدخول</Text>
        </Pressable>

        {/* Go to signup */}
        <View className="flex-row justify-center gap-1 mt-2">
          <Pressable onPress={() => router.push("/signup" as any)}>
            <Text className="text-sm font-bold text-[#10B981]">إنشاء حساب</Text>
          </Pressable>
          <Text className="text-sm text-[#6B7280]">ليس لديك حساب؟</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
