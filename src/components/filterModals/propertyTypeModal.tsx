import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

type PropertyType = "sale" | "rent" | null;

type PropertyTypeModalProps = {
  visible: boolean;
  onClose: () => void;
  value: PropertyType;
  onApply: (type: PropertyType) => void;
};

export default function PropertyTypeModal({
  visible,
  onClose,
  value,
  onApply,
}: PropertyTypeModalProps) {
  const [propertyType, setPropertyType] = useState(value);

  useEffect(() => {
    if (visible) {
      setPropertyType(value);
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

          <View className="flex-row-reverse gap-3">
            <Pressable
              onPress={() => {
                setPropertyType((currentType) =>
                  currentType === "sale" ? null : "sale",
                );
              }}
              className="items-center justify-center flex-1 py-4 border rounded-2xl"
              style={{
                borderColor: propertyType === "sale" ? "#1e40af" : "#E5E7EB",
                backgroundColor:
                  propertyType === "sale" ? "#dbeafe" : "#ffffff",
              }}
            >
              <Text className="text-base font-bold text-[#0F113C]">للبيع</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                setPropertyType((currentType) =>
                  currentType === "rent" ? null : "rent",
                )
              }
              className="items-center justify-center flex-1 py-4 border rounded-2xl"
              style={{
                borderColor: propertyType === "rent" ? "#1e40af" : "#E5E7EB",
                backgroundColor:
                  propertyType === "rent" ? "#dbeafe" : "#ffffff",
              }}
            >
              <Text className="text-base font-bold text-[#0F113C]">
                للإيجار
              </Text>
            </Pressable>
          </View>
          <Pressable
            onPress={() => onApply(propertyType)}
            className="items-center justify-center py-3.5 rounded-xl bg-[#0F113C]"
          >
            <Text className="text-base font-bold text-white">تطبيق</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
