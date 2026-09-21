import { useState } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import {
  KeyboardTypeOptions,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  View,
} from "react-native";

type BaseProps = {
  label?: string;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
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

export type AppTextInputProps<TFieldValues extends FieldValues = FieldValues> =
  | UncontrolledProps
  | ControlledProps<TFieldValues>;

export default function AppTextInput<TFieldValues extends FieldValues>(
  props: AppTextInputProps<TFieldValues>,
) {
  const {
    label,
    placeholder,
    error,
    multiline = false,
    secureTextEntry = false,
    keyboardType = "default",
    editable = true,
    containerClassName = "",
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error ? "#EF4444" : "#0F113C";

  const sharedInputProps: RNTextInputProps = {
    placeholder,
    placeholderTextColor: "#9CA3AF",
    multiline,
    secureTextEntry,
    keyboardType,
    editable,
    textAlign: "right",
    textAlignVertical: multiline ? "top" : "center",
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    className: `px-3.5 text-[#0F113C] ${
      multiline ? "py-3.5 min-h-[120px]" : "py-3.5"
    }`,
  };

  return (
    <View className={`gap-2 ${containerClassName}`}>
      {label && (
        <Text className="text-base font-semibold text-left text-[#0F113C]">
          {label}
        </Text>
      )}

      <View
        className="border rounded-xl"
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
                {...sharedInputProps}
                value={value ?? ""}
                onChangeText={onChange}
              />
            )}
          />
        ) : (
          <RNTextInput
            {...sharedInputProps}
            value={"value" in props ? props.value : ""}
            onChangeText={
              "onChangeText" in props ? props.onChangeText : undefined
            }
          />
        )}
      </View>

      {error && (
        <Text className="text-xs text-left text-[#EF4444]">{error}</Text>
      )}
    </View>
  );
}
