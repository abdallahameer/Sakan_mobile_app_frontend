import { useState } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { TextInput as RNTextInput, Text, View } from "react-native";

type BaseProps = {
  label?: string;
  placeholder?: string;
  error?: string;
  suffix?: string; // e.g. "جنيه", "م²" — shown after the value, inside the box
  editable?: boolean;
  containerClassName?: string;
};

type UncontrolledProps = BaseProps & {
  value: string;
  onChangeText: (text: string) => void;
  control?: undefined;
  name?: undefined;
};

type ControlledProps<TFieldValues extends FieldValues> = BaseProps & {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  value?: undefined;
  onChangeText?: undefined;
};

export type AppNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
> = UncontrolledProps | ControlledProps<TFieldValues>;

// Strips everything except digits, so the field can never hold non-numeric text.
function sanitizeDigits(text: string) {
  return text.replace(/[^0-9]/g, "");
}

export default function AppNumberInput<TFieldValues extends FieldValues>(
  props: AppNumberInputProps<TFieldValues>,
) {
  const {
    label,
    placeholder,
    error,
    suffix,
    editable = true,
    containerClassName = "",
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const borderColor = error ? "#EF4444" : "#0F113C";

  return (
    <View className={`gap-2 ${containerClassName}`}>
      {label && (
        <Text className="text-base font-semibold text-left text-[#0F113C]">
          {label}
        </Text>
      )}

      <View
        className="flex-row-reverse items-center px-3.5 border rounded-xl"
        style={{
          borderColor,
          backgroundColor: editable ? "#ffffff" : "#F3F4F6",
        }}
      >
        {"control" in props && props.control ? (
          <Controller
            control={props.control}
            name={props.name}
            render={({ field: { value, onChange } }) => (
              <RNTextInput
                value={value ?? ""}
                onChangeText={(text) => onChange(sanitizeDigits(text))}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                editable={editable}
                textAlign="right"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 py-3.5 text-[#0F113C]"
              />
            )}
          />
        ) : (
          <RNTextInput
            value={"value" in props ? props.value : ""}
            onChangeText={(text) => {
              if ("onChangeText" in props && props.onChangeText) {
                props.onChangeText(sanitizeDigits(text));
              }
            }}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            editable={editable}
            textAlign="right"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 py-3.5 text-[#0F113C]"
          />
        )}

        {suffix && (
          <Text className="mr-2 text-sm font-semibold text-[#6B7280]">
            {suffix}
          </Text>
        )}
      </View>

      {error && (
        <Text className="text-xs text-right text-[#EF4444]">{error}</Text>
      )}
    </View>
  );
}
