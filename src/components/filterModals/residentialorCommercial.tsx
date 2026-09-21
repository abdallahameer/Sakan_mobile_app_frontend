import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

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
          className="flex-col gap-5 px-5 pt-3 pb-8 bg-white rounded-t-3xl"
        >
          <View className="items-center mb-5">
            <View className="w-10 h-1.5 rounded-full bg-[#E5E7EB]" />
          </View>

          <View className="flex-row gap-3">
            <Pressable
              onPress={() =>
                setVal((currentValue) =>
                  currentValue === "residential" ? null : "residential",
                )
              }
              className="items-center justify-center flex-1 py-4 border rounded-2xl"
              style={{
                borderColor: val === "residential" ? "#1e40af" : "#E5E7EB",
                backgroundColor: val === "residential" ? "#dbeafe" : "#ffffff",
              }}
            >
              <Text className="text-base font-bold text-[#0F113C]">سكني</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                setVal((currentValue) =>
                  currentValue === "commercial" ? null : "commercial",
                )
              }
              className="items-center justify-center flex-1 py-4 border rounded-2xl"
              style={{
                borderColor: val === "commercial" ? "#1e40af" : "#E5E7EB",
                backgroundColor: val === "commercial" ? "#dbeafe" : "#ffffff",
              }}
            >
              <Text className="text-base font-bold text-[#0F113C]">تجاري</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => onApply(val)}
            className="items-center justify-center py-3.5 rounded-xl bg-[#0F113C]"
          >
            <Text className="text-base font-bold text-white">تطبيق</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
