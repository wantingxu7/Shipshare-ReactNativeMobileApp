import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Svg, {Circle, Rect, SvgUri} from "react-native-svg";
import {Colors} from "../../../styles/Colors";
import {FontFamily} from "../../../styles/FontFamily";

const content = [
    {
        title: "Tutorial",
        subtitle: "This tutorial consists of six steps. \nLet's walk through how to use our service step by step.",
        imageSource: require('../../../assets/TutorialScreen/tutorial.png')
    },
    {
        title: "Ship to the Warehouse",
        subtitle: "Shop online and have them shipped to our warehouse address. \nBe sure to include the warehouse address as the shipping address for your package.",
        imageSource: require('../../../assets/TutorialScreen/shiptothewarehouse.png')
    },
    {
        title: "Add Parcels",
        subtitle: "Once your package has been shipped, \n" +
            "you will receive a tracking number.\n" +
            "Fill in the tracking number in My Parcels page to keep track of your package.",
        imageSource: require('../../../assets/TutorialScreen/addparcels.png')
    },
    {
        title: "Track Parcels",
        subtitle: "Stay updated on your parcel’s location and delivery status in My Parcels. \nOnce your package arrives at our warehouse, we'll weigh it and provide you with its weight information.",
        imageSource: require('../../../assets/TutorialScreen/trackparcels.png')
    },
    {
        title: "Join or Create a Group",
        subtitle: "Choose a group which destination is close to you and fits your preferred shipping method (such as air or sea, standard or sensitive line). \nIf there is no suitable group available, you can create your own.",
        imageSource: require('../../../assets/TutorialScreen/joinorcreateagroup.png')
    },
    {
        title: "Add Parcels to the Group",
        subtitle:
            "After joining a group, you can select which of your packages that have arrived at our warehouse to add to the group, and pay for the total weight. " +
            "Once payment is confirmed, we will prepare the package for shipment.",
        imageSource: require('../../../assets/TutorialScreen/AddParcelsToTheGroup.png')
    },
    {
        title: "Pick Up Your Parcels",
        subtitle: "You can track the group shipment in real time on the Shipments page. \nOnce the group shipment arrives, you will be notified to pick up your package from the group leader's location.",
        imageSource: require('../../../assets/TutorialScreen/pickupyourparcels.png')
    },
]

const TutorialScreen = ({navigation}) => {
    const [screenNumber, setScreenNumber] = useState(0);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {
                    screenNumber !== 0 && screenNumber !== 1 && <Pressable
                        style={styles.nextButton}
                        onPress={() => {
                            setScreenNumber(screenNumber - 1)
                        }}>
                        <Text style={styles.nextButtonText}>Back</Text>
                    </Pressable>
                }
                <View style={{flex: 1}}></View>
                {
                    screenNumber !== 0 && screenNumber !== 6 && <Pressable
                        style={styles.nextButton}
                        onPress={() => {
                            setScreenNumber(screenNumber + 1)
                        }}
                    >
                        <Text style={styles.nextButtonText}>Next</Text>
                    </Pressable>
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
                </View>
                <GeneratePointer screenNumber={screenNumber}/>
            </View>
            <View style={{height: 80}}>
                {
                    screenNumber === 0 && <Pressable
                        style={styles.getStartedButton}
                        onPress={() => setScreenNumber(1)}
                    >
                        <Text style={styles.getStartedText}>Get started</Text>
                    </Pressable>
                }
                {
                    screenNumber === 6 && <Pressable
                        style={styles.getStartedButton}
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Text style={styles.getStartedText}>Get started</Text>
                    </Pressable>
                }
            </View>

        </View>
    );
}

const GeneratePointer = (props) => {
    const line = (
        <Svg width="30" height="8" style={{marginRight: 8}}>
            <Rect width="30" height="8" fill="#80B213" rx="4"/>
        </Svg>
    )
    const circle = (key) => (
        <Svg width="8" height="8" viewBox="0 0 8 8" style={{marginRight: 8}} key={key}>
            <Circle cx="4" cy="4" r="4" fill="#CCCCCC"/>
        </Svg>
    )
    if (props.screenNumber !== 0 && props.screenNumber !== 6) {
        return (
            <View style={styles.iconContainer}>
                {[...Array(props.screenNumber - 1)].map((e, i) => circle(i))}
                {line}
                {[...Array(6 - props.screenNumber)].map((e, i) => circle(i))}
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
        padding: 24,
        marginTop: 32,
        minHeight: 76,
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
        fontFamily: FontFamily.regular,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: 24,
    },
    image: {
        width: 320,
        height: 320,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 40,
        marginHorizontal: 8,
        height: 260,
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
        fontFamily: FontFamily.regular,
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


export default TutorialScreen;