import { Stack } from "expo-router";

export default function AuthLayout(){
  return(
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signIn"/> {/* tela de login */}
      <Stack.Screen name="signUp"/> {/* tela de cadastro */}
    </Stack>
  );
}