import { Text, TouchableOpacity } from "react-native";

interface ButtonComponentProps {
  className?: string;
  onPress?: () => void;
}

export default function ButtonComponent({ className, onPress }: ButtonComponentProps){
  return (
    <TouchableOpacity
    onPress={onPress}
    className={`bg-[#C02636] rounded-full p-4 ${className}`}
    >
      <Text className="text-white font-bold line-height-16px">Entrar</Text>
    </TouchableOpacity>
  );
}