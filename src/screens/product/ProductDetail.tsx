import CustomButton from "@/components/CustomButton";
import { DB } from "@/firebase.config";
import {
  DocumentData,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

interface ProductData extends DocumentData {
  id: string;
  doc: DocumentData;
}

export default function ProductDetail({ route }: any) {
  const { item }: ProductData = route.params;

  const db = DB;

  const addProductToCart = async (product: { id: any; doc: any }) => {
    try {
      const cartItemRef = doc(db, "cart", product.id);
      const cartItemSnap = await getDoc(cartItemRef);

      if (cartItemSnap.exists()) {
        // If the item already exists in the cart, increment the quantity
        await updateDoc(cartItemRef, {
          quantity: cartItemSnap.data().quantity + 1,
        });
      } else {
        // If the item doesn't exist in the cart, add it with a quantity of 1
        await setDoc(cartItemRef, {
          ...product.doc,
          quantity: 1,
        });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="px-3 py-3"
    >
      <Image
        source={{ uri: item.doc.imageUrl }}
        className="w-[400px] h-[400px] rounded-lg"
      />

      <View>
        <Text className="py-2 text-2xl font-bold ">{item.doc.name}</Text>
      </View>
      <Text className="mr-2 text-base">{item.doc.price} ghc</Text>
      <View>
        <Text className="text-xl font-semibold  pt-4 pb-2">Description</Text>
        <Text className="">{item.doc.description}</Text>
      </View>
      <View className="pt-2">
        <CustomButton
          color="black"
          name="Add to Cart"
          onPress={() => addProductToCart(item)}
        />
      </View>
    </ScrollView>
  );
}
