import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "../../constants";
import { Redirect, Tabs } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useAuth } from "@clerk/clerk-expo";

const TabIcon = ({ icon, color, name, focused, imageSize, tintcolor }) => {
  return (
    <View className="flex items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={tintcolor ?? color}
        className={imageSize}
      />
    </View>
  );
};

const TabsLayout = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#E60023",
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "#e5e7eb",
          borderTopWidth: 1,
          height: 90,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              focused={focused}
              imageSize="w-8 h-8"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.search}
              color={color}
              focused={focused}
              imageSize="w-8 h-8"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.create}
              color={color}
              focused={focused}
              imageSize="w-12 h-12"
              tintcolor="red"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="followers"
        options={{
          title: "Followers",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.followers}
              color={color}
              focused={focused}
              imageSize="w-10 h-10"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.messages}
              color={color}
              focused={focused}
              imageSize="w-10 h-10"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
