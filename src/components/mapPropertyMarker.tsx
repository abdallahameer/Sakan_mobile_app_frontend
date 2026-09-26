import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

const COLORS = {
  accent: "#10B981",
  white: "#FFFFFF",
} as const;

export default function MapPropertyMarker() {
  return (
    <View pointerEvents="none" className="items-center">
      <View className="flex-row items-center justify-center px-2.5 py-1.5 bg-[#0F113C] border-2 border-white rounded-full shadow-md shadow-black/25">
        <Ionicons name="home" size={14} color={COLORS.white} />
      </View>

      <View className="w-0 h-0 -mt-0.5 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#ffffff]" />
    </View>
  );
}
