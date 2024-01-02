import { DB } from "@/firebase.config";
import {
  DocumentData,
  Timestamp,
  addDoc,
  collection,
  doc,
  writeBatch,
} from "firebase/firestore";

// Generate random order number
const genOrderNo = () => {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${timestamp}-${randomNumber}`;
};

interface ICartData extends DocumentData {
  id: string;
  doc: DocumentData;
}

export const useHandleCheckout = async (
  cartData: ICartData[] | undefined,
  userId: string | undefined,
  totalCost: number | undefined
) => {
  const db = DB;

  const orderData = {
    orderNo: genOrderNo(),
    dateCreated: Timestamp.fromDate(new Date()),
    status: "pending",
    totalCost: totalCost ?? 0,
    userId,
    items: cartData?.map((item) => ({
      id: item.id,
      name: item.doc.name,
      quantity: item.doc.quantity,
      total: item.doc.price * item.doc.quantity,
    })),
  };

  await addDoc(collection(db, "orders"), orderData);

  const batch = writeBatch(db);
  cartData?.forEach((item: { id: string }) => {
    const docRef = doc(db, "cart", item.id);
    batch.delete(docRef);
  });
  await batch.commit();
};
