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

const SignIn = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { signIn } = useAuth();

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View className="justify-center h-screen px-4">
          <Text className="text-2xl font-bold pb-6">
            Have an Account enter your details to log in
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
          <Button title="Log In" onPress={() => signIn!(email, password)} />
          {error && <Text className="text-red-600">{error}</Text>}

          <Pressable
            className="py-4"
            onPress={() => navigation.navigate("Signup")}
          >
            <Text className="text-sm font-semibold">
              Don't Have an Account Signup here
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
