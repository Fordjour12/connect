import React from "react";
import { Text, View } from "react-native";

export default function SelectedCategory({ route }: any) {
  const { category } = route.params;
  return (
    <View>
      <Text>SelectedCategory</Text>
    </View>
  );
}
