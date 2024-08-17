import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);
const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const { user } = useUser();
    // console.log("qqqqqqqqqqqqq", user)
    if (isLogged === true) {
      router.replace("/home");
    } else {
      router.replace("/");
    }
  });

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
