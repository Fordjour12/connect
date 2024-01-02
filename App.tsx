import { AuthProvider } from "@/context/auth.provider";
import AppLayout from "./AppLayout";

import React from "react";

export default function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}
