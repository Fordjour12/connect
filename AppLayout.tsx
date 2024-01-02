import BottomNavigationBar from "@/components/BottomNavigationBar";
import { useAuth } from "@/context/auth.context";
import SignIn from "@/screens/auth/SignIn";
import SignUp from "@/screens/auth/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

export default function AppLayout() {
  const Stack = createNativeStackNavigator();

  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage">
        {user ? (
          <Stack.Screen
            name="BottomNavigationBar"
            component={BottomNavigationBar}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Group>
            <Stack.Screen name="Signup" component={SignUp} />
            <Stack.Screen name="Login" component={SignIn} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
