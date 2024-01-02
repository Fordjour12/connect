import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/context/auth.context";
import { DB } from "@/firebase.config";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function Profile({ navigation }: any) {
  const { user, signOut } = useAuth();
  const db = DB;

  const [profileData, setProfileData] = useState<DocumentData>();

  useEffect(() => {
    const userDataFetch = async () => {
      try {
        const userDocRef = doc(db, "user", user!.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        } else {
          console.log("No such document");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    if (user) userDataFetch();
  }, [user]);

  return (
    <ScrollView className="px-2">
      <Pressable onPress={() => navigation.navigate("Edit Profile")}>
        {profileData?.imageURL && (
          <Image
            source={{ uri: profileData.imageURL }}
            style={{ width: "100%", height: 300 }}
            className="rounded-xl"
          />
        )}
      </Pressable>

      <Text className="pt-3  text-lg font-bold">Details</Text>
      <View className="bg-gray-400 my-4 px-4 py-3 rounded-lg">
        <View>
          <Text className="pb-2 font-medium">Full Name</Text>
          <Text>{profileData?.fullName}</Text>
        </View>
        <View className="mt-4">
          <Text className="pb-2 font-medium">Email</Text>
          <Text>{profileData?.email}</Text>
        </View>
      </View>

      <Text className="text-lg font-bold">Address</Text>
      <View className="bg-gray-400 my-4 px-4 py-3 rounded-lg">
        <Text className="pb-2 font-medium">Delivery Address</Text>
        <Text>{profileData?.address}</Text>
      </View>

      <View>
        <CustomButton name="Logout" color="red" onPress={signOut} />
      </View>
    </ScrollView>
  );
}
