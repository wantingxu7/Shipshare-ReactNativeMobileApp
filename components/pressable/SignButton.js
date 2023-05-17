import {Alert, Pressable, StyleSheet, Text} from "react-native";
import React from "react";
import {Colors} from "../../styles/Colors";
import {FontSizes} from "../../styles/FontSizes";
import {useSelector} from 'react-redux';
import {login, signUp} from "../../api/user.js";
import {FontFamily} from "../../styles/FontFamily";
import { CommonActions } from "@react-navigation/native";

export const SignButton = ({text, navigation, email, password, confirmPassword, isLogin}) => {
  const token = useSelector((state) => state.auth.token);

  const verifyPassword = (password) => {
    // Valid password pattern:
    // 1. Contains both digit and word character
    // 2. More than 6 characters
    // 3. Contains at least one capital character
    const validPasswordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
    return password.match(validPasswordPattern);
  };

  const checkEmailFormat = (email) => {
    // Valid email pattern:
    // 1. Contains @
    // 2. Contains .
    // 3. Contains at least 2 characters after the last .
    const validEmailPattern = /[^@]+@[^@]+\.[a-zA-Z]{2,}/g;
    return email.match(validEmailPattern);
  }

  const navigateToHomeSafely = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Home" }],
      })
    );
  }

  const handleLogin =  () => {
    login({email, password}).then(() => navigateToHomeSafely()).catch((error) => {
      const errorCode = error.response.data.title;
      switch (errorCode) {
        case "Unauthorized":
          Alert.alert(
            "Login Failed",
            "The email is invalid. Please correct your email address."
          );
          break;
        case "Forbidden":
          Alert.alert(
            "Login Failed",
            "The password is incorrect. Please try again."
          );
          break;
        default:
          Alert.alert(
            "Login Failed",
            "Error happened while logging in. Please try again later."
          );
      }
    });
  }

  const handleSignUp =  () => {
    if(!checkEmailFormat(email)) {
      Alert.alert(
        "SignUp Failed",
        "Please use a valid email address."
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(
        "SignUp Failed",
        "Those passwords don't match. Please try again."
      );
      return;
    }
    if (!verifyPassword(password)) {
      Alert.alert(
        "SignUp Failed",
        "Please use 6 or more characters with a mix of numbers, uppercase letters, lowercase letters, and punctuation marks."
      );
      return;
    }
    signUp({email, password}).then(() => navigation.navigate('Home')).catch((error) => {
      const errorCode = error.code;
      switch (errorCode) {
        case "auth/email-already-in-use":
          Alert.alert(
            "SignUp Failed",
            "The email is already registered. Please use another email."
          );
          break;
        case "auth/invalid-email":
          Alert.alert(
            "SignUp Failed",
            "The email is invalid. Please correct your email address."
          );
          break;
        case "auth/weak-password":
          Alert.alert(
            "SignUp Failed",
            "The password is too weak. Please update your password."
          );
          break;
        default:
          Alert.alert(
            "SignUp Failed",
            "Error happened while signing up. Please try again later."
          );
      }
    });
  };

  return (
    <Pressable style={styles.button} onPress={() =>
      isLogin ? handleLogin() : handleSignUp()
    }>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.buttonDarkGreen,
    borderRadius: 30,
    height: 60,
    padding: 10,
    margin: 10,
    width: '85%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: FontSizes.buttonText,
    fontFamily: FontFamily.bold,
    marginTop: 5,
    fontWeight: 'bold',
  }
})