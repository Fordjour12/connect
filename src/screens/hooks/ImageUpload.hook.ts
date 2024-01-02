import { STORAGE } from "@/firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Alert } from "react-native";
import SaveProfileRecord from "./SaveProfileRecord.hook";
type ProfileRecord = {
  fullName: string;
  address: string;
  imageURL: string;
  contact: string;
  userId: string;
  uri: any;
};
const storage = STORAGE;

export default async function useImageUpload(
  uri: string | URL | Request,
  fullName: string,
  address: string,
  contact: string,
  userId: string | undefined
) {
  const response = await fetch(uri);
  const imageBlob = await response.blob();

  const ImageStorageRef = ref(
    storage,
    `images/${imageBlob.type}/${Date.now()}`
  );

  try {
    const imageUpload = uploadBytesResumable(ImageStorageRef, imageBlob);
    Alert.alert("Image Uploaded");
    imageUpload.on(
      "state_changed",
      (snapShop) => {
        const progress =
          (snapShop.bytesTransferred / snapShop.totalBytes) * 100;
        console.log(`Progress: ${progress}%`);
      },
      (err) => {
        Alert.alert(err.message);
      },
      () => {
        getDownloadURL(imageUpload.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          SaveProfileRecord({
            fullName: fullName,
            address: address,
            contact: contact,
            imageURL: downloadURL,
            userId: userId,
          });
        });
      }
    );
  } catch (error: any) {
    Alert.alert(error.message);
  }
}
