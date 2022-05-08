import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { firebase } from "../firebase/config";
import LottieView from "lottie-react-native";

export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("DashboardScreen");
      } else {
        this.props.navigation.navigate("LoginScreen");
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/welcome_bg.png")}
          style={{
            width: "100%",
            height: "30%",
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
