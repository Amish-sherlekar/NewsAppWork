import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Alert,
  Keyboard
} from 'react-native'
import { Formik } from "formik"
import * as Yup from "yup"
import Validator from "email-validator"
import { firebase } from "./config"

const windiwWidth = Dimensions.get('window').width

const LoginScreen = ({ navigation }) => {

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .min(6, "Password must be at least 6 characters")
  })

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      console.log("email", email, "password", password)
      Keyboard.dismiss()
      navigation.navigate('HomeScreen')
    } catch (error) {
      Alert.alert(
        'Please type your email and password or not created an account yet',
        error.message,
        [
          {
            text: 'Ok',
            onPress: () => console.log('Ok'),
            style: 'cancel'
          },
          {
            text: 'SIGN UP',
            onPress: () => navigation.navigate('SignUpScreen')
          }
        ]
      )
    }
  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={values => {
          onLogin(values.email, values.password)
        }}
        validationSchema={LoginSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View style={[
              styles.inputfield,
              {
                borderColor:
                  values.email.length < 1 || Validator.validate(values.email)
                    ? '#ccc'
                    : 'red'
              }
            ]}>
              <TextInput
                placeholderTextColor={'#444'}
                placeholder={'Email'}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                textContentType={'emailAddress'}
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>

            <View style={[
              styles.inputfield,
              {
                borderColor:
                  1 > values.password.length || values.password.length >= 6
                    ? '#ccc'
                    : 'red'
              }
            ]}>
              <TextInput
                placeholderTextColor={'#444'}
                placeholder={'Password'}
                autoCapitalize={'none'}
                autoCorrect={false}
                secureTextEntry={true}
                textContentType={'password'}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>

            <View style={{ alignItems: 'flex-end', marginBottom: 30, left: -20 }}>
              <Text style={{ color: '#6bb0f5' }}>Forgot Passowrd?</Text>
            </View>

            <Pressable
              style={styles.buttonStyle(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Don't have an account</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUpScreen')}
              >
                <Text style={{ color: '#6bb0f5' }}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>

        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 0.5,
    justifyContent: 'center',
    top: 120,
    // marginTop: 80,
  },
  inputfield: {
    margin: 20,
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#fafafa',
    marginBottom: 10,
    borderWidth: 1,
  },
  buttonStyle: isValid => ({
    backgroundColor: isValid ? '#0096f6' : "#9acaf7",
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
    width: windiwWidth - 50,
    left: windiwWidth / 2 - (windiwWidth - 50) / 2,
  }),
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
})

export default LoginScreen