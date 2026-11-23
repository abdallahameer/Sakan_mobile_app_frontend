import AppTextInput from "@/components/InputsComponents/Apptextinput";
import EmailInput from "@/components/InputsComponents/EmailInput";
import { api } from "@/lib/api";
import { User } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/ThemeProvider";

type UserInformationFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function UserInformation() {
  const router = useRouter();
  const { colors } = useTheme();

  const { data: userInfo } = useQuery({
    queryKey: ["userId"],
    queryFn: async () => {
      return (await api.get<{ user: User }>("/auth/me")).data.user;
    },
  });

  const { control } = useForm<UserInformationFormValues>({
    defaultValues: {
      name: userInfo?.name,
      email: userInfo?.email,
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA] dark:bg-[#0B0D1D]">
      <View className="flex-row items-center justify-between px-4 py-4 w-full border-b border-[#E5E7EB] dark:border-[#36384D]">
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-forward" size={22} color={colors.text} />
        </Pressable>

        <View className="flex-row items-center justify-start w-[60%]">
          <Text className="text-lg font-bold text-[#0F113C] dark:text-[#F3F4F6]">
            إعدادات الحساب
          </Text>
        </View>
      </View>

      <ScrollView contentContainerClassName="p-4 gap-5">
        <View className="flex-row items-end gap-3">
          <AppTextInput
            name="name"
            control={control}
            label="الاسم"
            placeholder="إسم المستخدم"
            containerClassName="flex-1"
          />
        </View>

        <EmailInput name="email" control={control} />

        <View className="px-5 mt-6">
          <Pressable
            onPress={() => {}}
            className="items-center justify-center py-4 rounded-xl bg-[#0F113C] dark:bg-[#2D3158]"
          >
            <Text className="text-base font-bold text-white">تحديث</Text>
          </Pressable>
        </View>

        <Pressable className="flex-row-reverse items-center self-start gap-2 mt-2">
          <Text className="text-sm font-semibold text-[#374151] dark:text-[#D1D5DB]">
            حذف الحساب
          </Text>
          <Ionicons name="trash-outline" size={18} color={colors.secondaryText} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
