import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/context/auth.context";
import { DB } from "@/firebase.config";
import {
  ImagePickerResult,
  MediaTypeOptions,
  launchImageLibraryAsync,
} from "expo-image-picker";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useImageUpload from "../hooks/ImageUpload.hook";

export default function EditProfile() {
  const { user } = useAuth();

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

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [contact, setContact] = useState("");

  const [ImagePicker, setImagePicker] = useState<ImagePickerResult | any>();

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
    setImagePicker(result);
  };

  const uploadContent = async () => {
    if (ImagePicker) {
      await useImageUpload(
        ImagePicker.assets[0].uri,
        fullName,
        address,
        contact,
        user?.uid
      );
    }
    setAddress("");
    setContact("");
    setFullName("");
    setImagePicker(null);
    setProfileImage(null);
  };

  return (
    <KeyboardAwareScrollView>
      <View className="px-2">
        <View>
          <Pressable
            className="bg-gray-400 py-3 mb-4 px-3 rounded-md"
            onPress={pickImage}
          >
            <Text>Select Profile Image</Text>
          </Pressable>
          <View className="">
            <TextInput
              placeholder="Full Name"
              defaultValue={fullName}
              value={fullName}
              onChangeText={(text) => setFullName(text)}
              className="border-2 border-gray-400 rounded-md py-3 px-4 mb-4"
            />
            <TextInput
              placeholder="Contact"
              value={contact}
              onChangeText={(text) => setContact(text)}
              className="border-2 border-gray-400 rounded-md py-3 px-4 mb-4"
            />
            <TextInput
              placeholder="Address(GH POST), City, Landmark"
              numberOfLines={3}
              value={address}
              onChangeText={(text) => setAddress(text)}
              className="border-2 border-gray-400 rounded-md py-3 px-4"
            />
          </View>
        </View>

        <View className="my-8">
          <Text>Preview</Text>
          <View>
            {profileImage !== null ? (
              <Image
                source={{ uri: profileImage }}
                width={200}
                height={200}
                resizeMode="cover"
                className="rounded-full"
              />
            ) : (
              <Image
                source={{ uri: profileData?.imageURL }}
                width={200}
                height={200}
                resizeMode="cover"
                className="rounded-full"
              />
            )}
            <View className="my-2">
              <Text>Full Name</Text>
              <Text>{fullName ? fullName : profileData?.fullName}</Text>
            </View>
          </View>
          <View className="h-[40]">
            <Text>Address</Text>
            <Text>{address ? address : profileData?.address}</Text>
          </View>
        </View>
        <CustomButton
          name="Save Profile"
          color="black"
          onPress={uploadContent}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
