import { Tabs } from "expo-router";
import { View } from "react-native";
import {
  BookingsIcon,
  CommunityIcon,
  HomeIcon,
  MatchUpsIcon,
  ProfileIcon,
} from "../components/icons/Icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6600A5",
        tabBarInactiveTintColor: "#444444",
        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 12,
        },
        tabBarLabelStyle: {
          fontFamily: "gil",
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View style={{ opacity: focused ? 1 : 0.5 }}>
              <HomeIcon />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ focused }) => (
            <View style={{ opacity: focused ? 1 : 0.5 }}>
              <CommunityIcon />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="matchups"
        options={{
          title: "MatchUps",
          tabBarIcon: ({ focused }) => (
            <View style={{ opacity: focused ? 1 : 0.5 }}>
              <MatchUpsIcon />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ focused }) => (
            <View style={{ opacity: focused ? 1 : 0.5 }}>
              <BookingsIcon />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <View style={{ opacity: focused ? 1 : 0.5 }}>
              <ProfileIcon />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
