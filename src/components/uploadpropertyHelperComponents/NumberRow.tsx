import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function NumberRow({
  label,
  value,
  onMinus,
  onPlus,
}: {
  label: string;
  value: number | undefined;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <View className="flex-row-reverse items-center h-[54px] px-4 border-b border-[#E5E5E8]">
      <Text className="flex-1 text-sm font-semibold text-right text-[#303030]">
        {label}
      </Text>

      <View className="flex-col items-center justify-center w-12 ">
        <Pressable
          onPress={onPlus}
          className="items-center justify-center w-7 h-7"
        >
          <Ionicons name="caret-up" size={22} color="#0F113C" />
        </Pressable>

        <Text className="absolute text-sm font-semibold text-[#0F113C]">
          {value}
        </Text>

        <Pressable
          onPress={onMinus}
          className="items-center justify-center w-7 h-7"
        >
          <Ionicons name="caret-down" size={22} color="#0F113C" />
        </Pressable>
      </View>
    </View>
  );
}
