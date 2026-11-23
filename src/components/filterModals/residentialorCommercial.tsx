import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getSelectionStyle, useTheme } from "@/theme/ThemeProvider";

type PropertyType = "residential" | "commercial" | null;

type ResidentialorCommercialProps = {
  visible: boolean;
  onClose: () => void;
  value: PropertyType;
  onApply: (type: PropertyType) => void;
};

export default function ResidentialorCommercial({
  visible,
  onClose,
  value,
  onApply,
}: ResidentialorCommercialProps) {
  const [val, setVal] = useState(value);
  const inSet = useSafeAreaInsets();
  const { isDarkMode, colors } = useTheme();

  useEffect(() => {
    if (visible) {
      setVal(value);
    }
  }, [visible, value]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable onPress={onClose} className="justify-end flex-1 bg-black/40">
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="flex-col gap-5 px-5 pt-3 bg-white rounded-t-3xl dark:bg-[#0B0D1D]"
          style={{ paddingBottom: inSet.bottom + 16 }}
        >
          <View className="items-center mb-5">
            <View className="w-10 h-1.5 rounded-full bg-[#E5E7EB] dark:bg-[#36384D]" />
          </View>

          <View className="flex-row gap-3">
            <Pressable
              onPress={() => setVal(null)}
              className="items-center justify-center flex-1 py-4 border rounded-2xl"
              style={getSelectionStyle(val === null, isDarkMode, colors)}
            >
              <Text className="text-base font-bold text-[#0F113C] dark:text-[#F3F4F6]">الكل</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                setVal((currentValue) =>
                  currentValue === "residential" ? null : "residential",
                )
              }
              className="items-center justify-center flex-1 py-4 border rounded-2xl"
              style={getSelectionStyle(val === "residential", isDarkMode, colors)}
            >
              <Text className="text-base font-bold text-[#0F113C] dark:text-[#F3F4F6]">سكني</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                setVal((currentValue) =>
                  currentValue === "commercial" ? null : "commercial",
                )
              }
              className="items-center justify-center flex-1 py-4 border rounded-2xl"
              style={getSelectionStyle(val === "commercial", isDarkMode, colors)}
            >
              <Text className="text-base font-bold text-[#0F113C] dark:text-[#F3F4F6]">تجاري</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => onApply(val)}
            className="items-center justify-center py-3.5 rounded-xl bg-[#0F113C] dark:bg-[#2D3158]"
          >
            <Text className="text-base font-bold text-white">تطبيق</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
