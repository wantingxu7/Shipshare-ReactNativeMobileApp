import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Svg, {Circle, Rect} from "react-native-svg";
import {Colors} from "../../../styles/Colors";
import {FontFamily} from "../../../styles/FontFamily";

const content = [
  {
    title: "Shop the World",
    subtitle: "Discover new products, new brands,and new possibilities - find anything, from anywhere!",
    imageSource: require('../../../assets/WelcomePage/illustration1.png')
  },
  {
    title: "Share the fee",
    subtitle: "Say goodbye to high shipping fees, and hello to affordable international shipping!",
    imageSource: require('../../../assets/WelcomePage/illustration2.png')
  },
  {
    title: "Pickup at Doorstep",
    subtitle: "Choose from multiple pickup options near you. Experience the convenience at your doorstep!",
    imageSource: require('../../../assets/WelcomePage/illustration3.png')
  },
]

const WelcomePage = ({navigation}) => {
  const [screenNumber, setScreenNumber] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {
          screenNumber === 2 ? null : (
            <Pressable
              style={styles.nextButton}
              onPress={() => {
                setScreenNumber(screenNumber + 1)
              }}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </Pressable>
          )
        }
      </View>
      <View style={styles.content}>
        <Image
          source={content[screenNumber].imageSource}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{content[screenNumber].title}</Text>
          <Text style={styles.subtitle}>
            {content[screenNumber].subtitle}
          </Text>
          <GeneratePointer screenNumber={screenNumber}/>
        </View>
      </View>
      <Pressable
        style={styles.getStartedButton}
        onPress={() => navigation.navigate("LogInPage")}
      >
        <Text style={styles.getStartedText}>Get started</Text>
      </Pressable>
    </View>
  );
}

const GeneratePointer = (props) => {
  const line = (
    <Svg width="30" height="8" style={{marginRight: 8}}>
      <Rect width="30" height="8" fill="#80B213" rx="4"/>
    </Svg>
  )
  const circle = (
    <Svg width="8" height="8" viewBox="0 0 8 8" style={{marginRight: 8}}>
      <Circle cx="4" cy="4" r="4" fill="#CCCCCC"/>
    </Svg>
  )
  const circleEnd = (
    <Svg width="8" height="8" viewBox="0 0 8 8" style={{marginRight: 8}}>
      <Circle cx="4" cy="4" r="4" fill="#CCCCCC"/>
    </Svg>
  )
  if (props.screenNumber === 0) {
    return (
      <View style={styles.iconContainer}>
        {line}
        {circle}
        {circleEnd}
      </View>
    )
  } else if (props.screenNumber === 1) {
    return (
      <View style={styles.iconContainer}>
        {circle}
        {line}
        {circleEnd}
      </View>
    )
  } else if (props.screenNumber === 2) {
    return (
      <View style={styles.iconContainer}>
        {circle}
        {circleEnd}
        {line}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 24,
    marginTop: 24
  },
  nextButton: {
    borderRadius: 4,
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  nextButtonText: {
    fontSize: 16,
    alignSelf: 'center',
    color: Colors.buttonDarkGreen,
    fontWeight: 'bold',
    fontFamily: FontFamily.regular,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 320,
    height: 320,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.blackText,
    paddingBottom: 24,
    fontFamily: FontFamily.bold,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#AAAAAA',
    lineHeight: 28,
    marginBottom: 16,
    fontFamily: FontFamily.light,
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 16,
    height: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  getStartedButton: {
    height: 60,
    marginHorizontal: 24,
    marginBottom: 40,
    backgroundColor: Colors.buttonDarkGreen,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    fontFamily: FontFamily.bold,
  },
});


export default WelcomePage;