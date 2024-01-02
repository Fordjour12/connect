import { DB } from "@/firebase.config";
import { collection, doc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

type ProfileRecord = {
  fullName: string;
  address: string;
  imageURL: string;
  contact: string;
  userId?: string;
};
const db = DB;
export default async function SaveProfileRecord({
  fullName,
  address,
  contact,
  imageURL,
  userId,
}: ProfileRecord) {
  try {
    const userCollection = collection(db, "user");
    const docIdToUpdate = userId;
    const profileRecordRef = doc(userCollection, docIdToUpdate);
    const profileRecord = await updateDoc(profileRecordRef, {
      fullName,
      address,
      contact,
      imageURL,
    });
  } catch (error: any) {
    Alert.alert(error.message);
  }
}
