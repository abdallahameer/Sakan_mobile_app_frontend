import { UploadFormFields } from "@/types";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";
import { Text, View } from "react-native";
import PhoneInput, { ICountry } from "rn-international-phone-number";
import { useTheme } from "@/theme/ThemeProvider";

type PhoneNumberInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  setValue?: UseFormSetValue<UploadFormFields>;
  countryKeyField?: "phoneKey" | "whatsAppKey";
  label?: string;
  required?: boolean;
  error?: string;
  defaultCountry?: ICountry["cca2"];
};

export default function PhoneNumberInput<T extends FieldValues>({
  control,
  setValue,
  countryKeyField,
  name,
  label = "رقم الهاتف",
  required = true,
  error,
  defaultCountry = "SD",
}: PhoneNumberInputProps<T>) {
  const { colors } = useTheme();
  return (
    <View className="w-full">
      {label && (
        <Text className="mb-2 text-left text-base font-bold text-[#0F113C] dark:text-[#F3F4F6]">
          {label}
          {required ? "*" : ""}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          return (
            <PhoneInput
              value={value ?? ""}
              onChangePhoneNumber={onChange}
              defaultCountry={defaultCountry}
              onChangeCountry={(country) => {
                if (setValue && countryKeyField) {
                  setValue(countryKeyField, country.idd.root);
                }
              }}
              language="ar"
              rtl
              phoneInputPlaceholderTextColor="#9CA3AF"
              phoneInputSelectionColor={colors.primary}
              placeholder="أدخل رقم الهاتف"
              phoneInputStyles={{
                container: {
                  borderWidth: 1,
                  borderColor: error ? "#EF4444" : colors.border,
                  borderRadius: 12,
                  backgroundColor: colors.surface,
                  height: 52,
                },
                flagContainer: {
                  backgroundColor: colors.surface,
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                },
                flag: {
                  width: 28,
                  height: 20,
                },
                divider: {
                  backgroundColor: colors.border,
                },
                callingCode: {
                  color: colors.text,
                  fontSize: 15,
                },
                input: {
                  color: colors.text,
                  fontSize: 16,
                  textAlign: "right",
                },
              }}
            />
          );
        }}
      />

      {error && (
        <Text className="mt-1 text-xs text-right text-red-500">{error}</Text>
      )}
    </View>
  );
}
