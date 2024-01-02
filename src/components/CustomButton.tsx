import React from "react";
import {
  ColorValue,
  GestureResponderEvent,
  Pressable,
  Text,
} from "react-native";

type ButtonType = {
  name: string;
  color: ColorValue;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
};

export default function CustomButton({ onPress, name, color }: ButtonType) {
  return (
    <Pressable
      onPress={onPress}
      className="py-4 rounded-xl justify-center items-center"
      style={{ backgroundColor: { color }.color }}
    >
      <Text className="text-white">{name}</Text>
    </Pressable>
  );
}
