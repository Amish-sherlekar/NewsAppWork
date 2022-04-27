import React, { Component, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from "firebase";

export default function CheckUser({ props }) {

  // constructor(props) {
  //   super(props);
  // }

  // componentDidMount() {
  //   this.checkIfLoggedIn();
  // }

  useEffect(() => {
    return () => {
      checkIfLoggedIn();
    }
  }, [])

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user)
      }
    });
  };

  // render() {
  return (
    <View style={styles.container}>
      <Text>Please Wait</Text>
    </View>
  );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
