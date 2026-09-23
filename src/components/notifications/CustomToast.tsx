import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type ToastProps = {
  text1?: string;
  text2?: string;
  type?: "success" | "error" | "warning" | "info";
  hide?: () => void;
};

const CONFIG = {
  success: {
    icon: "checkmark-circle" as keyof typeof Ionicons.glyphMap,
    iconColor: "#0F113C",
    backgroundClassName: "bg-[#0F113C] border-[#0F113C]",
    textClassName: "text-white",
  },

  error: {
    icon: "close-circle" as keyof typeof Ionicons.glyphMap,
    iconColor: "#991B1B",
    backgroundClassName: "bg-red-300 border-red-300/30",
    textClassName: "text-[#0F113C]",
  },

  warning: {
    icon: "warning" as keyof typeof Ionicons.glyphMap,
    iconColor: "#92400E",
    backgroundClassName: "bg-yellow-300 border-yellow-300/30",
    textClassName: "text-[#0F113C]",
  },

  info: {
    icon: "information-circle" as keyof typeof Ionicons.glyphMap,
    iconColor: "#1E40AF",
    backgroundClassName: "bg-blue-300 border-blue-300/30",
    textClassName: "text-[#0F113C]",
  },
};

export default function CustomToast({
  text1,
  text2,
  type = "success",
  hide,
}: ToastProps) {
  const config = CONFIG[type];

  return (
    <View
      className={`w-[92%] min-h-[72px] flex-row items-center justify-between rounded-[18px] border px-3.5 py-3 shadow-lg elevation-8 ${config.backgroundClassName}`}
    >
      <View className="flex-row items-center gap-2 max-w-[70%] justify-start  ">
        {/* Icon */}
        <View className="mr-0 ml-3 h-11 w-11 items-center justify-center rounded-full bg-white">
          <Ionicons name={config.icon} size={25} color={config.iconColor} />
        </View>

        {/* Text */}
        <View className="flex-1 flex-col   items-start">
          {!!text1 && (
            <Text
              numberOfLines={1}
              className={`text-right text-[15px] font-bold ${config.textClassName}`}
            >
              {text1}
            </Text>
          )}

          {!!text2 && (
            <Text
              numberOfLines={2}
              className={`mt-0.5 text-right text-[13px] leading-[19px] ${config.textClassName}`}
            >
              {text2}
            </Text>
          )}
        </View>
      </View>

      {/* Close */}
      <Pressable
        onPress={hide}
        hitSlop={10}
        className="mr-2 h-7 w-7 items-center justify-center"
      >
        <Ionicons
          name="close"
          size={19}
          color={type === "success" ? "#FFFFFF" : "#0F113C"}
        />
      </Pressable>
    </View>
  );
}
