import AppTextInput from "@/components/InputsComponents/Apptextinput";
import EmailInput from "@/components/InputsComponents/EmailInput";
import { api } from "@/lib/api";
import { useTheme } from "@/theme/ThemeProvider";
import { User } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

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

  const { control, watch } = useForm<UserInformationFormValues>({
    defaultValues: {
      name: userInfo?.name,
      email: userInfo?.email,
    },
  });

  const formValues = watch();

  const updateUserInfo = async () => {
    try {
      api.put("/auth/me", formValues);
      Toast.show({
        text1: "تم التعديل",
        text2: "تم تعديل معلومات الحساب بنجاح",
        type: "success",
      });
      router.replace("/profile");
    } catch (error) {
      Toast.show({
        text1: "فشل تعديل",
        text2: "فشل تعديل معلومات المستخدم",
        type: "error",
      });
    }
  };

  const deleteAccount = async () => {
    try {
      api.delete("/auth/me");
      router.replace("/login");
      Toast.show({
        text1: "تم الحذف",
        text2: "تم حذف حسابك بنجاح",
        type: "success",
      });
    } catch (error) {
      Toast.show({ text1: "فشل الحذف", text2: "فشل حذف حسابك", type: "error" });
    }
  };

  const confirmDelete = () => {
    Alert.alert("حذف الحساب", "هل أنت متأكد من حذف هذا لحساب", [
      { text: "إلغاء", style: "cancel" },
      { text: "حذف", style: "destructive", onPress: () => deleteAccount() },
    ]);
  };

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
            onPress={updateUserInfo}
            className="items-center justify-center py-4 rounded-xl bg-[#0F113C] dark:bg-[#2D3158]"
          >
            <Text className="text-base font-bold text-white">تحديث</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={confirmDelete}
          className="flex-row-reverse items-center self-start gap-2 mt-2"
        >
          <Text className="text-sm font-semibold text-[#374151] dark:text-[#D1D5DB]">
            حذف الحساب
          </Text>
          <Ionicons
            name="trash-outline"
            size={18}
            color={colors.secondaryText}
          />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
