import { Text, View } from "moti";
import { useRef, useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import tw from '../../lib/tailwind'

interface FlyInputProps extends TextInputProps {
  placeholder?: string;
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad" | "decimal-pad";
  secureTextEntry?: boolean;
  maxLines?: number;
  maxHeight?: number;
}


export default function FlyInput({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  keyboardType = "default",
  secureTextEntry = false,
  maxLines = 5,
  maxHeight = 100,
  ...rest
}: FlyInputProps) {
  const textInputRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View
      style={tw.style(
        "flex-row",
        "h-13 items-center bg-white rounded p-4 mb-4 shadow-sm",
        {
          "shadow-blue": isFocused,
          "shadow-red-400": !!error && !isFocused,
        }
      )}
    >
      <Text
        style={tw.style(
          error && "text-red-400",
          "font-medium text-[16px] text-[#403f42]"
        )}
      >
        {label}
      </Text>
      <TextInput
        ref={textInputRef}
        style={tw`flex-1 text-[16px] ml-3`}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {error && <Text style={tw`my-2 text-red-600 text-sm`}>{error}</Text>}
    </View>
  );
}