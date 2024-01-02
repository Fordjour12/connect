import { DB } from "@/firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const db = DB;

const getCartData = async () => {
  const cartRef = collection(db, "cart");
  const cartSnapshot = await getDocs(cartRef);
  return cartSnapshot.docs.map((doc) => ({
    id: doc.id,
    doc: doc.data(),
  }));
};

export const useIncrementQuantity = async (item: { id: string }) => {
  const cartData = await getCartData();
  const cartItem = cartData.find((cartItem) => cartItem.id === item.id);
  if (cartItem) {
    await updateDoc(doc(db, "cart", cartItem.id), {
      quantity: cartItem.doc.quantity + 1,
    });
  }
};

export const useDecreaseQuantity = async (item: { id: string }) => {
  const cartData = await getCartData();
  const cartItem = cartData.find((cartItem) => cartItem.id === item.id);
  if (cartItem) {
    const newQuantity = cartItem.doc.quantity - 1;
    if (newQuantity === 0) {
      await deleteDoc(doc(db, "cart", cartItem.id));
    } else {
      await updateDoc(doc(db, "cart", cartItem.id), {
        quantity: newQuantity,
      });
    }
  }
};
