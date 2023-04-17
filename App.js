import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./Screens/LoginScreen";
import TabScreen from "./Screens/TabScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import EditProfile from './Screens/EditProfile';
import ChangePassword from './Screens/ChangePassword';
import ContactUsScreen from './Screens/ContactUsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="TabScreen" options={{ headerShown: false }} component={TabScreen} />
        <Stack.Screen options={{ title: "" }} name="EditProfile" component={EditProfile} />
        <Stack.Screen options={{ title: "" }} name="ChangePassword" component={ChangePassword} />
        <Stack.Screen options={{ title: "Contact Us" }} name="ContactUsScreen" component={ContactUsScreen} />    
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
