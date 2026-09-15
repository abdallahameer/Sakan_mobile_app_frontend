import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  primary: "#0F113C",
  accent: "#10B981",
  white: "#ffffff",
  textGray: "#6B7280",
  border: "#E5E7EB",
  lightBg: "#F8F9FA",
};

type Language = "ar" | "en";

const LANGUAGES: { key: Language; label: string }[] = [
  { key: "ar", label: "العربية" },
  { key: "en", label: "English" },
];

export default function LanguageAndTheme() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>("ar");

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 w-full border-b border-[#E5E7EB]">
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-forward" size={22} color="#0F113C" />
        </Pressable>

        <View className="flex-row items-center justify-start w-[60%]">
          <Text className="text-lg font-bold text-[#0F113C]">
            اللغة و المظهر
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 24 }}>
        {/* Theme section */}
        <View style={{ gap: 8 }}>
          <Text
            className="text-sm font-semibold text-left"
            style={{ color: COLORS.textGray }}
          >
            المظهر
          </Text>

          <View
            className="overflow-hidden bg-white border rounded-2xl"
            style={{ borderColor: COLORS.border }}
          >
            <View className="flex-row items-center justify-between px-4 py-4">
              <Text
                className="text-base font-semibold"
                style={{ color: COLORS.primary }}
              >
                الوضع الفاتح
              </Text>
              <Switch
                value={!isDarkMode}
                onValueChange={(value) => setIsDarkMode(!value)}
                trackColor={{
                  false: COLORS.border,
                  true: `${COLORS.accent}55`,
                }}
                thumbColor={!isDarkMode ? COLORS.accent : COLORS.white}
              />
            </View>

            <View style={{ height: 1, backgroundColor: COLORS.border }} />

            <View className="flex-row items-center justify-between px-4 py-4">
              <Text
                className="text-base font-semibold"
                style={{ color: COLORS.primary }}
              >
                الوضع الداكن
              </Text>
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{
                  false: COLORS.border,
                  true: `${COLORS.accent}55`,
                }}
                thumbColor={isDarkMode ? COLORS.accent : COLORS.white}
              />
            </View>
          </View>
        </View>

        {/* Language section */}
        <View style={{ gap: 8 }}>
          <Text
            className="text-sm font-semibold text-left"
            style={{ color: COLORS.textGray }}
          >
            اللغة
          </Text>

          <View
            className="overflow-hidden bg-white border rounded-2xl"
            style={{ borderColor: COLORS.border }}
          >
            {LANGUAGES.map((lang, index) => {
              const isSelected = language === lang.key;
              return (
                <View key={lang.key}>
                  <Pressable
                    onPress={() => setLanguage(lang.key)}
                    className="flex-row items-center justify-between px-4 py-4"
                  >
                    <Text
                      className="text-base font-semibold"
                      style={{ color: COLORS.primary }}
                    >
                      {lang.label}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={COLORS.accent}
                      />
                    )}
                  </Pressable>
                  {index < LANGUAGES.length - 1 && (
                    <View
                      style={{ height: 1, backgroundColor: COLORS.border }}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
