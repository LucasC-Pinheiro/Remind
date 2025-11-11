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