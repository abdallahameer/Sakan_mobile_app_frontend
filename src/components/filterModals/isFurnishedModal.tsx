import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

type PropertyType = "furnished" | "unfurnished" | null;

type ResidentialorCommercialProps = {
  visible: boolean;
  onClose: () => void;
  value: PropertyType;
  onApply: (type: PropertyType) => void;
};

export default function IsFurnishedModal({
  visible,
  onClose,
  value,
  onApply,
}: ResidentialorCommercialProps) {
  const [isFurnished, setIsFurnished] = useState(value);

  useEffect(() => {
    if (visible) {
      setIsFurnished(value);
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
                setIsFurnished((currentValue) =>
                  currentValue === "furnished" ? null : "furnished",
                )
              }
              className="items-center justify-center flex-1 py-4 border rounded-2xl"
              style={{
                borderColor:
                  isFurnished === "furnished" ? "#1e40af" : "#E5E7EB",
                backgroundColor:
                  isFurnished === "furnished" ? "#dbeafe" : "#ffffff",
              }}
            >
              <Text className="text-base font-bold text-[#0F113C]">مفروش</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                setIsFurnished((currentValue) =>
                  currentValue === "unfurnished" ? null : "unfurnished",
                )
              }
              className="items-center justify-center flex-1 py-4 border rounded-2xl"
              style={{
                borderColor:
                  isFurnished === "unfurnished" ? "#1e40af" : "#E5E7EB",
                backgroundColor:
                  isFurnished === "unfurnished" ? "#dbeafe" : "#ffffff",
              }}
            >
              <Text className="text-base font-bold text-[#0F113C]">
                غير مفروش
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => onApply(isFurnished)}
            className="items-center justify-center py-3.5 rounded-xl bg-[#0F113C]"
          >
            <Text className="text-base font-bold text-white">تطبيق</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
