import { User } from "firebase/auth";
import { createContext, useContext } from "react";

type AuthContextType = {
  user?: User | null;
  signUp?: (email: string, password: string) => Promise<void>;
  signIn?: (email: string, password: string) => Promise<void>;
  signOut?: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({});

export const useAuth = () => {
  return useContext(AuthContext);
};
