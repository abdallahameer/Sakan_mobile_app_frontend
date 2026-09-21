import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

type WithFamily = "family" | "single" | null;

type ResidentialorCommercialProps = {
  visible: boolean;
  onClose: () => void;
  value: WithFamily;
  onApply: (type: WithFamily) => void;
};

export default function FamilyOrSingleModal({
  visible,
  onClose,
  value,
  onApply,
}: ResidentialorCommercialProps) {
  const [withFamily, setWithFamily] = useState(value);

  useEffect(() => {
    if (visible) {
      setWithFamily(value);
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
          className="flex-col gap-5 px-5 pt-3 pb-8 bg-white rounded-t-3xl"
        >
          <View className="items-center mb-5">
            <View className="w-10 h-1.5 rounded-full bg-[#E5E7EB]" />
          </View>

          <View className="flex-row gap-3">
            <Pressable
              onPress={() =>
                setWithFamily((currentValue) =>
                  currentValue === "family" ? null : "family",
                )
              }
              className="items-center justify-center flex-1 py-4 border rounded-2xl"
              style={{
                borderColor: withFamily === "family" ? "#1e40af" : "#E5E7EB",
                backgroundColor:
                  withFamily === "family" ? "#dbeafe" : "#ffffff",
              }}
            >
              <Text className="text-base font-bold text-[#0F113C]">عوائل</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                setWithFamily((currentValue) =>
                  currentValue === "single" ? null : "single",
                )
              }
              className="items-center justify-center flex-1 py-4 border rounded-2xl"
              style={{
                borderColor: withFamily === "single" ? "#1e40af" : "#E5E7EB",
                backgroundColor:
                  withFamily === "single" ? "#dbeafe" : "#ffffff",
              }}
            >
              <Text className="text-base font-bold text-[#0F113C]">عزاب</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => onApply(withFamily)}
            className="items-center justify-center py-3.5 rounded-xl bg-[#0F113C]"
          >
            <Text className="text-base font-bold text-white">تطبيق</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
