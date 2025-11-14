import { useReceitasStore } from "@/src/store/receitasStore";
import { router } from "expo-router";
import { ArrowLeft, Clock, Plus, Repeat, Trash2 } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function MyPrescriptions(){
  const receitas = useReceitasStore((state) => state.receitas);

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
        items-center
        justify-start"   
    >
      {/* Aqui ficará a lista de prescrições médicas cadastradas */}
      {receitas.length === 0 ? (
        <Text
        className="
        font-bold 
        text-lg 

        text-[#8A98A7]"
        >Nenhuma receita cadastrada ainda</Text>
      ) : (
        <ScrollView
          className="w-full rounded-2xl px-1"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {receitas.map((receita, index) => (
            <View 
              key={index}
              className="w-full bg-[#D7E1EA] rounded-lg p-4 mb-4 shadow-sm"
            >
              <TouchableOpacity
                className="absolute top-2 right-2"
                onPress={() => useReceitasStore.getState().removerReceita(index)}
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              >
                <Trash2 size={20} color="#C02636" />
              </TouchableOpacity>
              <Text className="text-lg font-bold text-[#293C4C]">{receita.remedio}</Text>
              <View className="mt-3 gap-3 flex-row items-center space-x-3">
                <View className="flex-row items-center bg-[#A2B9CD] rounded-full px-3 py-2 shadow-sm">
                  <Clock size={16} color="#4D708F" />
                  <Text className="text-sm text-[#17222B] ml-2">{receita.horario}</Text>
                </View>

                <View className="flex-row items-center bg-[#A2B9CD] rounded-full px-3 py-2 shadow-sm">
                  <Repeat size={16} color="#4D708F" />
                  <Text className="text-sm text-[#17222B] ml-2">Recorrência: {receita.recorrencia}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
    </>
  );
}