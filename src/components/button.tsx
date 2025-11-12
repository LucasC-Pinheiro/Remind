import { TouchableOpacity } from "react-native";

interface ButtonComponentProps {
  className?: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

export default function ButtonComponent({ className, onPress, children }: ButtonComponentProps){
  return (
    <TouchableOpacity
    onPress={onPress}
    className={`bg-[#C02636] rounded-full p-4 ${className}`}
    >
      {children}
    </TouchableOpacity>
  );
}

/*
  TODOs / OBSERVAÇÕES para manutenção:
  - Expor props `disabled` e `loading` para lidar com estados assíncronos e reduzir lógica duplicada na aplicação.
  - Adicionar `accessibilityRole="button"` e `accessibilityState` para `disabled` para melhorar a acessibilidade.
  - Adicionar testes unitários / snapshot para os diferentes estados (default, disabled, loading).
  - Considerar o uso de tokens de tema tipados em vez de cores hard-coded para melhor manutenção.
*/