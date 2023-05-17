import {Pressable, StyleSheet, Text} from "react-native";
import React from "react";
import {Colors} from "../../styles/Colors";
import {FontSizes} from "../../styles/FontSizes";

export const BigWhiteButton = ({text, onPress}) => {

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    borderColor: Colors.buttonDarkGreen,
    borderWidth: 1,
    borderRadius: 12,
    height: 58,
    padding: 10,
    margin: 10,
    width: '44%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    color: Colors.buttonDarkGreen,
    fontSize: FontSizes.buttonText,
    marginTop: 5,
    fontWeight: 'bold',
  }
})