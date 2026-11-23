import { Pressable, Text } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

export default function OptionButton({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const { isDarkMode, colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      className="items-center justify-center flex-1 py-4 border rounded-2xl"
      style={{
        borderColor: selected
          ? isDarkMode
            ? "#60A5FA"
            : "#1e40af"
          : colors.border,
        backgroundColor: selected
          ? isDarkMode
            ? "#1E3A5F"
            : "#dbeafe"
          : colors.surface,
      }}
    >
      <Text className="text-base font-bold text-[#0F113C] dark:text-[#F3F4F6]">
        {label}
      </Text>
    </Pressable>
  );
}
