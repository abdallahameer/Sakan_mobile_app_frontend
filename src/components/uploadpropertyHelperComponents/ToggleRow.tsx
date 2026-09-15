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
    <View className="flex-row-reverse items-center justify-between h-[54px] px-4 border-b border-[#E5E5E8]">
      <Text className="text-sm font-semibold text-[#303030]">{label}</Text>

      <Pressable
        onPress={() => onChange(!value)}
        className={`justify-center w-[52px] h-[30px] rounded-full px-1 ${
          value ? "bg-[#0F113C]" : "bg-[#E5E5E8]"
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
