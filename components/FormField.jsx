import { View, Text, TextInput } from "react-native";
import React from "react";

const FormField = ({
  placeholder,
  value,
  title,
  handleChangeText,
  otherStyles,
  border,
  ...props
}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black font-mmedium">{title}</Text>
      {/* <View className="w-full h-16 px-4 rounded-2xl border-2 border-black-200 focus:border-red-1 flex flex-row items-center"> */}
      <View
        className={`w-full h-10 rounded-2xl flex flex-row items-center ${
          border && "border-2 border-black-200 focus:border-red-1 h-16 px-4"
        }`}
      >
        <TextInput
          className="flex-1 text-gray-400 font-mmedium text-base"
          value={value}
          //   value="Email"
          placeholder={placeholder}
          //   placeholder="Input text"
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          //   secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
      </View>
    </View>
  );
};

export default FormField;
