import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';

import SplashScreen from '../screens/player/SplashScreen';
import LoginScreen from '../screens/player/LoginScreen';
import RegisterScreen from '../screens/player/RegisterScreen';
import HomeScreen from '../screens/player/HomeScreen';
import VenueDetailsScreen from '../screens/player/VenueDetailsScreen';
import BookSessionScreen from '../screens/player/BookSessionScreen';
import CheckoutScreen from '../screens/player/CheckoutScreen';
import ConfirmationScreen from '../screens/player/ConfirmationScreen';
import MyBookingsScreen from '../screens/player/MyBookingsScreen';
import ProfileScreen from '../screens/player/ProfileScreen';

import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminVenuesScreen from '../screens/admin/AdminVenuesScreen';
import AdminBookingsScreen from '../screens/admin/AdminBookingsScreen';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Player: undefined;
  Admin: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type PlayerStackParamList = {
  MainTabs: undefined;
  VenueDetails: { venueId: string };
  BookSession: { venueId: string };
  Checkout: { sessionId: string };
  Confirmation: { bookingId: string };
};

export type AdminStackParamList = {
  AdminDashboard: undefined;
  AdminVenues: undefined;
  AdminBookings: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const PlayerStack = createNativeStackNavigator<PlayerStackParamList>();
const AdminStack = createNativeStackNavigator<AdminStackParamList>();
const Tab = createBottomTabNavigator();

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    Home: '🏟️',
    Bookings: '📋',
    Profile: '👤',
  };
  return (
    <View style={styles.tabIcon}>
      <Text style={styles.tabEmoji}>{icons[name]}</Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
        {name}
      </Text>
    </View>
  );
}

function PlayerTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={MyBookingsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Bookings" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

function PlayerNavigator() {
  return (
    <PlayerStack.Navigator screenOptions={{ headerShown: false }}>
      <PlayerStack.Screen name="MainTabs" component={PlayerTabs} />
      <PlayerStack.Screen name="VenueDetails" component={VenueDetailsScreen} />
      <PlayerStack.Screen name="BookSession" component={BookSessionScreen} />
      <PlayerStack.Screen name="Checkout" component={CheckoutScreen} />
      <PlayerStack.Screen name="Confirmation" component={ConfirmationScreen} />
    </PlayerStack.Navigator>
  );
}

function AdminNavigator() {
  return (
    <AdminStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminStack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <AdminStack.Screen name="AdminVenues" component={AdminVenuesScreen} />
      <AdminStack.Screen name="AdminBookings" component={AdminBookingsScreen} />
    </AdminStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen name="Player" component={PlayerNavigator} />
        <RootStack.Screen name="Admin" component={AdminNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBar,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 70,
    paddingBottom: 10,
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
  },
  tabEmoji: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: 10,
    color: colors.textDim,
    marginTop: 2,
  },
  tabLabelActive: {
    color: colors.primary,
  },
});
