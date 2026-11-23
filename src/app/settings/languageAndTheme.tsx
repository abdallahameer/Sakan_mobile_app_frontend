import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/ThemeProvider";

type Language = "ar" | "en";

const LANGUAGES: { key: Language; label: string }[] = [
  { key: "ar", label: "العربية" },
  { key: "en", label: "English" },
];

type LanguageAndThemeFormValues = {
  isDarkMode: boolean;
  language: Language;
};

export default function LanguageAndTheme() {
  const router = useRouter();
  const { isDarkMode, setDarkMode, colors } = useTheme();
  const { control } = useForm<LanguageAndThemeFormValues>({
    defaultValues: {
      isDarkMode,
      language: "ar",
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-[#F0F1FA] dark:bg-[#0B0D1D]">
      <View className="flex-row items-center justify-between px-4 py-4 w-full border-b border-[#E5E7EB] dark:border-[#36384D]">
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-forward" size={22} color={colors.text} />
        </Pressable>

        <View className="flex-row items-center justify-start w-[60%]">
          <Text className="text-lg font-bold text-[#0F113C] dark:text-[#F3F4F6]">
            اللغة و المظهر
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 24 }}>
        <View style={{ gap: 8 }}>
          <Text
            className="text-sm font-semibold text-left"
            style={{ color: colors.secondaryText }}
          >
            المظهر
          </Text>

          <Controller
            control={control}
            name="isDarkMode"
            render={({ field: { value, onChange } }) => (
              <View className="overflow-hidden bg-white border rounded-2xl dark:bg-[#17192D]" style={{ borderColor: colors.border }}>
                <View className="flex-row items-center justify-between px-4 py-4">
                  <Text
                    className="text-base font-semibold dark:text-[#F3F4F6]"
                    style={{ color: colors.text }}
                  >
                    الوضع الفاتح
                  </Text>
                  <Switch
                    value={!value}
                    onValueChange={async (nextValue) => {
                      onChange(!nextValue);
                      await setDarkMode(!nextValue);
                    }}
                    trackColor={{
                      false: colors.border,
                      true: `${colors.accent}55`,
                    }}
                    thumbColor={!value ? colors.accent : "#FFFFFF"}
                  />
                </View>

                <View style={{ height: 1, backgroundColor: colors.border }} />

                <View className="flex-row items-center justify-between px-4 py-4">
                  <Text
                    className="text-base font-semibold dark:text-[#F3F4F6]"
                    style={{ color: colors.text }}
                  >
                    الوضع الداكن
                  </Text>
                  <Switch
                    value={value}
                    onValueChange={async (nextValue) => {
                      onChange(nextValue);
                      await setDarkMode(nextValue);
                    }}
                    trackColor={{
                      false: colors.border,
                      true: `${colors.accent}55`,
                    }}
                    thumbColor={value ? colors.accent : "#FFFFFF"}
                  />
                </View>
              </View>
            )}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text
            className="text-sm font-semibold text-left"
            style={{ color: colors.secondaryText }}
          >
            اللغة
          </Text>

          <Controller
            control={control}
            name="language"
            render={({ field: { value, onChange } }) => (
              <View className="overflow-hidden bg-white border rounded-2xl dark:bg-[#17192D]" style={{ borderColor: colors.border }}>
                {LANGUAGES.map((lang, index) => {
                  const isSelected = value === lang.key;
                  return (
                    <View key={lang.key}>
                      <Pressable
                        onPress={() => onChange(lang.key)}
                        className="flex-row items-center justify-between px-4 py-4"
                      >
                        <Text
                          className="text-base font-semibold dark:text-[#F3F4F6]"
                          style={{ color: colors.text }}
                        >
                          {lang.label}
                        </Text>
                        {isSelected && (
                          <Ionicons
                            name="checkmark-circle"
                            size={20}
                            color={colors.accent}
                          />
                        )}
                      </Pressable>
                      {index < LANGUAGES.length - 1 && (
                        <View
                          style={{ height: 1, backgroundColor: colors.border }}
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
