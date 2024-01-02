import { DB } from "@/firebase.config";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

interface IOrdersData extends DocumentData {
  id: string;
  doc: DocumentData;
}

export default function Orders() {
  const [orders, setOrders] = useState<IOrdersData[]>();

  const db = DB;

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersRef = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersRef);
      const ordersData = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        doc: doc.data(),
      }));
      setOrders(ordersData);
    };

    fetchOrders();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 10,
      }}
    >
      {orders?.map((order) => (
        <View className="bg-gray-400 px-3 py-2 mx-2 my-1 rounded-2xl">
          <View className="flex-row items-center justify-between">
            <View className="flex-col">
              <Text>OrderNumber</Text>
              <Text className="text-xs">{order.doc.orderNo}</Text>
            </View>

            <Text className="text-sm"></Text>
          </View>
          <View className="py-2">
            {order.doc.items?.map((item) => (
              <View className="flex-row justify-between px-3">
                <Text>{item.name}</Text>
                <Text>₵ {item.total}</Text>
              </View>
            ))}
          </View>
          <View>
            <Text className="font-bold text-lg">Total Amount</Text>
            <Text className="font-bold text-base">₵ {order.doc.totalCost}</Text>
          </View>
          <View>
            <Text>Status</Text>
            <Text className="text-xs font-bold">{order.doc.status}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
