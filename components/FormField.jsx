import { View, Text, TextInput } from "react-native";
import React from "react";

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
          //   secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
      </View>
    </View>
  );
};

export default FormField;
