import ButtonComponent from "@/src/components/button";
import InputComponent from "@/src/components/input";

import {
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { router } from "expo-router";
import { LucideEye, LucideEyeOff } from "lucide-react-native";


export default function SignUp(){
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleMostrarSenha = () => {
    setShowPassword(!showPassword);
  }

  return(
    <KeyboardAwareScrollView 
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 0 }}
      extraScrollHeight={20} // ajusta a distância do teclado
      enableOnAndroid={true}
    >
    <View className="
    flex-1 
    items-center 
    justify-center 
    bg-[#C02636]"
    >
      {/* Logo */}
      <Image
        className="
        absolute 
        max-auto
        top-[25%] 
        w-[55%] 
        h-[5%]"
        source={require("../../assets/images/Logo.png")}
      />

      {/* Container branco inferior */}
      <View
        className={`
          absolute bg-white rounded-t-[30px] p-5 bottom-0 items-center justify-center
          w-[100%] h-[45%]
        `}
      >
        {/* Texto título */}
        <Text
          className="
          absolute 
          max-auto
          top-[48px] 
          w-[100%]
          text-[#17222B] 
          text-[16px] 
          font-bold"
        >
          Entre para acessar suas receitas
        </Text>

        {/* Inputs */}
        <View className="
        absolute 
        top-[107px]
        w-[95%]
        self-center"
        >
          <Text className="mb-2">E-mail</Text>
          {/* Input E-mail */}
          <InputComponent 
          placeholder="email@exemplo.com"
          />
          <Text className="mt-4 mb-2">Senha</Text>

          <View className="w-full relative">
          {/* Input Senha */}
           <InputComponent
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          value={Password}
          >
              <View className="absolute right-4 top-1/2 -translate-y-1/2">
                <TouchableOpacity onPress={toggleMostrarSenha}>
                  {showPassword ? (
                    <LucideEyeOff color="#334FDC" size={24} />
                  ) : (
                    <LucideEye color="#334FDC" size={24} />
                  )}
                </TouchableOpacity>
              </View>
           </InputComponent>
          </View>
            {/* Botão Entrar */}
            <ButtonComponent 
              className="mt-8 items-center justify-center"
              onPress={() => router.push('/(safeScreens)/home')}
            />
        </View>
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
} 

