import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  placeholder,
  value,
  title,
  handleChangeText,
  otherStyles,
  border,
  maxLength,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black font-mmedium">{title}</Text>
      <View
        className={`w-full h-10 rounded-2xl flex flex-row items-center ${
          border && "border-2 border-black-200 focus:border-red-1 h-16 px-4"
        }`}
      >
        <TextInput
          className="flex-1 text-black font-mmedium text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          maxLength={maxLength}
          secureTextEntry={placeholder === "Password" && !showPassword}
          // secureTextEntry={placeholder === "Password"}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          {...props}
        />
        {placeholder === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyehide}
              className="w-6 h-6"
              resizeMode="contain"
              tintColor="black"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
