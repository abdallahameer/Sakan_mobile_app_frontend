import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

type SearchBarProps = {
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
};

export default function PropertySearchBar({
  value,
  onChangeText,
  onSubmit,
  placeholder = "ابحث عن عقار...",
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState("");
  const { colors } = useTheme();
  const text = value !== undefined ? value : internalValue;
  const handleChange = onChangeText ?? setInternalValue;

  return (
    <View className="flex-row-reverse items-center bg-white rounded-2xl px-[14px] h-[52px] mx-3 mt-2 mb-1 shadow-md dark:bg-[#17192D]">
      <Ionicons name="search" size={20} color={colors.text} />

      <TextInput
        value={text}
        onChangeText={handleChange}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        textAlign="right"
        returnKeyType="search"
        className="flex-1 mx-2.5 text-[15px] font-medium text-[#0F113C] dark:text-[#F3F4F6]"
      />

      {text.length > 0 && (
        <TouchableOpacity
          onPress={() => handleChange("")}
          className="w-6 h-6 rounded-full items-center justify-center"
        >
          <Ionicons name="close-circle" size={18} color="#9CA3AF" />
        </TouchableOpacity>
      )}
    </View>
  );
}
