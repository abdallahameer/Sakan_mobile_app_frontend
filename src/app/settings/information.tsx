import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserInformation() {
  const router = useRouter();
  const [name, setName] = useState("abdallah taha");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 w-full border-b border-[#E5E7EB]">
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-forward" size={22} color="#0F113C" />
        </Pressable>

        <View className="flex-row items-center justify-start w-[60%]">
          <Text className="text-lg font-bold text-[#0F113C]">
            إعدادات الحساب
          </Text>
        </View>
      </View>

      <ScrollView contentContainerClassName="p-4 gap-5">
        {/* Name */}
        <View className="flex-col gap-3 ">
          <Text className="text-sm font-semibold text-left text-[#0F113C]">
            الاسم
          </Text>
          <View className="flex-row items-start justify-between px-3  pt-3 pb-0 border border-[#424474] rounded-xl">
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="إسم المستخدم"
              textAlign="right"
              className=" w-[80%] overflow-hidden"
            />
            <Pressable className="px-3 py-1.5 border rounded-lg border-[#424474]">
              <Text className="text-sm font-semibold text-[#10B981]">
                تعديل
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Email (read-only) */}
        <View className="gap-2">
          <Text className="text-sm font-semibold text-left text-[#0F113C]">
            الإيميل
          </Text>
          <View className="items-center justify-center px-3 py-3 bg-white border-[#424474] border rounded-xl">
            <Text className="text-base text-[#9CA3AF]">
              abdallah.ameer.taha@gmail.com
            </Text>
          </View>
        </View>

        {/* Phone number */}
        <View className="gap-2">
          <Text className="text-sm font-semibold text-left text-[#0F113C]">
            رقم الهاتف
          </Text>
          <View className="flex-row items-center px-3 border rounded-xl border-[#424474]">
            {/* Country flag + code, start side in RTL = right */}

            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="1x xxxxxxxx"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              textAlign="right"
              className="flex-1 py-3 text-[#0F113C]"
            />
            <View className="w-px h-5 bg-[#424474] mx-2.5" />
            <Text className="text-lg">🇾🇪</Text>
          </View>
        </View>

        {/* Password */}
        <View className="gap-2">
          <Text className="text-sm font-semibold text-left text-[#0F113C]">
            كلمة المرور
          </Text>
          <View className="border rounded-xl border-[#424474]">
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textAlign="right"
              className="px-3 py-3 text-[#0F113C]"
            />
          </View>
        </View>

        {/* Delete account */}
        <Pressable className="flex-row-reverse items-center self-start gap-2 mt-2">
          <Text className="text-sm font-semibold text-[#374151]">
            حذف الحساب
          </Text>
          <Ionicons name="trash-outline" size={18} color="#374151" />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
