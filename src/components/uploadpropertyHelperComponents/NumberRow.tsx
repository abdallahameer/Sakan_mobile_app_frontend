import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

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
  const { colors } = useTheme();
  return (
    <View className="flex-row-reverse items-center h-[54px] px-4 border-b border-[#E5E5E8] dark:border-[#36384D]">
      <Text className="flex-1 text-sm font-semibold text-right text-[#303030] dark:text-[#D1D5DB]">
        {label}
      </Text>

      <View className="flex-col items-center justify-center w-12 ">
        <Pressable
          onPress={onPlus}
          className="items-center justify-center w-7 h-7"
        >
          <Ionicons name="caret-up" size={22} color={colors.text} />
        </Pressable>

        <Text className="absolute text-sm font-semibold text-[#0F113C] dark:text-[#F3F4F6]">
          {value}
        </Text>

        <Pressable
          onPress={onMinus}
          className="items-center justify-center w-7 h-7"
        >
          <Ionicons name="caret-down" size={22} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}
