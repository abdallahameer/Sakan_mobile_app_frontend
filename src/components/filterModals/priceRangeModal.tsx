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

export default function PriceRangeModal({
  visible,
  min,
  max,
  onClose,
  onApply,
}: PriceRangeModalProps) {
  const [minVal, setMinVal] = useState(min ?? "");
  const [maxVal, setMaxVal] = useState(max ?? "");
  const inSet = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      setMinVal(min ?? "");
      setMaxVal(max ?? "");
    }
  }, [visible, min, max]);

  const handleApply = () => {
    if (maxVal < minVal) {
      Toast.show({
        type: "error",
        text1: "خطئ إدخال",
        text2: "أقصى سعر يجب أن تكون أكبر من أو تساوي أقل سعر",
      });
      return;
    }
    onApply(minVal, maxVal);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView className="flex-1" behavior="padding">
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
                value={minVal}
                onChangeText={setMinVal}
                placeholder="أقل سعر"
                suffix="ج.م"
                label="من"
                containerClassName="w-[50%]"
              />

              <AppNumberInput
                value={maxVal}
                onChangeText={setMaxVal}
                placeholder="أعلى سعر"
                suffix="ج.م"
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
