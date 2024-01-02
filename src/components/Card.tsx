import React from "react";
import { Pressable, Text, View } from "react-native";

type CardProps = {
  name: string;
};

export default function Card({ name }: CardProps) {
  return (
    <Pressable
      onPress={() => {
        console.log("pressed");
      }}
    >
      <View className="my-4 bg-gray-400 flex w-[170px] shrink-0 h-[196px] flex-col rounded-md">
        <Text className="px-1">{name}</Text>
      </View>
    </Pressable>
  );
}
