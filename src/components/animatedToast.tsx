import { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type AnimatedToastProps = {
  visible: boolean;
  type: "success" | "error";
  message?: string;
};

export function AnimatedToast({ visible, type, message }: AnimatedToastProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-50);
  const iconScale = useSharedValue(0);

  const backgroundColor =
    type === "success" ? "#BBF7D0" : "#FCA5A5"; // verde claro / vermelho claro
  const textColor = type === "success" ? "#166534" : "#7F1D1D"; // tons mais escuros

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.ease),
      });
      translateY.value = withTiming(0, {
        duration: 400,
        easing: Easing.out(Easing.ease),
      });
      iconScale.value = withTiming(1, {
        duration: 450,
        easing: Easing.out(Easing.ease),
      });

      // some automaticamente depois de 2,5s
      setTimeout(() => {
        opacity.value = withTiming(0, { duration: 400 });
        translateY.value = withTiming(-50, { duration: 400 });
        iconScale.value = withTiming(0, { duration: 300 });
      }, 2500);
    } else {
      opacity.value = withTiming(0, { duration: 400 });
      translateY.value = withTiming(-50, { duration: 400 });
      iconScale.value = withTiming(0, { duration: 300 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
    opacity: iconScale.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 60,
          alignSelf: "center",
          backgroundColor,
          borderRadius: 9999, // formato pílula
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 8,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 3,
        },
        animatedStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            width: 24,
            height: 24,
            marginRight: 8,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: type === "success" ? "#16a34a" : "#ef4444",
          },
          iconStyle,
        ]}
      >
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 14 }}>
          {type === "success" ? "✓" : "✕"}
        </Text>
      </Animated.View>

      <Text style={{ color: textColor, fontWeight: "500", fontSize: 14 }}>
        {message || (type === "success" ? "Sucesso" : "Erro")}
      </Text>
    </Animated.View>
  );
}
