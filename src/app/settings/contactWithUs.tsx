import AppNumberInput from "@/components/InputsComponents/Appnumberinput";
import AppTextInput from "@/components/InputsComponents/Apptextinput";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type ContactFormValues = {
  name: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactWithUs() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (_values: ContactFormValues) => {
    Toast.show({
      type: "success",
      text1: "إرسال الرسالة",
      text2: "تم إرسال رسالتك بنجاح",
    });
  };

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
          <Text className="text-lg font-bold text-[#0F113C]">إتصل بنا</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
        <View className="flex-col gap-1.5 items-start ">
          <Text className="text-xl font-bold text-left text-[#0F113C]">
            للاقتراحات والاستفسارات
          </Text>
          <Text className="text-sm text-left text-[#6B7280]">
            نحن نرحب بجميع الاستفسارات والمقترحات
          </Text>
        </View>

        <AppTextInput
          placeholder="اسمك"
          name="name"
          control={control}
          label="الاسم*"
        />

        <AppNumberInput
          name="phone"
          control={control}
          label="رقم الهاتف*"
          placeholder="xxxxxxxx"
          suffix="🇾🇪"
        />

        <AppTextInput
          placeholder="العنوان"
          name="subject"
          control={control}
          label="عنوان الرسالة*"
        />

        <AppTextInput
          name="message"
          control={control}
          label="الرسالة*"
          multiline
        />

        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="items-center justify-center py-4 mt-2 rounded-xl bg-[#0F113C]"
        >
          <Text className="text-base font-bold text-white">إرسال</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
