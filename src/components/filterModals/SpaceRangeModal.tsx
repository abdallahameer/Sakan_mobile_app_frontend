import type { FilterText } from "@/types";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import AppNumberInput from "../InputsComponents/Appnumberinput";

type PriceRangeModalProps = {
  visible: boolean;
  min: FilterText;
  max: FilterText;
  onClose: () => void;
  onApply: (min: FilterText, max: FilterText) => void;
};

export default function SpaceRangeModal({
  visible,
  min,
  max,
  onClose,
  onApply,
}: PriceRangeModalProps) {
  const [minSpace, setMinSpace] = useState(min ?? "");
  const [maxSpace, setMaxSpace] = useState(max ?? "");
  const inSet = useSafeAreaInsets();

  const handleApply = () => {
    if (maxSpace < minSpace) {
      Toast.show({
        type: "error",
        text1: "خطئ إدخال",
        text2: "أقصى مساحة يجب أن تكون أكبر من أو تساوي أقل مساحة",
      });
      return;
    }
    onApply(minSpace, maxSpace);
    onClose();
  };

  useEffect(() => {
    if (visible) {
      setMinSpace(min ?? "");
      setMaxSpace(max ?? "");
    }
  }, [visible, min, max]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView className="flex-1 " behavior="padding">
        <Pressable onPress={onClose} className="justify-end flex-1 bg-black/40">
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="px-5 pt-3 bg-white rounded-t-3xl"
            style={{ paddingBottom: inSet.bottom + 16 }}
          >
            <View className="items-center mb-5">
              <View className="w-10 h-1.5 rounded-full bg-[#E5E7EB]" />
            </View>

            <View className="flex-row w-full gap-2">
              <AppNumberInput
                value={minSpace}
                onChangeText={setMinSpace}
                placeholder="أقل مساحة"
                suffix="م.م"
                label="من"
                containerClassName="w-[50%]"
              />

              <AppNumberInput
                value={maxSpace}
                onChangeText={setMaxSpace}
                placeholder="أعلى مساحة"
                suffix="م.م"
                label="الى"
                containerClassName="w-[50%]"
              />
            </View>

            <Pressable
              onPress={() => {
                onApply(null, null);
                onClose();
              }}
              className="items-center self-start px-4 py-2 mt-4 border rounded-xl border-[#E5E7EB]"
            >
              <Text className="text-base font-bold text-[#0F113C]">الكل</Text>
            </Pressable>

            <Pressable
              onPress={handleApply}
              className="items-center justify-center py-3.5 mt-7 rounded-xl bg-[#0F113C]"
            >
              <Text className="text-base font-bold text-white">تطبيق</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
