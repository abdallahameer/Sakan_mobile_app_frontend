import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutUs() {
  const router = useRouter();

  return (
    <>
      <SafeAreaView className="flex-1  bg-[#F0F1FA]">
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
            <Text className="text-lg font-bold text-[#0F113C]">نبذة عنا</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-center">
          <Image
            className="w-36 h-32 "
            resizeMode="contain"
            source={require("../../../assets/progectImages/sakanLogo.png")}
          />
        </View>

        <ScrollView>
          {/* About section */}
          <View className="gap-4 px-5 pt-8 pb-6">
            <Text className="text-3xl font-bold text-center text-[#0F113C]">
              من نحن؟
            </Text>

            <Text className="text-base leading-8 text-left text-[#374151]">
              سكن هو تطبيق سوداني يهدف إلى تسهيل طريقة البحث عن السكن والعقارات
              في السودان، من خلال ربط الباحث عن العقار بمالكه مباشرةً، بعيدًا عن
              الطرق التقليدية والوسطاء. نعمل على جمع خيارات السكن في مكان واحد،
              بطريقة بسيطة ومنظمة، حتى يتمكن المستخدم من البحث والمقارنة والوصول
              إلى العقار المناسب له بسهولة وأمان. بدأت فكرة سكن من مشكلة نواجهها
              بأنفسنا كطلاب وأسر وأفراد في السودان؛ فالبحث عن سكن غالبًا ما
              يعتمد على السؤال والمعارف ومجموعات الواتساب والفيسبوك، مما يجعل
              العملية تستغرق وقتًا وجهدًا ومالًا. نريد أن نجعل هذه التجربة أسهل،
              ونبدأ بخطوة نحو مستقبل تقني أفضل للسودان.
            </Text>
          </View>

          {/* Values section */}
          <View className="gap-4 px-5 py-8 mx-4 mt-2 bg-blue-400/30 rounded-2xl">
            <View className="items-center">
              <Text className="text-2xl font-bold text-[#0F113C]">قيمنا</Text>
              <View className="w-16 h-0.5 mt-2 bg-[#0F113C]" />
            </View>

            <Text className="text-base leading-8 text-left text-[#0F113C]">
              سكن لم يُبنَ بهدف الربح، بل بُني أولًا لخدمة الناس. نحن نؤمن أن
              التقنية يمكنها أن تجعل حياة الناس أسهل، وأن كثيرًا من المشاكل التي
              نواجهها اليوم يمكن حلها إذا استخدمنا التكنولوجيا بطريقة صحيحة. بدأ
              سكن من مشكلة حقيقية نعيشها نحن كطلاب وأسر وأفراد في السودان، وهي
              صعوبة البحث عن سكن مناسب، وما يصاحب ذلك من وقت وجهد وتكاليف وطرق
              تقليدية قديمة. لذلك هدفنا هو تسهيل حياة الناس، وتوفير وقتهم
              وجهدهم، وتقليل التكاليف غير الضرورية، وفي الوقت نفسه المساهمة في
              نقل السودان خطوة نحو مجتمع يعتمد على الحلول التقنية بدلًا من الطرق
              التقليدية. نحن لا نريد أن يكون سكن مجرد تطبيق آخر، بل نطمح أن يكون
              حلًا سودانيًا لمشكلة سودانية، وأن نثبت أن الأفكار التقنية البسيطة
              يمكن أن تصنع فرقًا حقيقيًا في حياة الناس. سكن — تقنية سودانية
              لحياة أسهل.
            </Text>
          </View>
          <View className="items-center justify-start gap-5 pt-5 mt-4 bg-[#0F113C]">
            <View className="flex-row gap-5">
              <Pressable
                onPress={() =>
                  Linking.openURL("https://www.instagram.com/sakanapp2027/")
                }
                className="items-center justify-center w-12 h-12 border border-gray-500 rounded-full bg-[#0F113C]"
              >
                <Ionicons name="logo-instagram" size={22} color="#ffffff" />
              </Pressable>
              <Pressable
                onPress={() =>
                  Linking.openURL("https://www.facebook.com/share/1DVKFVnLcJ/")
                }
                className="items-center justify-center w-12 h-12 border border-gray-500 rounded-full bg-[#0F113C]"
              >
                <Ionicons name="logo-facebook" size={22} color="#ffffff" />
              </Pressable>
            </View>
            <Text className="pb-5 font-bold text-white">
              المنصة السكنية في السودان 2026-2027
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
