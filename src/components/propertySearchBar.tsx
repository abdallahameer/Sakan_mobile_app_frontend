import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

const COLORS = {
  primary: "#0F113C",
  accent: "#10B981",
  white: "#ffffff",
  placeholder: "#9CA3AF",
};

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
  const text = value !== undefined ? value : internalValue;
  const handleChange = onChangeText ?? setInternalValue;

  return (
    <View
      style={{
        flexDirection: "row-reverse",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderRadius: 16,
        paddingHorizontal: 14,
        height: 52,
        marginHorizontal: 12,
        marginTop: 8,
        marginBottom: 4,
        // Same soft-card shadow as the tune icon / advanced-filter card
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
    >
      <Ionicons name="search" size={20} color={COLORS.primary} />

      <TextInput
        value={text}
        onChangeText={handleChange}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        textAlign="right"
        returnKeyType="search"
        style={{
          flex: 1,
          marginHorizontal: 10,
          fontSize: 15,
          fontWeight: "500",
          color: COLORS.primary,
        }}
      />

      {text.length > 0 && (
        <TouchableOpacity
          onPress={() => handleChange("")}
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="close-circle" size={18} color={COLORS.placeholder} />
        </TouchableOpacity>
      )}
    </View>
  );
}
