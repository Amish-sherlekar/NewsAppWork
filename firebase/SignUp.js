import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import { RFValue } from "react-native-responsive-fontsize";
import * as Yup from "yup";
import Validator from "email-validator";
import { db, firebase } from "./config";

const windoWidth = Dimensions.get("window").width;

// windoWidth /2 - windowWidth /2.5

const SignupScreen = ({ navigation }) => {
  const [apiKey, setApiKey] = useState("");

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    username: Yup.string()
      .required()
      .min(3, "Username must be at least 3 characters"),
    password: Yup.string()
      .required()
      .min(6, "Password must be at least 6 characters"),
  });

  const onSignup = async (email, password, userName) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log(email, password);

      db.collection("users").doc(authUser.user.email).set({
        username: userName,
        email: email,
        uid: authUser.user.uid,
        apiKey: apiKey,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => {
          onSignup(values.email, values.password, values.username);
          navigation.navigate("HomeScreen");
        }}
        validationSchema={SignupSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            {/* Email */}
            <View
              style={[
                styles.inputfield,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor={"#444"}
                placeholder={"Email"}
                autoCapitalize={"none"}
                keyboardType={"email-address"}
                textContentType={"emailAddress"}
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>

            <View
              style={[
                styles.inputfield,
                {
                  borderColor:
                    1 > values.username.length || values.username.length >= 6
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor={"#444"}
                placeholder={"Username"}
                autoCapitalize={"none"}
                textContentType={"username"}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
            </View>

            {/* PassWord */}
            <View
              style={[
                styles.inputfield,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 6
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor={"#444"}
                placeholder={"Password"}
                autoCapitalize={"none"}
                autoCorrect={false}
                secureTextEntry={true}
                textContentType={"password"}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>

            <View style={[styles.inputfield]}>
              <TextInput
                placeholderTextColor={"#444"}
                placeholder={"Api Key"}
                onChangeText={(text) => setApiKey(text)}
              />
            </View>

            <View
              style={{ alignItems: "flex-end", marginBottom: 30, left: -20 }}
            >
              <Text style={{ color: "#6bb0f5" }}>Forgot Passowrd?</Text>
            </View>

            <Pressable
              style={styles.buttonStyle(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>

            <View style={styles.LogInContainer}>
              <Text style={{ fontSize: 18 }}>Already have an account </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: "#6bb0f5", fontSize: 18 }}>Log In</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.apiContainer}>
              <Text>Get Api key for free </Text>
              <TouchableOpacity
                onPress={() => Linking.openURL("https://newsapi.org/register")}
              >
                <Text style={{ color: "#6bb0f5" }}>Register</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    top: "10%",
    marginTop: 80,
  },
  inputfield: {
    margin: 20,
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#fafafa",
    marginBottom: 10,
    borderWidth: 1,
  },
  buttonStyle: (isValid) => ({
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 42,
    borderRadius: 4,
    width: 200,
    backgroundColor: isValid ? "#0096f6" : "#9acaf7",
    left: RFValue(80),
  }),
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  LogInContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
  apiContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default SignupScreen;
