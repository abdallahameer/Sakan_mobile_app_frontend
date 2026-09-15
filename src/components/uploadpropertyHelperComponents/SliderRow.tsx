import Slider from "@react-native-community/slider";
import { Text, View } from "react-native";

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
  return (
    <View className="flex-row-reverse items-center h-[58px] px-4 border-b border-[#E5E5E8]">
      {/* Label */}
      <Text className="w-[34%] text-sm font-semibold text-right text-[#303030]">
        {label}
      </Text>

      {/* Slider */}
      <View className="flex-1 px-2">
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={min}
          maximumValue={max}
          value={value}
          step={1}
          onValueChange={onChange}
          thumbSize={22}
          minimumTrackTintColor="#0F113C"
          maximumTrackTintColor="gray"
          thumbTintColor="#0F113C"
        />
      </View>

      {/* Value */}
      <Text className="text-sm font-semibold text-[#0F113C] w-7">{value}</Text>
    </View>
  );
}
