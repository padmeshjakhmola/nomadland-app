import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { icons, images } from "../constants";

const CustomModal = ({ isVisible, onClose, postPicture }) => {
  const [isLoading, setIsLoading] = useState(null);

  const handleModalVisibility = () => {
    onClose(true);
  };
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="slideInUp"
      animationInTiming={300}
      coverScreen={true}
      className="m-0 justify-end"
    >
      <View className="bg-black rounded-3xl h-full">
        <View className="mt-16 flex-row justify-between px-6">
          <TouchableOpacity onPress={handleModalVisibility}>
            <Image
              source={icons.more}
              className="w-8 h-8"
              tintColor="white"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleModalVisibility}>
            <Image
              source={icons.closeModal}
              className="w-5 h-5"
              tintColor="white"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View className="w-full max-h-[80%] items-center justify-center">
          <Image
            source={postPicture}
            className="w-full h-full"
            resizeMode="contain"
            onLoadEnd={() => setIsLoading(false)}
            onLoadStart={() => setIsLoading(true)}
          />
          {isLoading && (
            <ActivityIndicator
              size="large"
              color="white"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
              }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
