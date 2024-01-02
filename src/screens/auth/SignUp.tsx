import { useAuth } from "@/context/auth.context";
import React, { useState } from "react";
import {
  Button,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUp({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { signUp } = useAuth();
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View className="justify-center h-screen px-4">
          <Text className="text-2xl font-bold pb-6">
            Don't have Account create a new account
          </Text>
          <TextInput
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="py-7"
          />
          <Button title="Sign Up" onPress={() => signUp!(email, password)} />
          {error && <Text className="text-red-600">{error}</Text>}

          <Pressable
            className="py-4"
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="text-sm font-semibold">
              Have an Account Login here
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
