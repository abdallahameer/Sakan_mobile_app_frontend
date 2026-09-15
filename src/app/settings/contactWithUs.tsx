import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContactWithUs() {
  const router = useRouter();
  const [name, setName] = useState("abdallah taha");
  const [email, setEmail] = useState("abdallah.ameer.taha@gmail.com");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

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
          <Text className="text-lg font-bold text-[#0F113C]">إتصل بنا</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
        {/* Intro */}
        <View className="flex-col gap-1.5 items-start ">
          <Text className="text-xl font-bold text-left text-[#0F113C]">
            للاقتراحات والاستفسارات
          </Text>
          <Text className="text-sm text-left text-[#6B7280]">
            نحن نرحب بجميع الاستفسارات والمقترحات
          </Text>
        </View>

        {/* Name */}
        <View className="gap-2">
          <Text className="text-base font-semibold text-left text-[#0F113C]">
            الاسم*
          </Text>
          <View className="border border-[#424474] rounded-xl">
            <TextInput
              value={name}
              onChangeText={setName}
              textAlign="right"
              className="px-3.5 py-3.5 text-[#0F113C]"
            />
          </View>
        </View>

        {/* Email */}
        <View className="gap-2">
          <Text className="text-base font-semibold text-left text-[#0F113C]">
            عنوان البريد الإلكتروني*
          </Text>
          <View className="border border-[#424474] rounded-xl">
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="px-3.5 py-3.5 text-left text-[#0F113C]"
            />
          </View>
        </View>

        {/* Phone */}
        <View className="gap-2">
          <Text className="text-base font-semibold text-left text-[#0F113C]">
            رقم الهاتف*
          </Text>
          <View className="flex-row items-center px-3 border border-[#424474] rounded-xl">
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="1x xxxxxxxx"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              textAlign="right"
              className="flex-1 py-3.5 text-[#0F113C]"
            />
            <View className="w-px h-5 mx-2.5 bg-[#424474]" />
            <Text className="text-lg">🇾🇪</Text>
          </View>
        </View>

        {/* Subject */}
        <View className="gap-2">
          <Text className="text-base font-semibold text-left text-[#0F113C]">
            عنوان الرسالة*
          </Text>
          <View className="border border-[#424474] rounded-xl">
            <TextInput
              value={subject}
              onChangeText={setSubject}
              textAlign="right"
              className="px-3.5 py-3.5  text-[#0F113C]"
            />
          </View>
        </View>

        {/* Message */}
        <View className="gap-2">
          <Text className="text-base font-semibold text-left text-[#0F113C]">
            الرسالة*
          </Text>
          <View className="border border-[#424474] rounded-xl">
            <TextInput
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              textAlign="right"
              className="px-3.5 py-3.5 min-h-[140px] text-[#0F113C]"
            />
          </View>
        </View>

        {/* Send button */}
        <Pressable className="items-center justify-center py-4 mt-2 rounded-xl bg-[#0F113C]">
          <Text className="text-base font-bold text-white">إرسال</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
