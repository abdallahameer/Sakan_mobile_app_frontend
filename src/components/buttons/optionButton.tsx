import { Pressable, Text } from "react-native";

export default function OptionButton({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="items-center justify-center flex-1 py-4 border rounded-2xl"
      style={{
        borderColor: selected ? "#1e40af" : "#E5E7EB",
        backgroundColor: selected ? "#dbeafe" : "#ffffff",
      }}
    >
      <Text className="text-base font-bold text-[#0F113C]">{label}</Text>
    </Pressable>
  );
}
