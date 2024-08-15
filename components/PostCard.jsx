import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { images } from "../constants";
import CustomModal from "./CustomModal";

const PostCard = ({ data }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(null);

  const handleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
            <Text className="text-lg font-nbold">
              {`Kobe’s passing is really sticking with me in a way I didn’t expect.`}
            </Text>
            <Text className="text-base font-nregular">
              {`Kobe’s passing is really sticking with me in a way I didn’t expect.\n\nHe was an icon, the kind of person who wouldn’t die this way. My wife compared it to Princess Di’s accident.`}
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={handleModal}>
              <View className="w-full max-h-60 rounded-xl">
                <Image
                  source={data.post}
                  className="w-full h-full rounded-3xl"
                  resizeMethod="contain"
                  onLoadEnd={() => setIsLoading(false)}
                  onLoadStart={() => setIsLoading(true)}
                />
                {isLoading && (
                  <View className="bg-slate-200 w-full h-full rounded-3xl flex justify-center items-center absolute">
                    <ActivityIndicator
                      size="large"
                      color="black"
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
            <CustomModal
              isVisible={isModalVisible}
              onClose={() => setModalVisible(false)}
              postPicture={data.post}
            />
          </View>
        </View>
      </View>
      <View className="border-solid border border-gray-200 my-2" />
    </>
  );
};

export default PostCard;
