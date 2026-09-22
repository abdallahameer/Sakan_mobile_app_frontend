import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";
import { Text, View } from "react-native";
import PhoneInput, { ICountry } from "rn-international-phone-number";

type PhoneNumberInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  setValue?: UseFormSetValue<T>;
  countryFieldName?: Path<T>;
  label?: string;
  error?: string;
  defaultCountry?: ICountry["cca2"];
};

export default function PhoneNumberInput<T extends FieldValues>({
  control,
  setValue,
  countryFieldName,
  name,
  label = "رقم الهاتف",
  error,
  defaultCountry = "SD",
}: PhoneNumberInputProps<T>) {
  return (
    <View className="w-full">
      {label && (
        <Text className="mb-2 text-left text-base font-bold  text-[#0F113C]">
          {label}*
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
                if (setValue && countryFieldName) {
                  setValue(
                    countryFieldName,
                    country.idd.root as PathValue<T, Path<T>>,
                  );
                }
              }}
              language="ar"
              rtl
              phoneInputPlaceholderTextColor="#9CA3AF"
              phoneInputSelectionColor="#0F113C"
              placeholder="أدخل رقم الهاتف"
              phoneInputStyles={{
                container: {
                  borderWidth: 1,
                  borderColor: error ? "#EF4444" : "#E5E7EB",
                  borderRadius: 12,
                  backgroundColor: "#FFFFFF",
                  height: 52,
                },
                flagContainer: {
                  backgroundColor: "#FFFFFF",
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                },
                flag: {
                  width: 28,
                  height: 20,
                },
                divider: {
                  backgroundColor: "#E5E7EB",
                },
                callingCode: {
                  color: "#0F113C",
                  fontSize: 15,
                },
                input: {
                  color: "#0F113C",
                  fontSize: 16,
                  textAlign: "right",
                },
              }}
            />
          );
        }}
      />

      {error && (
        <Text className="mt-1 text-right text-xs text-red-500">{error}</Text>
      )}
    </View>
  );
}
