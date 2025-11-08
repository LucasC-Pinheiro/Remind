import '../global.css';

import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function Layout(){
  return(
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <Stack screenOptions={{ headerShown: false }}/>
    </>
  )
}