import { RoomsNumber } from "@/data/typs";
import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

type BathRoomsModalProps = {
  visible: boolean;
  onClose: () => void;
  value: RoomsNumber;
  onApply: (rooms: RoomsNumber) => void;
};

export default function BathRoomsNumberModal({
  visible,
  onClose,
  value,
  onApply,
}: BathRoomsModalProps) {
  const [draft, setDraft] = useState<RoomsNumber>(value);

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
          className="px-5 pt-3 pb-8 bg-white rounded-t-3xl"
        >
          <View className="items-center mb-5">
            <View className="w-10 h-1.5 rounded-full bg-[#E5E7EB]" />
          </View>

          <View className="flex-row flex-wrap gap-3 mb-5">
            <Pressable
              onPress={() => handleSelect("1")}
              className="flex-row items-center justify-center flex-1 p-2 border min-w-10 rounded-2xl"
              style={{
                borderColor: draft === "1" ? "#1e40af" : "#E5E7EB",
                backgroundColor: draft === "1" ? "#dbeafe" : "#ffffff",
              }}
            >
              <Text className="text-base font-bold text-[#0F113C]">1</Text>
            </Pressable>
            <Pressable
              onPress={() => handleSelect("2")}
              className="flex-row items-center justify-center flex-1 p-2 border min-w-10 rounded-2xl"
              style={{
                borderColor: draft === "2" ? "#1e40af" : "#E5E7EB",
                backgroundColor: draft === "2" ? "#dbeafe" : "#ffffff",
              }}
            >
              <Text className="text-base font-bold text-[#0F113C]">2</Text>
            </Pressable>
            <Pressable
              onPress={() => handleSelect("3")}
              className="flex-row items-center justify-center flex-1 p-2 border min-w-10 rounded-2xl"
              style={{
                borderColor: draft === "3" ? "#1e40af" : "#E5E7EB",
                backgroundColor: draft === "3" ? "#dbeafe" : "#ffffff",
              }}
            >
              <Text className="text-base font-bold text-[#0F113C]">3</Text>
            </Pressable>
            <Pressable
              onPress={() => handleSelect("4")}
              className="flex-row items-center justify-center flex-1 p-2 border min-w-10 rounded-2xl"
              style={{
                borderColor: draft === "4" ? "#1e40af" : "#E5E7EB",
                backgroundColor: draft === "4" ? "#dbeafe" : "#ffffff",
              }}
            >
              <Text className="text-base font-bold text-[#0F113C]">4</Text>
            </Pressable>
            <Pressable
              onPress={() => handleSelect("5")}
              className="flex-row items-center justify-center flex-1 p-2 border min-w-10 rounded-2xl"
              style={{
                borderColor: draft === "5" ? "#1e40af" : "#E5E7EB",
                backgroundColor: draft === "5" ? "#dbeafe" : "#ffffff",
              }}
            >
              <Text className="text-base font-bold text-[#0F113C]">5</Text>
            </Pressable>
            <Pressable
              onPress={() => handleSelect("6")}
              className="flex-row items-center justify-center flex-1 p-2 border min-w-10 rounded-2xl"
              style={{
                borderColor: draft === "6" ? "#1e40af" : "#E5E7EB",
                backgroundColor: draft === "6" ? "#dbeafe" : "#ffffff",
              }}
            >
              <Text className="text-base font-bold text-[#0F113C]">6</Text>
            </Pressable>
            <Pressable
              onPress={() => handleSelect("7")}
              className="flex-row items-center justify-center flex-1 p-2 border min-w-10 rounded-2xl"
              style={{
                borderColor: draft === "7" ? "#1e40af" : "#E5E7EB",
                backgroundColor: draft === "7" ? "#dbeafe" : "#ffffff",
              }}
            >
              <Text className="text-base font-bold text-[#0F113C]">7</Text>
            </Pressable>
            <Pressable
              onPress={() => handleSelect("+8")}
              className="flex-row items-center justify-center p-2 border min-w-10 rounded-2xl"
              style={{
                borderColor: draft === "+8" ? "#1e40af" : "#E5E7EB",
                backgroundColor: draft === "+8" ? "#dbeafe" : "#ffffff",
              }}
            >
              <Text className="text-base font-bold text-[#0F113C]">8+</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={handleApply}
            className="items-center justify-center py-3.5 rounded-xl bg-[#0F113C]"
          >
            <Text className="text-base font-bold text-white">تطبيق</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
