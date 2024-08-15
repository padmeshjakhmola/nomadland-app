import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";

const PostCard = ({ data }) => {
  return (
    <>
      <View className="px-6 mt-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-3">
            <Image
              source={data.avatar}
              className="w-12 h-12 rounded-full"
              resizeMode="cover"
            />
            <Text className="font-nbold text-base">{data.name}</Text>
          </View>
          <View>
            <Text className="font-nregular text-gray-400 text-base">
              {`@${data.user_name} ·${data.timestamp}`}
            </Text>
          </View>
        </View>
        <View className="my-4">
          <View className="mb-1 space-y-5">
            <Text className="text-base font-nregular">
              {`Kobe’s passing is really sticking with me in a way I didn’t expect.\n\nHe was an icon, the kind of person who wouldn’t die this way. My wife compared it to Princess Di’s accident.`}
            </Text>
            <View className="w-full max-h-60 rounded-xl">
              <Image
                source={data.post}
                className="w-full h-full rounded-3xl"
                resizeMethod="contain"
              />
            </View>
          </View>
        </View>
      </View>
      <View className="border-solid border border-gray-200 my-2" />
    </>
  );
};

export default PostCard;
