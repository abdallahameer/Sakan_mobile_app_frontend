import { Pressable, Text, View } from "react-native";

export default function ToggleRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean | undefined;
  onChange: (value: boolean) => void;
}) {
  return (
    <View className="flex-row-reverse items-center justify-between h-[54px] px-4 border-b border-[#E5E5E8] dark:border-[#36384D]">
      <Text className="text-sm font-semibold text-[#303030] dark:text-[#D1D5DB]">{label}</Text>

      <Pressable
        onPress={() => onChange(!value)}
        className={`justify-center w-[52px] h-[30px] rounded-full px-1 ${
          value ? "bg-[#0F113C] dark:bg-[#2D3158]" : "bg-[#E5E5E8] dark:bg-[#36384D]"
        }`}
      >
        <View
          className={`w-[24px] h-[24px] bg-white rounded-full ${
            value ? "self-start" : "self-end"
          }`}
        />
      </Pressable>
    </View>
  );
}
