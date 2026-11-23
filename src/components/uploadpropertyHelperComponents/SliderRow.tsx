import Slider from "@react-native-community/slider";
import { Text, View } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

export default function SliderRow({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const { isDarkMode, colors } = useTheme();
  return (
    <View className="flex-row-reverse items-center h-[58px] px-4 border-b border-[#E5E5E8] dark:border-[#36384D]">
      <Text className="w-[34%] text-sm font-semibold text-right text-[#303030] dark:text-[#D1D5DB]">
        {label}
      </Text>

      <View className="flex-1 px-2">
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={min}
          maximumValue={max}
          value={value}
          step={1}
          onValueChange={onChange}
          thumbSize={22}
          minimumTrackTintColor={isDarkMode ? colors.accent : colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={isDarkMode ? "#F3F4F6" : colors.primary}
        />
      </View>

      <Text className="text-sm font-semibold text-[#0F113C] dark:text-[#F3F4F6] w-7">{value}</Text>
    </View>
  );
}
