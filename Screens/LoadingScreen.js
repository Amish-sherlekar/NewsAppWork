import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
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
        <LottieView
          source={require("../assets/animation/loader.json")}
          autoplay={true}
          loop={true}
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
