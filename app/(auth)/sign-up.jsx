import * as React from "react";
import {
  TextInput,
  Button,
  View,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    //   try {
    //     await signUp.create({
    //       emailAddress,
    //       password,
    //     });

    //     await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

    //     setPendingVerification(true);
    //   } catch (err) {
    //     // See https://clerk.com/docs/custom-flows/error-handling
    //     // for more info on error handling
    //     console.error(JSON.stringify(err, null, 2));
    //   }
    // };

    try {
      await signUp.create({
        firstName,
        lastName,
        username,
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Display the second form to collect the verification code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/home");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        {/* {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
          />
          <TextInput
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <Button title="Sign Up" onPress={onSignUpPress} />
        </>
      )} */}

        <View
          className="w-full px-6 flex justify-center"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          {!pendingVerification && (
            <>
              <FormField
                value={firstName}
                placeholder="Firstname"
                handleChangeText={(firstName) => setFirstName(firstName)}
                border={true}
              />
              <FormField
                value={lastName}
                placeholder="Lastname"
                handleChangeText={(lastName) => setLastName(lastName)}
                border={true}
              />
              <FormField
                value={username}
                placeholder="Username"
                handleChangeText={(username) => setUsername(username)}
                border={true}
              />
              <FormField
                value={emailAddress}
                placeholder="Email"
                handleChangeText={(email) => setEmailAddress(email)}
                border={true}
              />
              <FormField
                value={password}
                placeholder="Password"
                handleChangeText={(password) => setPassword(password)}
                border={true}
              />
              <CustomButton
                title="Sign Up"
                containerStyles="my-8"
                handlePress={onSignUpPress}
              />
            </>
          )}

          {pendingVerification && (
            <>
              <FormField
                value={code}
                placeholder="Code"
                handleChangeText={(code) => setCode(code)}
                border={true}
              />
              <CustomButton
                title="Verify"
                containerStyles="my-8"
                handlePress={onPressVerify}
              />
            </>
          )}

          <View className="flex-row items-center justify-center space-x-1">
            <Text className="font-nregular text-base">
              Already have an account?
            </Text>
            <Link href="/sign-in">
              <Text className="font-nbold text-red-1 text-base">Sign in</Text>
            </Link>
          </View>
        </View>

        {/* {pendingVerification && (
        <>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <Button title="Verify Email" onPress={onPressVerify} />
        </>
      )} */}
      </ScrollView>
    </SafeAreaView>
  );
}
