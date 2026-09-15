import NumberRow from "@/components/uploadpropertyHelperComponents/NumberRow";
import SliderRow from "@/components/uploadpropertyHelperComponents/SliderRow";
import ToggleRow from "@/components/uploadpropertyHelperComponents/ToggleRow";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop",
  "https://images.unsplash.com/photo-1565183938294-7563f3ff688c?w=500&h=400&fit=crop",
];

export default function EditProperty() {
  const router = useRouter();
  const { editId } = useLocalSearchParams();

  if (!editId) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-[#F0F1FA]">
        <Text className="text-base font-semibold text-[#6B7280]">
          لم يتم العثور على الإعلان
        </Text>
        <Pressable onPress={() => router.back()} className="mt-4">
          <Text className="font-bold text-[#10B981]">العودة</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA]">
      {/* Header */}
      <View className="flex-row items-center justify-start gap-2 px-4 py-4 border-b border-[#E5E7EB]">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={22} color="#0F113C" />
        </Pressable>
        <Text className="text-lg font-bold text-[#0F113C]">تعديل الإعلان</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Images */}
        <View className="gap-3 p-5">
          <Text className="text-right text-sm font-semibold text-[#0F113C]">
            الصور المرفقة ({MOCK_IMAGES.length})
          </Text>

          <View className="gap-3">
            {MOCK_IMAGES.map((uri, index) => (
              <View key={index} className="relative">
                <Image
                  source={{ uri }}
                  className="w-full h-40 rounded-xl"
                  resizeMode="cover"
                />
                <Pressable
                  onPress={() => {}}
                  className="absolute items-center justify-center w-7 h-7 rounded-full bg-white -top-2 -right-2"
                  style={{
                    elevation: 3,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                  }}
                >
                  <Ionicons name="close" size={18} color="#EF4444" />
                </Pressable>
              </View>
            ))}
          </View>

          {/* Add photo */}
          <Pressable
            onPress={() => {}}
            className="flex-row items-center justify-between px-4 py-3.5 border border-[#0F113C] rounded-xl"
          >
            <View className="items-center justify-center w-8 h-8 rounded-lg bg-[#0F113C]/10">
              <Ionicons name="camera-outline" size={18} color="#0F113C" />
            </View>
            <Text className="text-base font-semibold text-[#0F113C]">
              إرفاق صورة
            </Text>
          </Pressable>

          {/* Add video */}
          <Pressable
            onPress={() => {}}
            className="flex-row items-center justify-between px-4 py-3.5 border border-[#0F113C] rounded-xl"
          >
            <View className="items-center justify-center w-8 h-8 rounded-lg bg-[#0F113C]/10">
              <Ionicons name="videocam-outline" size={18} color="#0F113C" />
            </View>
            <Text className="text-base font-semibold text-[#0F113C]">
              إضافة فيديو
            </Text>
          </Pressable>
        </View>

        <View className="w-full h-0.5 bg-[#0F113C]/10" />

        {/* Basic info */}
        <View className="gap-5 p-5">
          {/* Title */}
          <View className="gap-2">
            <Text className="text-base font-semibold text-left text-[#0F113C]">
              العنوان
            </Text>
            <View className="border border-[#0F113C] rounded-xl">
              <TextInput
                value={"شقة للإجار شمبات"}
                onChangeText={() => {}}
                textAlign="right"
                className="px-3.5 py-3.5 text-[#0F113C]"
              />
            </View>
          </View>

          {/* Location */}
          <View className="gap-2">
            <Text className="text-base font-semibold text-left text-[#0F113C]">
              الموقع
            </Text>
            <View className="border border-[#0F113C] rounded-xl">
              <TextInput
                value={"شمبات، الخرطوم بحري"}
                onChangeText={() => {}}
                textAlign="right"
                className="px-3.5 py-3.5 text-[#0F113C]"
              />
            </View>
          </View>

          {/* Price + Area */}
          <View className="flex-row-reverse gap-3">
            <View className="flex-1 gap-2">
              <Text className="text-base font-semibold text-left text-[#0F113C]">
                السعر
              </Text>
              <View className="flex-row-reverse items-center px-3.5 border border-[#0F113C] rounded-xl">
                <TextInput
                  value={"120000"}
                  onChangeText={() => {}}
                  keyboardType="number-pad"
                  textAlign="right"
                  className="flex-1 py-3.5 text-[#0F113C]"
                />
                <Text className="text-sm font-semibold text-[#6B7280]">
                  جنيه
                </Text>
              </View>
            </View>

            <View className="flex-1 gap-2">
              <Text className="text-base font-semibold text-left text-[#0F113C]">
                المساحة
              </Text>
              <View className="flex-row-reverse items-center px-3.5 border border-[#0F113C] rounded-xl">
                <TextInput
                  value={"200"}
                  onChangeText={() => {}}
                  keyboardType="number-pad"
                  textAlign="right"
                  className="flex-1 py-3.5 text-[#0F113C]"
                />
                <Text className="text-sm font-semibold text-[#6B7280]">م²</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View className="gap-2">
            <Text className="text-base font-semibold text-left text-[#0F113C]">
              وصف العقار
            </Text>
            <View className="border border-[#0F113C] rounded-xl">
              <TextInput
                value={"شقة مميزة تتكون من 3 غرف وصالة، تشطيب ممتاز."}
                onChangeText={() => {}}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                textAlign="right"
                className="px-3.5 py-3.5 min-h-[120px] text-[#0F113C]"
              />
            </View>
          </View>
        </View>

        <View className="w-full h-0.5 bg-[#0F113C]/10" />

        {/* Rent or Sell */}
        <View className="px-4 pt-4">
          <Text className="mb-2 text-right text-sm font-semibold text-[#0F113C]">
            نوع الإعلان
          </Text>
          <View className="flex-row h-9 overflow-hidden bg-[#F0F0F3] border border-[#0F113C] rounded-lg">
            <Pressable
              onPress={() => {}}
              className="items-center justify-center flex-1 bg-[#0F113C]"
            >
              <Text className="text-xs font-semibold text-white">إيجار</Text>
            </Pressable>
            <Pressable
              onPress={() => {}}
              className="items-center justify-center flex-1 bg-transparent"
            >
              <Text className="text-xs font-semibold text-[#0F113C]">بيع</Text>
            </Pressable>
          </View>
        </View>

        {/* عوائل / عزاب */}
        <View className="px-4 pt-3">
          <Text className="mb-2 text-right text-sm font-semibold text-[#0F113C]">
            الفئة المستهدفة
          </Text>
          <View className="flex-row-reverse h-9 overflow-hidden bg-[#F0F0F3] border border-[#0F113C] rounded-lg">
            <Pressable
              onPress={() => {}}
              className="items-center justify-center flex-1 bg-transparent"
            >
              <Text className="text-xs font-semibold text-[#0F113C]">عزاب</Text>
            </Pressable>
            <Pressable
              onPress={() => {}}
              className="items-center justify-center flex-1 bg-[#0F113C]"
            >
              <Text className="text-xs font-semibold text-white">عوائل</Text>
            </Pressable>
          </View>
        </View>

        {/* Payment type */}
        <View className="px-4 pt-3">
          <Text className="mb-2 text-right text-sm font-semibold text-[#0F113C]">
            نوع الدفع
          </Text>
          <View className="flex-row-reverse h-9 overflow-hidden border border-[#0F113C] bg-[#F0F0F3] rounded-lg">
            {(["سنوي", "شهري", "يومي"] as const).map((type) => (
              <Pressable
                key={type}
                onPress={() => {}}
                className={`items-center justify-center flex-1 ${
                  type === "شهري" ? "bg-[#0F113C]" : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    type === "شهري" ? "text-white" : "text-[#0F113C]"
                  }`}
                >
                  {type}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="w-full h-0.5 mt-4 bg-[#0F113C]/10" />

        {/* Sliders */}
        <View className="mt-2">
          <SliderRow
            label="الغرف"
            value={3}
            min={0}
            max={10}
            onChange={() => {}}
          />
          <SliderRow
            label="دورات المياه"
            value={2}
            min={0}
            max={10}
            onChange={() => {}}
          />
          <SliderRow
            label="الصالات"
            value={1}
            min={0}
            max={10}
            onChange={() => {}}
          />
        </View>

        {/* Number fields */}
        <NumberRow
          label="رقم الدور"
          value={2}
          onMinus={() => {}}
          onPlus={() => {}}
        />
        <NumberRow
          label="عمر العقار"
          value={3}
          onMinus={() => {}}
          onPlus={() => {}}
        />

        {/* Boolean options */}
        <ToggleRow label="مؤثثة" value={true} onChange={() => {}} />
        <ToggleRow label="مطبخ" value={true} onChange={() => {}} />
        <ToggleRow label="ملحق" value={false} onChange={() => {}} />
        <ToggleRow label="مدخل سيارة" value={true} onChange={() => {}} />
        <ToggleRow label="سطح خاص" value={false} onChange={() => {}} />
        <ToggleRow label="توفر الماء" value={true} onChange={() => {}} />
        <ToggleRow label="طاقة شمسية" value={false} onChange={() => {}} />
        <ToggleRow label="توفر كهرباء" value={true} onChange={() => {}} />
        <ToggleRow label="مصعد" value={false} onChange={() => {}} />
        <ToggleRow label="مكيف" value={true} onChange={() => {}} />

        {/* Update button */}
        <View className="px-5 mt-6">
          <Pressable
            onPress={() => {}}
            className="items-center justify-center py-4 rounded-xl bg-[#0F113C]"
          >
            <Text className="text-base font-bold text-white">تحديث</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
