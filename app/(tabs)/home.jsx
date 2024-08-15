import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Home</Text>
      <Link href="/" className="text-red-1">Redirect welcome page</Link>
    </View>
  );
};

export default Home;
