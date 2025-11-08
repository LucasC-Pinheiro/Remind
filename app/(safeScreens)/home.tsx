import { ChevronRight, LogOut } from "lucide-react-native";
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
  
import { router } from 'expo-router';

export default function HomeScreen(){
  return (
    <View className="flex-1 bg-[#D7E1EA]">
      {/* Header: foto + saudação — posicionado levemente abaixo do topo, com espaçamento e boa hierarquia visual */}
      <View
        className="w-full items-end pt-12 pr-6"
        >
        <TouchableOpacity
          className="p-2"
          onPress={() => router.replace('/(auth)/signUp')}
          >
            <LogOut color="#C02636" size={24} />
        </TouchableOpacity>
      </View>
      <View 
        className="
        absolute 
        top-16 
        left-6 
        right-6 
        flex-col">
        <Image
          source={{ uri: "https://github.com/LucasC-Pinheiro.png" }}
          className="
          w-24 
          h-24 
          rounded-full 
          border-2 
          border-[#334FDC]
          shadow-lg 
          mb-4"
          accessibilityLabel="Foto do usuário Lucas Pinheiro"
          accessible={true}
        />
        <View className="ml-4">
          <Text className="text-sm font-light text-[#293C4C]">Boas-vindas</Text>
          <Text className="text-2xl font-extrabold text-[#17222B]">Lucas Pinheiro</Text>
        </View>
      </View>

      {/* Container principal — deixa espaço no topo para o header e tem cantos arredondados */}
      <View
        className="
        absolute 
        w-full 
        h-[75%] 
        bg-[#F8FAFB] 
        rounded-t-[30px] 
        p-5 
        bottom-0 
        items-center"
      >
        {/*Botoes de Receitas*/}
      <TouchableOpacity
        className="
          bg-[#E8EEF3]
          top-5
          w-[90%]
          h-28
          rounded-3xl
          p-4
          flex-row
          items-center
          active:opacity-80
        "
        accessibilityLabel="Minhas receitas - Acompanhe os medicamentos e gerencie lembretes"
        accessibilityRole="button"
        onPress={() => router.push("/(safeScreens)/prescriptions/myPrescriptions")}
      >
        <Image
          source={require("../../assets/images/Minhas Receitas.png")}
          className="w-20 h-20 rounded-2xl"
          accessibilityLabel="Ícone de receitas médicas"
        />
        <View className="flex-1 ml-4">
          <Text className="text-xl font-bold text-[#17222B] mb-1">
            Minhas receitas
          </Text>
          <Text className="text-sm text-[#293C4C] leading-5">
            Acompanhe os medicamentos e gerencie lembretes
          </Text>
        </View>
        <ChevronRight
          size={20}
          className="absolute top-6 right-4"
          color="#334FDC"
        />
      </TouchableOpacity>

      <View
      className="top-4"
      >
      {/* Botão Nova Receita */}
      <TouchableOpacity
        className="
          bg-[#E8EEF3]
          mt-4
          w-[90%]
          h-28
          rounded-3xl
          p-4
          flex-row
          items-center
          active:opacity-80
        "
        accessibilityLabel="Nova receita - Cadastre novos lembretes de receita"
        accessibilityRole="button"
      >
        <Image
          source={require("../../assets/images/Nova Receita.png")}
          className="w-20 h-20 rounded-2xl"
          accessibilityLabel="Ícone de nova receita"
        />
        <View className="flex-1 ml-4">
          <Text className="text-xl font-bold text-[#17222B] mb-1">
            Nova receita
          </Text>
          <Text className="text-sm text-[#293C4C] leading-5">
            Cadastre novos lembretes de receitas
          </Text>
        </View>
        <ChevronRight
          size={20}
          className="absolute top-6 right-4"
          color="#334FDC"
        />
      </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}