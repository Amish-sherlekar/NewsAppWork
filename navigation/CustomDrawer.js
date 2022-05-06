import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NativeBaseProvider } from "native-base";
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import tailwind from "tailwind-rn";
import { Ionicons } from "@expo/vector-icons";
import { auth, firebase } from "../firebase/config";

const windowWidth = Dimensions.get("window").width;

const windowHeight = Dimensions.get("window").height;

const CustomDrawer = (props) => {
  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ height: windowHeight - 10 }}
        >
          <ImageBackground
            source={require("../assets/images/bg2.jpg")}
            style={{
              height: windowHeight / 2.3,
              width: windowWidth,
              justifyContent: "center",
              alignItems: "center",
              bottom: 10
            }}
          >
            <Feather
              name="chevron-left"
              size={30}
              onPress={() => {
                goBack();
              }}
              color="#fff"
              style={[styles.backIcon, tailwind("bg-indigo-400")]}
            />
          </ImageBackground>
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
        <TouchableOpacity
          style={{
            flexDirection: "row",
          }}
          onPress={() => {
            firebase.auth().signOut();
            console.log("logout");
          }}
        >
          <Ionicons name="exit" size={45} color={"#000"} style={{ left: 20 }} />
          <Text
            style={{
              fontFamily: "SigmarOne-Regular",
              left: 30,
              fontSize: 20,
              color: "#000",
              bottom: -8,
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </NativeBaseProvider>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  backIcon: {
    position: "relative",
    left: windowWidth / 2 + 120,
    top: 6,
    borderRadius: 10,
    padding: 5,
  },
  signUpSyle: {
    position: "absolute",
    bottom: 0,
    left: 20,
    height: 60,
    flexDirection: "row",
  },
});
