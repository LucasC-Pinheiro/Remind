import React from 'react';
import { TextInput, View } from 'react-native';

interface InputComponentProps {
  placeholder?: string;
  placeholderTextColor?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean; /* Util para senhas*/
  children?: React.ReactNode;
  onChange?: () => void;
  className?: string;
};

export default function InputComponent({ placeholder, placeholderTextColor, value, onChangeText, secureTextEntry, children,className }: InputComponentProps) {
  return (
    <View className={`w-full relative ${className}`}>
      <TextInput
        className={`
          w-[100%]
          h-14
          mx-auto
          border 
          border-[#A2B9CD] 
          rounded-lg 
          p-4 
          pr-12 /*Para o icone*/
          `}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || "#293C4C"}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {children}
    </View>
  );
}