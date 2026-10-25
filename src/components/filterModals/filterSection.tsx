import { Text, View } from "react-native";

export default function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="pb-6 mb-6 border-b border-[#E5E7EB]">
      <Text className="mb-4 text-lg font-bold text-[#0F113C] text-left">
        {title}
      </Text>

      {children}
    </View>
  );
}
