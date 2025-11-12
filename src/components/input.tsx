import React from 'react';
import { KeyboardTypeOptions, TextInput, View } from 'react-native';

interface InputComponentProps {
  placeholder?: string;
  placeholderTextColor?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean; /* Util para senhas*/
  children?: React.ReactNode;
  onChange?: () => void;
  className?: string;
  inputClassName?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
};

export default function InputComponent({ placeholder, placeholderTextColor, value, onChangeText, secureTextEntry, children,className, keyboardType, maxLength }: InputComponentProps) {
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
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
      {children}
    </View>
  );
}

/*
  TODOs / OBSERVAÇÕES para manutenção:
  - Considere adicionar `keyboardType?: KeyboardTypeOptions` às props para controlar teclados numéricos.
  - Adicionar props de acessibilidade (accessibilityLabel, testID) para melhorar testabilidade e a11y.
  - Avaliar envolver com React.memo caso os props sejam estáveis, para otimização de render.
  - Adicionar testes unitários que verifiquem o comportamento de onChangeText e renderização do placeholder.
  - Se o design exigir ícones dentro do input, expor uma prop `rightIcon` em vez de usar children para API mais clara.
*/