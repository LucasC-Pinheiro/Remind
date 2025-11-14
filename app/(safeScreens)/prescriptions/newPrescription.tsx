import ButtonComponent from "@/src/components/button";
import InputComponent from "@/src/components/input";

import { scheduleReminder } from "@/src/services/notifications";
import { useReceitasStore } from "@/src/store/receitasStore";
import { router } from "expo-router";
import { ArrowLeft, Check, Plus } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AnimatedToast } from "@/src/components/animatedToast";

export default function NewPrescription() {
  const [remedio, setRemedio] = useState("");
  const [horario, setHorario] = useState("");
  const [recorrencia, setRecorrencia] = useState("");
  const [remedioError, setRemedioError] = useState("");
  const [horarioError, setHorarioError] = useState("");
  const [recorrenciaError, setRecorrenciaError] = useState("");
  const [tomarAgora, setTomarAgora] = useState(false);
  const [showRecurrenceOptions, setShowRecurrenceOptions] = useState(false);
  const recurrenceOptions = ["Diário", "Semanal", "Mensal"];

  const adicionarReceita = useReceitasStore((state) => state.adicionarReceita);

  // controla o tipo e a visibilidade do toast
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const handleAddPrescription = async () => {
    // reset de erros
    setRemedioError("");
    setHorarioError("");
    setRecorrenciaError("");

    let hasError = false;

    if (!remedio || !remedio.trim()) {
      setRemedioError("Campo obrigatório");
      hasError = true;
    }

    if (!recorrencia) {
      setRecorrenciaError("Campo obrigatório");
      hasError = true;
    }

    // valida horário
    const horarioDigits = horario.replace(/\D/g, "");
    if (horarioDigits.length !== 4) {
      setHorarioError("Informe 4 dígitos (HHMM)");
      hasError = true;
    } else {
      const hh = Number(horarioDigits.slice(0, 2));
      const mm = Number(horarioDigits.slice(2));
      if (Number.isNaN(hh) || Number.isNaN(mm) || hh > 23 || mm > 59) {
        setHorarioError("Horário inválido");
        hasError = true;
      }
    }

    if (hasError) {
      // mostra toast de erro
      setToastType("error");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2500);
      return;
    }

    // agenda notificação e captura id (pode ser null se permissão negada)
    let notificationId: string | null = null;
    try {
      notificationId = await scheduleReminder({ remedio, horario, recorrencia, tomarAgora });
    } catch (err) {
      console.warn("Falha ao agendar notificação:", err);
    }

    // adiciona a receita no store (inclui notificationId opcional)
    const novaReceita = {
      remedio,
      horario,
      recorrencia,
      tomarAgora,
      notificationId,
    };

    adicionarReceita(novaReceita);

    // mostra toast de sucesso
    setToastType("success");
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);

    // limpa formulário
    setRemedio("");
    setHorario("");
    setRecorrencia("");
    setTomarAgora(false);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
      <View className="flex-1 bg-[#F8FAFB]">
        {/* Cabeçalho */}
        <View className="absolute mb-2 left-[10%] w-[80%] bottom-[70%] z-10">
          <TouchableOpacity className="mb-8" onPress={() => router.back()}>
            <ArrowLeft size={26} color="#293C4C" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-[#C02636]">Novas receitas</Text>
          <Text className="mt-1 text-base text-[#293C4C]">
            Adicione a sua prescrição médica para receber lembretes de quando
            tomar seu medicamento
          </Text>
        </View>

        {/* Formulário */}
        <View className="flex-1 mt-32 justify-center items-center">
          {/* Remédio */}
          <View className="w-[80%] mb-6">
            <Text className="mb-2 text-sm text-[#293C4C]">Remédio</Text>
            <InputComponent
              placeholder="Nome do medicamento"
              placeholderTextColor="#8A98A7"
              value={remedio}
              onChangeText={(text) => {
                setRemedio(text);
                if (text.trim()) setRemedioError("");
              }}
              className="w-full h-12"
            />
            {remedioError ? (
              <Text className="text-red-500 text-sm mt-2">{remedioError}</Text>
            ) : null}
          </View>

          {/* Horário */}
          <View className="w-[80%] mb-6">
            <Text className="mb-2 text-sm text-[#293C4C]">Horário</Text>
            <InputComponent
              placeholder="00:00"
              placeholderTextColor="#8A98A7"
              value={horario}
              onChangeText={(text) => {
                let digits = text.replace(/\D/g, "").slice(0, 4);
                let clean = digits;
                if (digits.length >= 3) clean = digits.slice(0, 2) + ":" + digits.slice(2);
                const [hh, mm] = clean.split(":");
                if (hh && Number(hh) > 23) clean = "23" + (mm ? ":" + mm : "");
                if (mm && Number(mm) > 59) clean = hh + ":59";
                setHorario(clean);
                if (digits.length === 4) {
                  setHorarioError("");
                } else {
                  setHorarioError("O horário deve conter 4 dígitos (HHMM)");
                }
              }}
              keyboardType="numeric"
              maxLength={5}
              className="w-full h-12"
            />
            {horarioError ? (
              <Text className="text-red-500 text-sm mt-2">{horarioError}</Text>
            ) : null}
          </View>

          {/* Recorrência */}
          <View className="w-[80%] mb-4 relative">
            <Text className="mb-2 text-sm text-[#293C4C]">Recorrência</Text>
            <TouchableOpacity
              onPress={() => setShowRecurrenceOptions((v) => !v)}
              className="w-full h-12 border border-[#A2B9CD] rounded-lg px-4 justify-center"
            >
              <Text className={`${recorrencia ? "text-[#0B1320]" : "text-[#8A98A7]"}`}>
                {recorrencia || "Selecione"}
              </Text>
            </TouchableOpacity>

            {showRecurrenceOptions && (
              <View className="absolute left-0 right-0 top-[48px] mt-2 bg-white rounded-md overflow-hidden border border-[#E6EEF3] z-50">
                {recurrenceOptions.map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    onPress={() => {
                      setRecorrencia(opt);
                      setShowRecurrenceOptions(false);
                    }}
                    className={`p-3 border-b border-[#EEF3F6] last:border-b-0 flex-row justify-between items-center ${
                      recorrencia === opt ? "bg-[#F5FBFD]" : "bg-white"
                    }`}
                  >
                    <Text
                      className={`${
                        recorrencia === opt ? "text-[#0B1320] font-semibold" : "text-[#0B1320]"
                      }`}
                    >
                      {opt}
                    </Text>
                    {recorrencia === opt && <Check size={18} color="#C02636" />}
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {recorrenciaError ? (
              <Text className="text-red-500 text-sm mt-1">{recorrenciaError}</Text>
            ) : null}
          </View>

          {/* Tomar agora */}
          <View className="w-[80%] mt-4 flex-row items-center">
            <TouchableOpacity
              onPress={() => setTomarAgora((v) => !v)}
              className={`w-6 h-6 rounded-md mr-2 items-center justify-center ${
                tomarAgora ? "bg-[#C02636] border-[#C02636]" : "border border-[#A2B9CD]"
              }`}
            >
              {tomarAgora && <Text className="text-white text-xs">✓</Text>}
            </TouchableOpacity>
            <Text className="text-[#293C4C]">Tomar agora</Text>
          </View>
        </View>

        {/* Botão */}
        <View className="justify-end items-center">
          <ButtonComponent
            className="w-[80%] h-16 mb-14 items-center justify-center flex-row"
            onPress={handleAddPrescription}
          >
            <Plus size={24} color="#F8FAFB" />
            <Text className="text-[#F8FAFB] ml-2 text-lg font-bold">Adicionar</Text>
          </ButtonComponent>
        </View>

        {/* Toast animado */}
        <AnimatedToast visible={toastVisible} type={toastType} />
      </View>
    </KeyboardAwareScrollView>
  );
}
