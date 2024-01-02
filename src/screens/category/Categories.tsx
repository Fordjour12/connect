import { shoppingCategories } from "@/screens/category/shoppingCategories";
import React from "react";
import { Pressable, ScrollView, View } from "react-native";

import Card from "@/components/Card";

export default function Categories({ navigation }: any) {
  return (
    <ScrollView>
      <View className="flex-row flex-wrap px-4">
        {shoppingCategories.map((item, index) => (
          <Pressable style={{ width: "50%" }} >
            <View key={index}>
              <Card name={item} />
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
