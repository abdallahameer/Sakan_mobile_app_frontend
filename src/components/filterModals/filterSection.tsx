import { Text, View } from "react-native";

export default function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="pb-6 mb-6 border-b border-[#E5E7EB] dark:border-[#36384D]">
      <Text className="mb-4 text-lg font-bold text-[#0F113C] text-left dark:text-[#F3F4F6]">
        {title}
      </Text>

      {children}
    </View>
  );
}
