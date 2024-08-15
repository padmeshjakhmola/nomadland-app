import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import PostCard from "../../components/PostCard";
import { dummyData } from "../../utils";

const Home = () => {
  return (
    <SafeAreaView className="mt-4 pb-16 h-screen">
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View className="px-6 flex-row justify-between items-center">
              <Image
                source={images.profile}
                className="w-8 h-8 rounded-full"
                resizeMode="cover"
              />
              <Image
                source={icons.logo}
                className="w-9 h-9 rounded-full"
                resizeMode="cover"
              />
              <View className="rounded-full p-2 border border-gray-300">
                <Image
                  source={icons.notification}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </View>
            </View>
            <View className="border-solid border border-gray-200 my-2" />
          </>
        )}
        showsVerticalScrollIndicator={false}
        data={dummyData}
        renderItem={({ item }) => <PostCard data={item} />}
      />
    </SafeAreaView>
  );
};

export default Home;
