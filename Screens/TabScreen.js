import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import MenuScreen from './MenuScreen';
import ThinkSpeakScreen from './ThinkSpeakScreen';

function Home() {
  return (
    <HomeScreen />
  );
}

function Menu() {
  return (
    <MenuScreen />
  );
}

function ThinkSpeak() {
  return (
    <ThinkSpeakScreen />
  );
}

const Tab = createBottomTabNavigator();

function TabScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#19A7CE',
      }}
    >
      <Tab.Screen
        name="Home"        
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ThinkSpeak"
        component={ThinkSpeak}
        options={{
          tabBarLabel: 'ThinkSpeak',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="link" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="menu" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabScreen;
