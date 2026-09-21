import AppNumberInput from "@/components/InputsComponents/Appnumberinput";
import AppTextInput from "@/components/InputsComponents/Apptextinput";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type UserInformationFormValues = {
  name: string;
  phone: string;
  password: string;
};

export default function UserInformation() {
  const router = useRouter();
  const { control } = useForm<UserInformationFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      password: "",
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA]">
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
        <View className="flex-row items-end gap-3">
          <AppTextInput
            name="name"
            control={control}
            label="الاسم"
            placeholder="إسم المستخدم"
            containerClassName="flex-1"
          />
        </View>

        <AppNumberInput
          name="phone"
          control={control}
          label="رقم الهاتف"
          placeholder="xxxxxxxx"
          suffix="🇾🇪"
        />

        <AppTextInput
          name="password"
          control={control}
          label="كلمة المرور"
          secureTextEntry
        />

        <View className="px-5 mt-6">
          <Pressable
            onPress={() => {}}
            className="items-center justify-center py-4 rounded-xl bg-[#0F113C]"
          >
            <Text className="text-base font-bold text-white">تحديث</Text>
          </Pressable>
        </View>

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
