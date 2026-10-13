import AppTextInput from "@/components/InputsComponents/Apptextinput";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type EmailInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
};

export default function EmailInput<T extends FieldValues>({
  control,
  name,
}: EmailInputProps<T>) {
  return (
    <AppTextInput
      control={control}
      name={name}
      label="البريد الإلكتروني*"
      placeholder="أدخل بريدك الإلكتروني"
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      autoComplete="email"
      textContentType="emailAddress"
    />
  );
}
