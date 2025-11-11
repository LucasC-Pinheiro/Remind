import { router } from "expo-router";
import { ArrowLeft, Plus } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function MyPrescriptions(){
  return( 
    <>
    {/* Header: mantemos espaçamento superior para não ficar por detrás do status bar/notch */}
    <View 
        className="flex-1 bg-[#D7E1EA]"
    >

      {/*Colocar dois botoes, de voltar para Home e de adicionar receita(+)
      de adicionar receita ira levar para a tela de adicionar receita */}
      <View className="flex-row justify-between w-full items-start pt-24 pl-8">
        <TouchableOpacity 
            className="p-3"
            onPress={() => router.back()}
          >
          <ArrowLeft 
            size={24} 
            color="#17222B" 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          className="p-3 right-8 rounded-full bg-[#334FDC]"
          onPress={() => router.push('/(safeScreens)/prescriptions/newPrescription')}
          >
          <Plus
            size={24}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>
      {/* Posiciona o título usando classes Tailwind arbitrárias (sem px)
         left-[5%] e bottom-[80%] usam percentuais — não há style inline */}
      <View
        className="absolute left-[10%] bottom-[75%] z-10 "
      >
        <Text
          className="font-bold text-2xl text-[#334FDC]"
        >Minhas receitas</Text>
        <Text
          className="mt-1 text-base text-[#17222B]"
        >
          Acompanhe seus medicamentos cadastrados e {"\n"}gerencie lembretes
        </Text>
      </View>
    </View>

    <View
        className="
        absolute 
        w-full 
        h-[70%] 
        bg-[#F8FAFB] 
        rounded-t-[30px] 
        p-5 
        bottom-0 
        items-center"   
    >

    </View>
    </>
  );
}