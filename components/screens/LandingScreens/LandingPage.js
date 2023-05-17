import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import WelcomePage from './WelcomePage.js';
import {Colors} from "../../../styles/Colors";
import {LinearGradient} from 'expo-linear-gradient';
import {FontFamily} from "../../../styles/FontFamily";

const backgroundImage = require('../../../assets/WelcomePage/BgImg.jpg');

const SplashScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      navigation.navigate("WelcomePage");
    }
  }, [isLoading, navigation]);

  const handlePress = () => {
    setIsLoading(false);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <ImageBackground
        source={backgroundImage}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        }}
      >
        <LinearGradient
          colors={['rgba(58, 58, 58, 0)', '#2C2C2C']}
          style={styles.gradient}
        />
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appNameText}>ShipShare</Text>
          <Text style={styles.descriptionText}>
            The ultimate solution for affordable and convenient international shipping!
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 550,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 32,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginLeft: 24,
    marginBottom: 24,
    textAlign: 'left',
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.lightGray,
    fontFamily: FontFamily.bold,
  },
  appNameText: {
    marginTop: 8,
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.buttonDarkGreen,
    fontFamily: FontFamily.bold,
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.lightGray,
    marginTop: 16,
    marginBottom: 82,
    lineHeight: 25.2,
    fontFamily: FontFamily.regular,
  },
});

export default SplashScreen;
