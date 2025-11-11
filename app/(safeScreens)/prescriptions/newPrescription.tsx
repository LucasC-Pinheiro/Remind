import ButtonComponent from "@/src/components/button";
import InputComponent from "@/src/components/input";

import { ArrowLeft, Plus } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";

export default function NewPrescription(){
  const [remedio, setRemedio] = useState("");
  const [horario, setHorario] = useState("");
  const [recorrencia, setRecorrencia] = useState("");
  const [tomarAgora, setTomarAgora] = useState(false);

  return(
    <View 
      className="flex-1 bg-[#F8FAFB]"
    >
      {/* Botão de voltar no canto superior esquerdo */}
      <View
        className="absolute mb-2 left-[10%] w-[80%] bottom-[70%] z-10"
      >
        <TouchableOpacity
        className="mb-8"
        onPress={() => router.back()}
        >
          <ArrowLeft 
            size={26} 
            color="#293C4C" 
          />
        </TouchableOpacity>
        <Text
          className="text-2xl font-bold text-[#C02636]"
        >Novas receitas
        </Text>
        <Text
          className="mt-1 text-base text-[#293C4C] "
        >Adicione a sua prescrição médica para receber 
         lembretes de quando tomar seu medicamento
        </Text>
      </View>

      {/* Inputs centralizados no meio da tela - NÃO alterar o cabeçalho acima */}
      <View className="flex-1 mt-32 justify-center items-center">

        <View className="w-[80%] mb-6">
          <Text className="mb-2 text-sm text-[#293C4C]">Remédio</Text>
          <InputComponent
            placeholder="Nome do medicamento"
            placeholderTextColor="#8A98A7"
            value={remedio}
            onChangeText={setRemedio}
            className="w-full h-12"
          />
        </View>

        <View className="w-[80%] mb-6">
          <Text className="mb-2 text-sm text-[#293C4C]">Horário</Text>
          <InputComponent
            placeholder="00:00"
            placeholderTextColor="#8A98A7"
            value={horario}
            onChangeText={(t) => setHorario(t.replace(/[^0-9:]/g, ""))}
            className="w-full h-12"
          />
        </View>

        <View className="w-[80%] mb-4">
          <Text className="mb-2 text-sm text-[#293C4C]">Recorrência</Text>
          <InputComponent
            placeholder="Selecione"
            placeholderTextColor="#8A98A7"
            value={recorrencia}
            onChangeText={setRecorrencia}
            className="w-full h-12"
          />
        </View>

        <View className="w-[80%] mt-4 flex-row items-center">
          <TouchableOpacity
            onPress={() => setTomarAgora(v => !v)}
            className={`w-6 h-6 rounded-md mr-2 items-center justify-center ${tomarAgora ? 'bg-[#C02636] border-[#C02636]' : 'border border-[#A2B9CD]'}`}
          >
            {tomarAgora && <Text className="text-white text-xs">✓</Text>}
          </TouchableOpacity>
            <Text className="text-[#293C4C]">Tomar agora</Text>
          </View>
        </View>

        <View className="justify-end items-center">
          <ButtonComponent 
            className="w-[80%] h-16 mb-14 items-center justify-center flex-row"
          >
          <Plus 
            size={24}
            color="#F8FAFB"
          />
          <Text
            className="text-[#F8FAFB] ml-2 text-lg font-bold"
          >Adicionar</Text>
        </ButtonComponent>
      </View>
    </View>
  );
}