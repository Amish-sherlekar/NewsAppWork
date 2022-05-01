import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  DrawerNavigation,
  NavigateToLoginScreen,
} from "./navigation/DrawerNavigation";
import { firebase } from "./firebase/config";

const ChechIfUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const useHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => useHandler(user)),
    []
  );

  return <>{currentUser ? <NavigateToLoginScreen /> : <DrawerNavigation />}</>;
};

export default ChechIfUser;
