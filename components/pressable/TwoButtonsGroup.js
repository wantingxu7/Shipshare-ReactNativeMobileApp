import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../styles/Colors.js';
import {FontFamily} from "../../styles/FontFamily";

const TwoButtons = (props) => {
  const {leftText, rightText, onButton1Press, onButton2Press} = props;
  return (
    <TouchableOpacity style={[styles.container]}>
      <TouchableOpacity style={styles.buttonOutline} onPress={onButton1Press}>
        <Text style={styles.button1Text}>{leftText}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonFilled} onPress={onButton2Press}>
        <Text style={styles.button2Text}>{rightText}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.buttonDarkGreen,
    borderRadius: 12,
    height: 48,
    marginRight: 31,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1Text: {
    fontFamily: FontFamily.bold,
    color: Colors.buttonDarkGreen,
    fontSize: 16,
  },
  buttonFilled: {
    flex: 1,
    backgroundColor: Colors.buttonDarkGreen,
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2Text: {
    fontFamily: FontFamily.bold,
    color: Colors.white,
    fontSize: 16,
  },
});

export default TwoButtons;