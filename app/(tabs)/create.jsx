import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { icons, images } from "../../constants";
import * as DocumentPicker from "expo-document-picker";
import * as Location from "expo-location";
import { router } from "expo-router";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    picture: null,
  });
  const [showImage, setShowImage] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSubmit = () => {
    if (form.title === "" || form.description === "" || !form.picture) {
      return Alert.alert("Please provide all fields");
    }
  };

  const handleRemovePost = () => {
    setShowImage(false);
  };

  const handleRemoveLocation = () => {
    setAddress(null);
  };

  const handleLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Please grant Location permission");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync();

    const reverseGeoCodeAddress = await Location.reverseGeocodeAsync({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });

    setAddress(reverseGeoCodeAddress);
    setShowLocation(!showLocation);
  };

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          picture: result.assets[0],
        });
        setShowImage(true);
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-5">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <View className="flex-row items-center justify-between pt-2">
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={icons.backarrow}
              className="w-8 h-8"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit}>
            <View className="bg-red-1 rounded-xl p-3 px-6">
              <Text className="text-white font-mbold">Post</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FormField
          placeholder="Title"
          value={form.title}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          maxLength={30}
        />
        <FormField
          placeholder="Create a post description!"
          value={form.description}
          handleChangeText={(e) => setForm({ ...form, description: e })}
          maxLength={100}
        />
        {form.picture && showImage && (
          <View className="w-full max-h-60 rounded-xl mt-6">
            <Image
              source={{ uri: form.picture.uri }}
              className="w-full h-full rounded-3xl"
              resizeMethod="contain"
            />
            <TouchableOpacity
              className="absolute right-2 top-2"
              activeOpacity={0.4}
              onPress={handleRemovePost}
            >
              <Image
                source={icons.closeImage}
                className="w-8 h-8"
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        )}
        {showLocation && (
          <View className="flex-row items-center my-3 justify-between">
            <View className="flex-row items-center gap-2">
              <Image
                source={icons.location}
                className="w-6 h-6"
                resizeMode="contain"
                tintColor="#0076d3"
              />
              <Text className="font-mbold text-blue-1">
                {`${address[0]?.district}, ${address[0]?.city}, ${address[0]?.country}`}
              </Text>
            </View>
          </View>
        )}
        <View className="flex-1 justify-end">
          {isKeyboardVisible && (
            <View className="flex-row space-x-4">
              <TouchableOpacity onPress={handleLocation}>
                {showLocation ? (
                  <Image
                    source={icons.location}
                    className="w-6 h-6"
                    resizeMode="contain"
                    tintColor="#0076d3"
                  />
                ) : (
                  <Image
                    source={icons.location}
                    className="w-6 h-6"
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openPicker("image")}>
                {showImage ? (
                  <Image
                    source={icons.gallary}
                    className="w-6 h-6"
                    resizeMode="contain"
                    tintColor="#E60023"
                  />
                ) : (
                  <Image
                    source={icons.gallary}
                    className="w-6 h-6"
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Create;
