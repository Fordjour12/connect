import CustomButton from "@/components/CustomButton";
import ImageCard from "@/components/ImageCard";
import { DB } from "@/firebase.config";
import MasonryListView from "@react-native-seoul/masonry-list";
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface ProductData extends DocumentData {
  id: string;
  doc: DocumentData;
}

export default function Homepage({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductData[]>();

  const db = DB;

  useEffect(() => {
    const fetchData = async () => {
      const docRef = query(collection(db, "products"), limit(20));
      const dataSnapshot = await getDocs(docRef);
      const data = dataSnapshot.docs.map((doc) => ({
        id: doc.id,
        doc: doc.data(),
      }));
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const productDetails = (item: ProductData) => {
    navigation.navigate("Product Detail", { item });
  };

  const viewMorProduct = () => {
    navigation.navigate("Products");
  };

  return (
    <ScrollView>
      <View className="flex-col justify-around gap-3 h-[400] px-2 py-4">
        <View className="flex-1">
          <ImageCard
            price="250"
            imageUrl="https://images.pexels.com/photos/842959/pexels-photo-842959.jpeg?auto=compress&cs=tinysrgb&w=640&h=750&dpr=1"
          />
        </View>

        <View className="flex-1 flex-row" style={{ gap: 12 }}>
          <ImageCard
            price="130"
            imageUrl="https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=640&h=750&dpr=1"
          />
          <ImageCard
            price="220"
            imageUrl="https://images.pexels.com/photos/1895019/pexels-photo-1895019.jpeg?auto=compress&cs=tinysrgb&w=640&h=750&dpr=1"
          />
        </View>
      </View>

      <Image
        source={require("../../../assets/banner.png")}
        width={200}
        height={200}
        className="my-4"
      />

      <View className="flex-row justify-between items-center px-3 py-4 ">
        <Text className="text-lg font-bold">Featured</Text>

        <Pressable className="bg-black px-3 py-2 rounded">
          <Text className="text-sm font-semibold text-white">Sell All</Text>
        </Pressable>
      </View>
      <ScrollView className="px-4">
        {loading ? (
          <ContentLoader
            speed={2}
            width="358"
            height="609"
            viewBox="0 0 358 609"
            backgroundColor="#BCBCBC"
            foregroundColor="#ffffff"
          >
            <Rect width="170" height="201" rx="12" fill="#BCBCBC" />
            <Rect x="179" width="179" height="140" rx="12" fill="#BCBCBC" />
            <Rect y="220" width="170" height="185" rx="12" fill="#BCBCBC" />
            <Rect y="424" width="170" height="185" rx="12" fill="#BCBCBC" />
            <Rect
              x="179"
              y="157"
              width="179"
              height="187"
              rx="12"
              fill="#BCBCBC"
            />
            <Rect
              x="179"
              y="361"
              width="179"
              height="187"
              rx="12"
              fill="#BCBCBC"
            />
          </ContentLoader>
        ) : (
          <>
            <MasonryListView
              data={products!}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 10,
                paddingHorizontal: 6,
              }}
              onEndReachedThreshold={0.1}
              renderItem={({ item, i }: { item: any; i: number }) => (
                <Pressable onPress={() => productDetails(item)}>
                  <View
                    style={{
                      aspectRatio: i === 0 ? 1 : 3 / 4,
                    }}
                    className="relative overflow-hidden p-[6px] mt-3 rounded-lg"
                  >
                    <Image
                      source={{ uri: item.doc.imageUrl }}
                      style={StyleSheet.absoluteFill}
                      resizeMode="cover"
                    />

                    <View style={StyleSheet.absoluteFill} className="p-2">
                      <View className="flex-row gap-2 bg-black/60 ">
                        <Text className="font-semibold text-base flex-1 text-white ">
                          {item.doc.name}
                        </Text>
                      </View>

                      <View className="flex-1" />
                      <View
                        // intensity={10}
                        className="bg-black/40 p-[10px] overflow-hidden rounded-full flex-row items-center"
                      >
                        <Text
                          className="flex-1 px-1 text-white font-semibold text-base"
                          numberOfLines={1}
                        >
                          {item.doc.price}gh
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              )}
            />
          </>
        )}
      </ScrollView>

      <View className="p-4">
        <CustomButton
          color={"black"}
          name="All Products"
          onPress={() => viewMorProduct()}
        />
      </View>
    </ScrollView>
  );
}
