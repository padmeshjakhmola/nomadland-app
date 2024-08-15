import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { router } from "expo-router";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);
const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
