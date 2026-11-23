import type { RoomsNumber } from "@/types";
import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getSelectionStyle, useTheme } from "@/theme/ThemeProvider";

type RoomsNumberModalProps = {
  visible: boolean;
  onClose: () => void;
  value: RoomsNumber;
  onApply: (rooms: RoomsNumber) => void;
};

export default function RoomsNumberModal({
  visible,
  onClose,
  value,
  onApply,
}: RoomsNumberModalProps) {
  const [draft, setDraft] = useState<RoomsNumber>(value);
  const inSet = useSafeAreaInsets();
  const { isDarkMode, colors } = useTheme();

  useEffect(() => {
    if (visible) {
      setDraft(value);
    }
  }, [visible, value]);

  const handleSelect = (rooms: RoomsNumber) => {
    setDraft((prev) => (prev === rooms ? null : rooms));
  };

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

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
          className="px-5 pt-3 bg-white rounded-t-3xl dark:bg-[#0B0D1D]"
          style={{ paddingBottom: inSet.bottom + 16 }}
        >
          <View className="items-center mb-5">
            <View className="w-10 h-1.5 rounded-full bg-[#E5E7EB] dark:bg-[#36384D]" />
          </View>

          <View className="flex-row flex-wrap gap-3 mb-5">
            <Pressable
              onPress={() => setDraft(null)}
              className="flex-row items-center justify-center p-2 border min-w-10 rounded-2xl"
              style={getSelectionStyle(draft === null, isDarkMode, colors)}
            >
              <Text className="text-base font-bold text-[#0F113C] dark:text-[#F3F4F6]">الكل</Text>
            </Pressable>

            <Pressable
              onPress={() => handleSelect("1")}
              className="flex-row items-center justify-center p-2 border min-w-10 rounded-2xl"
              style={getSelectionStyle(draft === "1", isDarkMode, colors)}
            >
              <Text className="text-base font-bold text-[#0F113C] dark:text-[#F3F4F6]">1</Text>
            </Pressable>
            <Pressable
              onPress={() => handleSelect("2")}
              className="flex-row items-center justify-center p-2 border min-w-10 rounded-2xl"
              style={getSelectionStyle(draft === "2", isDarkMode, colors)}
            >
              <Text className="text-base font-bold text-[#0F113C] dark:text-[#F3F4F6]">2</Text>
            </Pressable>
            <Pressable
              onPress={() => handleSelect("3")}
              className="flex-row items-center justify-center p-2 border min-w-10 rounded-2xl"
              style={getSelectionStyle(draft === "3", isDarkMode, colors)}
            >
              <Text className="text-base font-bold text-[#0F113C] dark:text-[#F3F4F6]">3</Text>
            </Pressable>
            <Pressable
              onPress={() => handleSelect("4")}
              className="flex-row items-center justify-center p-2 border min-w-10 rounded-2xl"
              style={getSelectionStyle(draft === "4", isDarkMode, colors)}
            >
              <Text className="text-base font-bold text-[#0F113C] dark:text-[#F3F4F6]">4</Text>
            </Pressable>
            <Pressable
              onPress={() => handleSelect("5")}
              className="flex-row items-center justify-center p-2 border min-w-10 rounded-2xl"
              style={getSelectionStyle(draft === "5", isDarkMode, colors)}
            >
              <Text className="text-base font-bold text-[#0F113C] dark:text-[#F3F4F6]">5</Text>
            </Pressable>
            <Pressable
              onPress={() => handleSelect("6")}
              className="flex-row items-center justify-center p-2 border min-w-10 rounded-2xl"
              style={getSelectionStyle(draft === "6", isDarkMode, colors)}
            >
              <Text className="text-base font-bold text-[#0F113C] dark:text-[#F3F4F6]">6</Text>
            </Pressable>
            <Pressable
              onPress={() => handleSelect("7")}
              className="flex-row items-center justify-center p-2 border min-w-10 rounded-2xl"
              style={getSelectionStyle(draft === "7", isDarkMode, colors)}
            >
              <Text className="text-base font-bold text-[#0F113C] dark:text-[#F3F4F6]">7</Text>
            </Pressable>
            <Pressable
              onPress={() => handleSelect("+8")}
              className="flex-row items-center justify-center p-2 border min-w-10 rounded-2xl"
              style={getSelectionStyle(draft === "+8", isDarkMode, colors)}
            >
              <Text className="text-base font-bold text-[#0F113C] dark:text-[#F3F4F6]">8+</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={handleApply}
            className="items-center justify-center py-3.5 rounded-xl bg-[#0F113C] dark:bg-[#2D3158]"
          >
            <Text className="text-base font-bold text-white">تطبيق</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
