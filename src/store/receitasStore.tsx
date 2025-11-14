import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Receita {
  remedio: string;
  horario: string;
  recorrencia: string;
  tomarAgora: boolean;
  // id da notificação agendada (se houver) para permitir cancelamento/edição
  notificationId?: string | null;
}

interface ReceitasState {
  receitas: Receita[];
  adicionarReceita: (novaReceita: Receita) => void;
  removerReceita: (index: number) => void;
  limparReceitas: () => void;
}

export const useReceitasStore = create<ReceitasState>()(
  persist(
    (set) => ({
      receitas: [],
      adicionarReceita: (novaReceita: Receita) =>
        set((state) => ({
          receitas: [...state.receitas, novaReceita],
        })),
      removerReceita: (index: number) =>
        set((state) => ({
          receitas: state.receitas.filter((_, i) => i !== index),
        })),
      limparReceitas: () =>
        set(() => ({
          receitas: [],
        })),
    }),
    {
      name: "receitas-storage",
      storage: createJSONStorage(() => AsyncStorage),
    })
  )
