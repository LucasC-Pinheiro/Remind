import * as Notifications from "expo-notifications";

type ScheduleResult = { id: string } | { error: string } | null;

export async function requestNotificationPermission(): Promise<boolean> {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  } catch (err) {
    console.warn("Erro pedindo permissão de notificações:", err);
    return false;
  }
}

export async function scheduleReminder(options: {
  remedio: string;
  horario: string; // format HH:MM
  recorrencia: string; // 'Diário' | 'Semanal' | 'Mensal' | ''
  tomarAgora?: boolean;
}): Promise<string | null> {
  try {
    const granted = await requestNotificationPermission();
    if (!granted) return null;

    const { remedio, horario, recorrencia, tomarAgora } = options;
    const content = {
      title: "Hora do remédio",
      body: `Está na hora de tomar: ${remedio}`,
      data: { remedio, recorrencia },
    } as any;

    // extrai hora e minuto
    const horarioDigits = horario.replace(/\D/g, "");
    const hh = Number(horarioDigits.slice(0, 2));
    const mm = Number(horarioDigits.slice(2));

    // triggers conforme tipo
    if (tomarAgora) {
      const id = await Notifications.scheduleNotificationAsync({ content, trigger: (new Date(Date.now() + 1000) as any) });
      return id;
    }

    if (recorrencia === "Diário") {
      const id = await Notifications.scheduleNotificationAsync({ content, trigger: { hour: hh, minute: mm, repeats: true } as any });
      return id;
    }

    // Único: calcula próxima ocorrência
    const now = new Date();
    const target = new Date(now);
    target.setHours(hh, mm, 0, 0);

    if (target <= now) {
      if (recorrencia === "Semanal") target.setDate(target.getDate() + 7);
      else if (recorrencia === "Mensal") target.setMonth(target.getMonth() + 1);
      else target.setDate(target.getDate() + 1);
    }

    const id = await Notifications.scheduleNotificationAsync({ content, trigger: (target as any) });
    return id;
  } catch (err) {
    console.warn("Erro ao agendar notificação:", err);
    return null;
  }
}

export async function cancelScheduledNotification(id: string) {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch (err) {
    console.warn("Erro ao cancelar notificação:", err);
  }
}

// Recomenda-se configurar o handler no bootstrap do app, exemplo:
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: false }),
// });
