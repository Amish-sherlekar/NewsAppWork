import * as React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NativeBaseProvider, Switch } from "native-base";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import tailwind from "tailwind-rn";
import { Ionicons } from "@expo/vector-icons";
import { auth, firebase, db } from "../firebase/config";
import { EventRegister } from "react-native-event-listeners";

const windowWidth = Dimensions.get("window").width;

const windowHeight = Dimensions.get("window").height;

const CustomDrawer = (props) => {
  const goBack = () => {
    props.navigation.goBack();
  };

  const [darkMode, setDarkMode] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const getName = () => {
    db.collection("users")
      .doc(auth.currentUser.email)
      .onSnapshot((doc) => {
        setName(doc.data().username);
        setEmail(doc.data().email);
      });
  };

  React.useEffect(() => {
    getName();
  }, []);

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ height: windowHeight - 10 }}
        >
          <SafeAreaView>
            <Image
              source={require("../assets/images/userIcon.png")}
              style={{
                width: windowWidth / 3,
                height: windowWidth / 3,
                borderRadius: windowWidth / 3,
                margin: 10,
                left: 100,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                color: darkMode ? "white" : "black",
                textAlign: "center",
              }}
            >
              Welcome {name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: darkMode ? "white" : "black",
                textAlign: "center",
              }}
            >
              Welcome {email}
            </Text>
          </SafeAreaView>

          <View style={{ marginTop: 15 }}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              marginRight: 40,
              marginVertical: 20,
              fontFamily: "SigmarOne-Regular",
              left: 30,
              fontSize: 20,
              color: "gray",
              bottom: -8,
            }}
          >
            Dark Mode
          </Text>
          <View style={{ top: 20 }}>
            <Switch
              value={darkMode}
              onValueChange={(val) => {
                setDarkMode(val);
                EventRegister.emit("changeThemeEvent", val);
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.signUpStyle, { flexDirection: "row" }]}
          onPress={() => {
            firebase.auth().signOut();
            console.log("logout");
          }}
        >
          <Ionicons name="exit" size={45} color={"gray"} style={{ left: 20 }} />
          <Text
            style={{
              fontFamily: "SigmarOne-Regular",
              left: 30,
              fontSize: 20,
              color: "gray",
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
  signUpStyle: {
    paddingVertical: 30,
  },
});
