import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const { isLogged, setIsLogged } = useGlobalContext();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        setIsLogged(true);
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View
          className="w-full px-6 flex justify-center"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <FormField
            value={emailAddress}
            placeholder="Email"
            handleChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            border={true}
          />
          <FormField
            value={password}
            placeholder="Password"
            handleChangeText={(password) => setPassword(password)}
            border={true}
          />
          <CustomButton
            title="Sign In"
            containerStyles="my-8"
            handlePress={onSignInPress}
          />
          <View className="flex-row items-center justify-center space-x-1">
            <Text className="font-nregular text-base">
              Don't have an account?
            </Text>
            <Link href="/sign-up">
              <Text className="font-nbold text-red-1 text-base">Sign up</Text>
            </Link>
          </View>
          {/* <Link href="/home">
            <Text className="font-nbold text-red-1 text-base">
              Redirect home---temp
            </Text>
          </Link> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
