import React from "react";
import { Image, Text, View } from "react-native";

type ImageCardProps = {
  imageUrl: string;
  price: string;
};

export default function ImageCard({ imageUrl, price }: ImageCardProps) {
  return (
    <View className="flex-1 relative overflow-hidden rounded-lg">
      <Image
        source={{
          uri: imageUrl,
        }}
        className="object-cover absolute top-0 left-0 right-0 bottom-0"
      />

      <View className="bg-gray-200 py-4 px-2 absolute rounded-br-md">
        <Text className="font-medium text-sm">{price}gh</Text>
      </View>
    </View>
  );
}
