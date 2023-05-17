import {Text, Pressable, StyleSheet} from "react-native";
import React from "react";
import {Colors} from "../../styles/Colors";
import {FontSizes} from "../../styles/FontSizes";

export const BigGreenButton = ({text, onPress}) => {

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.buttonDarkGreen,
    borderRadius: 12,
    height: 58,
    padding: 10,
    margin: 10,
    width: '44%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: FontSizes.buttonText,
    marginTop: 5,
    fontWeight: 'bold',
  }
})