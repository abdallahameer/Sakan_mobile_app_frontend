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

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 w-full border-b border-[#E5E7EB]">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={22} color="#0F113C" />
        </Pressable>

        <View className="flex-row items-center justify-start w-[60%]">
          <Text className="text-lg font-bold text-[#0F113C]">
            سياسة الخصوصية
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerClassName="p-5 pb-10">
        {/* Logo */}
        <View className="flex-row items-center justify-center">
          <Image
            className="w-36 h-32"
            resizeMode="contain"
            source={require("../../../assets/progectImages/sakanLogo.png")}
          />
        </View>

        <Text className="mb-1 text-2xl font-bold text-left text-[#0F113C]">
          سياسة الخصوصية لتطبيق سكن
        </Text>
        <Text className="mb-4 text-sm text-left text-[#9CA3AF]">
          آخر تحديث: [ضع التاريخ هنا]
        </Text>
        <Text className="mb-3 text-base leading-7 text-left text-[#374151]">
          مرحبًا بك في تطبيق "سكن". نحن نحترم خصوصيتك ونلتزم بحماية بياناتك
          الشخصية. توضح سياسة الخصوصية هذه نوع المعلومات التي نجمعها، وكيف
          نستخدمها، وكيف نحميها عند استخدامك لتطبيق سكن.
        </Text>
        <Text className="mb-3 text-base leading-7 text-left text-[#374151]">
          يتم تشغيل التطبيق وإدارته بواسطة فريق سكن.
        </Text>
        <Text className="mb-6 text-base leading-7 text-left text-[#374151]">
          باستخدامك لتطبيق سكن، فإنك توافق على جمع واستخدام المعلومات وفقًا لما
          هو موضح في سياسة الخصوصية هذه.
        </Text>

        {/* 1. المعلومات التي نجمعها */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            1. المعلومات التي نجمعها
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            عند إنشاء حساب في تطبيق سكن، قد نجمع المعلومات التالية:
          </Text>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              الاسم.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              رقم الهاتف.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              صورة الملف الشخصي، إذا اخترت إضافتها.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              معلومات العقارات التي تقوم بإضافتها إلى التطبيق.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              سجل البحث داخل التطبيق.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              المفضلة التي تقوم بحفظها.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              المعلومات اللازمة لتشغيل بعض خصائص التطبيق والإشعارات.
            </Text>
          </View>
        </View>

        {/* 2. إنشاء الحساب وتسجيل الدخول */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            2. إنشاء الحساب وتسجيل الدخول
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            يتطلب استخدام تطبيق سكن إنشاء حساب وتسجيل الدخول.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            نستخدم رقم الهاتف لأغراض تشمل:
          </Text>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              إنشاء الحساب وتسجيل الدخول.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              التحقق من ملكية رقم الهاتف.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              تمكين المستخدمين من التواصل مع أصحاب العقارات.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              تمكين التواصل عبر المكالمات الهاتفية أو WhatsApp عند توفر ذلك.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              حماية الحسابات ومنع الوصول غير المصرح به.
            </Text>
          </View>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            قد نستخدم رمز تحقق يتم إرساله إلى رقم الهاتف للتحقق من هوية
            المستخدم.
          </Text>
        </View>

        {/* 3. معلومات العقارات */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            3. معلومات العقارات
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            يمكن للمستخدمين إضافة عقارات إلى التطبيق.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            قد تتضمن بيانات العقار:
          </Text>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              اسم صاحب العقار.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              رقم هاتف صاحب العقار.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              صور العقار.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              وصف العقار.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              وصف موقع العقار.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              سعر العقار.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              عدد الغرف.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              عدد الحمامات.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              مساحة العقار.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              موقع العقار على الخريطة، إذا اختار المستخدم إضافته.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              مستند أو إثبات ملكية العقار عند طلبه.
            </Text>
          </View>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            يتم استخدام هذه المعلومات لعرض العقار للمستخدمين وتمكين المهتمين من
            التواصل مع صاحبه.
          </Text>
        </View>

        {/* 4. ظهور رقم الهاتف */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            4. ظهور رقم الهاتف
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            قد يكون رقم الهاتف المرتبط بالعقار ظاهرًا للمستخدمين الآخرين حتى
            يتمكنوا من التواصل مع صاحب العقار.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            قد يتم التواصل مع صاحب العقار من خلال الاتصال الهاتفي أو WhatsApp.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            لا يوفر تطبيق سكن نظام محادثة داخليًا في الوقت الحالي، ولا يقوم
            التطبيق بتخزين محادثات WhatsApp التي تتم خارج التطبيق.
          </Text>
        </View>

        {/* 5. الصور */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            5. الصور
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            يمكن للمستخدم رفع صور إلى التطبيق، بما في ذلك:
          </Text>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              صورة الملف الشخصي.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              صور العقارات.
            </Text>
          </View>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            يتم تخزين الصور باستخدام البنية التحتية والخدمات السحابية المستخدمة
            لتشغيل التطبيق.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            يمكن للمستخدم حذف صورة ملفه الشخصي متى أراد ذلك.
          </Text>
        </View>

        {/* 6. مستندات إثبات الملكية */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            6. مستندات إثبات الملكية
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            قد يطلب التطبيق من المستخدم تقديم مستند يثبت ملكية العقار أو حقه في
            عرضه.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            تُستخدم هذه المستندات لغرض التحقق من العقار وتقليل عمليات الاحتيال
            والإعلانات غير الموثوقة.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            يجب تقييد الوصول إلى هذه المستندات على الأنظمة والأشخاص المصرح لهم
            بذلك، ويتم التعامل معها وفقًا لسياسة حماية البيانات والأمان المعمول
            بها.
          </Text>
        </View>

        {/* 7. الموقع الجغرافي */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            7. الموقع الجغرافي
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            قد يطلب تطبيق سكن إذن الوصول إلى موقع الجهاز.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            يتم استخدام الموقع الحالي للجهاز بهدف:
          </Text>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              عرض العقارات القريبة من المستخدم.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              تحسين نتائج البحث المتعلقة بالموقع.
            </Text>
          </View>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            لا يقوم التطبيق حاليًا بتخزين الموقع الجغرافي الحالي للمستخدم.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            كما لا يتم عرض موقع المستخدم الحالي للمستخدمين الآخرين.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            قد يختار المستخدم إضافة موقع جغرافي للعقار باستخدام الخريطة، وفي هذه
            الحالة قد يتم عرض موقع العقار للمستخدمين الآخرين.
          </Text>
        </View>

        {/* 8. سجل البحث */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            8. سجل البحث
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            قد يقوم التطبيق بتخزين سجل عمليات البحث التي يجريها المستخدم داخل
            التطبيق بهدف تحسين تجربة البحث وتمكين بعض وظائف التطبيق.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            لا يقوم التطبيق حاليًا بتخزين قائمة بالعقارات التي قام المستخدم
            بمشاهدتها.
          </Text>
        </View>

        {/* 9. المفضلة */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            9. المفضلة
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            عند إضافة عقار إلى قائمة المفضلة، قد يتم تخزين هذه المعلومات في
            قاعدة بيانات التطبيق حتى يتمكن المستخدم من الوصول إلى العقارات التي
            حفظها لاحقًا.
          </Text>
        </View>

        {/* 10. الإشعارات */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            10. الإشعارات
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            يستخدم تطبيق سكن الإشعارات لإرسال تحديثات متعلقة بالعقارات وبعض
            وظائف التطبيق.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            في الوقت الحالي، لا يقوم التطبيق بتخزين رمز الإشعارات الخاص بجهاز
            المستخدم بشكل دائم.
          </Text>
        </View>

        {/* 11. المعلومات التي لا نجمعها حاليًا */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            11. المعلومات التي لا نجمعها حاليًا
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            لا يقوم تطبيق سكن حاليًا بجمع أو استخدام بعض أنواع البيانات لأغراض
            التحليل، ومنها:
          </Text>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              عدد مرات فتح التطبيق.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              الصفحات التي يزورها المستخدم لأغراض التحليل.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              بيانات الاستخدام التحليلية المشابهة.
            </Text>
          </View>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            كما لا يستخدم التطبيق الإعلانات في الوقت الحالي.
          </Text>
        </View>

        {/* 12. خدمات الطرف الثالث والبنية التحتية */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            12. خدمات الطرف الثالث والبنية التحتية
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            يستخدم تطبيق سكن خدمات وبنية تحتية خارجية ضرورية لتشغيل التطبيق
            وتخزين البيانات وحمايتها.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            قد تشمل هذه الخدمات Cloudflare وغيرها من الخدمات التقنية المستخدمة
            في تشغيل التطبيق.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            قد تتم معالجة أو تخزين بعض البيانات من خلال هذه الخدمات بالقدر
            اللازم لتوفير وظائف التطبيق وحمايته.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            لا يقوم فريق سكن ببيع البيانات الشخصية للمستخدمين.
          </Text>
        </View>

        {/* 13. مشاركة المعلومات */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            13. مشاركة المعلومات
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            لا نبيع بيانات المستخدمين الشخصية.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            قد تتم مشاركة أو الكشف عن بعض المعلومات في الحالات التالية:
          </Text>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              عندما يكون ذلك ضروريًا لتوفير وظيفة أساسية في التطبيق.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              عند استخدام خدمات تقنية ضرورية لتشغيل التطبيق.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              عندما يكون الكشف عن المعلومات مطلوبًا بموجب القانون.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              لحماية حقوق أو سلامة المستخدمين أو التطبيق.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              للتحقيق في عمليات الاحتيال أو إساءة الاستخدام أو الأنشطة غير
              القانونية.
            </Text>
          </View>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            لا يتم مشاركة بيانات المستخدمين مع جهات أخرى لأغراض إعلانية أو
            تجارية غير مرتبطة بتشغيل التطبيق.
          </Text>
        </View>

        {/* 14. حماية البيانات */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            14. حماية البيانات
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            نحن نعمل على اتخاذ إجراءات تقنية وتنظيمية مناسبة لحماية بيانات
            المستخدمين من الوصول غير المصرح به أو التعديل أو الكشف أو الاستخدام
            غير المشروع.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            يستخدم التطبيق اتصال HTTPS للمساعدة في حماية البيانات أثناء انتقالها
            بين الجهاز والخوادم.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            كما يتم اتخاذ إجراءات لحماية الحسابات ومنع الوصول غير المصرح به
            إليها.
          </Text>
        </View>

        {/* 15. حذف الحساب والبيانات */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            15. حذف الحساب والبيانات
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            يمكن للمستخدم حذف حسابه من خلال التطبيق عندما تكون هذه الخاصية
            متاحة.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            عند حذف الحساب، نهدف إلى حذف البيانات المرتبطة بالحساب والعقار
            والمعلومات الشخصية المرتبطة به.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            ومع ذلك، قد نحتفظ ببعض المعلومات لفترة محدودة إذا كان ذلك ضروريًا:
          </Text>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              للامتثال للالتزامات القانونية.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              لمنع الاحتيال وإساءة الاستخدام.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              لحماية حقوق المستخدمين أو التطبيق.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              لحل النزاعات.
            </Text>
          </View>
          <View className="flex-row-reverse items-start gap-1.5 mb-1.5 pr-1">
            <Text className="text-base leading-7 text-[#0F113C]">•</Text>
            <Text className="flex-1 text-base leading-7 text-left text-[#374151]">
              للامتثال لمتطلبات أمنية أو قانونية.
            </Text>
          </View>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            بعد انتهاء الحاجة القانونية أو الأمنية للاحتفاظ بهذه المعلومات، يتم
            حذفها أو جعلها غير قابلة للربط بالمستخدم، وفقًا لما تسمح به القوانين
            المعمول بها.
          </Text>
        </View>

        {/* 16. طلب حذف البيانات */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            16. طلب حذف البيانات
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            إذا لم يتمكن المستخدم من حذف بعض بياناته من داخل التطبيق، يمكنه
            التواصل مع فريق سكن وطلب حذف بياناته.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            سنراجع الطلب ونتخذ الإجراءات المناسبة وفقًا للقوانين والالتزامات
            القانونية المعمول بها.
          </Text>
        </View>

        {/* 17. بيانات الأطفال */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            17. بيانات الأطفال
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            تطبيق سكن موجه بشكل عام للطلاب والعائلات والبالغين وغيرهم من
            المستخدمين.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            لا يهدف التطبيق إلى جمع بيانات الأطفال لأغراض خاصة.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            إذا علمنا أن بيانات شخصية قد تم جمعها من طفل بطريقة غير مناسبة أو
            مخالفة للقوانين المعمول بها، فسنتخذ الإجراءات المناسبة لمعالجة ذلك.
          </Text>
        </View>

        {/* 18. الاحتيال والتحقق من العقارات */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            18. الاحتيال والتحقق من العقارات
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            نظرًا لأن التطبيق يسمح للمستخدمين بإضافة عقارات، قد نستخدم بعض
            المعلومات والمستندات المقدمة من المستخدم للمساعدة في التحقق من
            العقار وتقليل عمليات الاحتيال.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            ومع ذلك، يجب على المستخدم دائمًا التحقق بنفسه من صحة معلومات العقار
            وملكية العقار قبل إجراء أي عملية مالية أو قانونية.
          </Text>
        </View>

        {/* 19. التواصل مع أصحاب العقارات */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            19. التواصل مع أصحاب العقارات
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            يوفر التطبيق وسائل للتواصل مع أصحاب العقارات، وقد تتضمن الاتصال
            الهاتفي أو WhatsApp.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            أي محادثات أو معلومات يتم تبادلها من خلال خدمات خارجية مثل WhatsApp
            تخضع أيضًا لسياسات الخصوصية الخاصة بتلك الخدمات.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            لا يقوم تطبيق سكن بتخزين محادثات WhatsApp التي تتم خارج التطبيق.
          </Text>
        </View>

        {/* 20. التغييرات على سياسة الخصوصية */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            20. التغييرات على سياسة الخصوصية
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر نتيجة لتطوير التطبيق
            أو إضافة ميزات جديدة أو تغييرات قانونية.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            عند إجراء تغييرات مهمة، سنقوم بتحديث تاريخ "آخر تحديث" في أعلى هذه
            الصفحة، وقد نستخدم وسائل مناسبة لإبلاغ المستخدمين بالتغييرات المهمة.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            ننصح المستخدمين بمراجعة سياسة الخصوصية بشكل دوري.
          </Text>
        </View>

        {/* 21. الميزات المستقبلية */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            21. الميزات المستقبلية
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            قد تتم إضافة ميزات جديدة إلى تطبيق سكن مستقبلًا.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            إذا تمت إضافة ميزات تؤثر على طريقة جمع أو استخدام أو مشاركة البيانات
            الشخصية، فسيتم تحديث سياسة الخصوصية هذه لتوضيح طريقة التعامل مع
            البيانات المتعلقة بهذه الميزات.
          </Text>
        </View>

        {/* 22. التواصل معنا */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            22. التواصل معنا
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            إذا كان لديك أي سؤال أو استفسار متعلق بسياسة الخصوصية أو بياناتك
            الشخصية، يمكنك التواصل مع فريق سكن من خلال وسائل التواصل المتاحة
            داخل التطبيق.
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            البريد الإلكتروني الخاص بالخصوصية: [أضف البريد الإلكتروني هنا]
          </Text>
        </View>

        {/* 23. الموافقة */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-bold text-left text-[#0F113C]">
            23. الموافقة
          </Text>
          <Text className="mb-2 text-base leading-7 text-left text-[#374151]">
            باستخدامك تطبيق سكن وإنشاء حساب فيه، فإنك تقر بأنك قرأت سياسة
            الخصوصية هذه وفهمت كيفية جمع واستخدام وحماية بياناتك كما هو موضح
            فيها.
          </Text>
        </View>
      </ScrollView>
      {/* Footer */}
      <View className="w-full flex-col items-center pt-5 justify-start gap-5 bg-[#0F113C] h-[20%]">
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
        <Text className="font-bold text-white">
          المنصة السكنية في السودان 2026-2027
        </Text>
      </View>
    </SafeAreaView>
  );
}
