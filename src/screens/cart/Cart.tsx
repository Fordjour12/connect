import { useAuth } from "@/context/auth.context";
import { DB } from "@/firebase.config";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useHandleCheckout } from "../hooks/HandleCheckout.hook";
import {
  useDecreaseQuantity,
  useIncrementQuantity,
} from "../hooks/QuantityChange.hook";

interface CartProps extends DocumentData {
  id: string;
  doc: DocumentData;
}

export default function Cart() {
  const db = DB;

  const { user } = useAuth();

  const [cartData, setCartData] = useState<CartProps[]>();

  useEffect(() => {
    const cartRef = collection(db, "cart");
    const unsubscribe = onSnapshot(cartRef, (cartSnapshot) => {
      const newCartData = cartSnapshot.docs.map((doc) => ({
        id: doc.id,
        doc: doc.data(),
      }));
      setCartData(newCartData);
    });

    return () => unsubscribe();
  }, []);

  // for getting the total cost of a product
  const productTotalCost = (item: CartProps) => {
    return item.doc.price * item.doc.quantity;
  };

  const checkoutTotalProductsCost = () => {
    return cartData?.reduce((total, item) => total + productTotalCost(item), 0);
  };

  const handleCheckout = () => {
    useHandleCheckout(cartData, user?.uid, checkoutTotalProductsCost());
  };

  return (
    <ScrollView>
      {cartData?.length === 0 ? (
        <Text className="text-2xl font-bold text-center mt-10">
          Your cart is empty!
        </Text>
      ) : (
        <>
          {cartData?.map((item, index) => (
            <>
              <View
                key={index}
                className="bg-black/25 overflow-hidden flex-row justify-between items-center mx-2 my-2 py-4 px-3 rounded-lg"
              >
                <View className="flex-row gap-4">
                  <View>
                    <Image
                      source={{
                        uri: item.doc.imageUrl,
                      }}
                      width={100}
                      height={100}
                      className="object-contain rounded-2xl"
                    />
                  </View>
                  <View>
                    <View>
                      <Text className="font-bold text-lg">{item.doc.name}</Text>
                      <Text className="pt-1 text-base font-medium">
                        ₵ {item.doc.price}
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-4 py-3">
                      <View>
                        <Pressable
                          className="bg-gray-500 rounded-md w-[40] h-[40] items-center"
                          onPress={() => useIncrementQuantity(item)}
                        >
                          <Text className="text-2xl">+</Text>
                        </Pressable>
                      </View>
                      <View>
                        <Text className="text-lg font-bold">
                          {item.doc.quantity}
                        </Text>
                      </View>

                      <View>
                        <Pressable
                          className="bg-gray-500 rounded-md w-[40] h-[40] items-center"
                          onPress={() => useDecreaseQuantity(item)}
                        >
                          <Text className="text-4xl">-</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Product total with quantity */}
                <View className="items-end bg-gray-500 rounded-md ">
                  <Text className="font-bold text-lg text-white py-1 px-2">
                    ₵ {productTotalCost(item).toFixed(2)}
                  </Text>
                </View>
              </View>
            </>
          ))}
        </>
      )}

      <View
        className="mx-4 my-6"
        style={{ display: cartData?.length === 0 ? "none" : "flex" }}
      >
        <View className="flex-row justify-between">
          <Text className="text-2xl font-medium mb-2">Total</Text>
          <Text className="text-2xl font-medium mb-2">
            ₵{checkoutTotalProductsCost()?.toFixed(2)}
          </Text>
        </View>

        <Pressable
          className="justify-center items-center bg-black py-4 mb-3 rounded-xl"
          onPress={() => handleCheckout()}
          style={{
            display: cartData?.length === 0 ? "none" : "flex",
          }}
        >
          <Text className="text-base font-semibold text-white">Checkout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
