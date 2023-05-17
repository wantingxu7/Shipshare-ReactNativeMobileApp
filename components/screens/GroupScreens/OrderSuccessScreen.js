import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Header} from "../../widgets/Header";
import React from 'react';
import {Colors} from "../../../styles/Colors";
import {FontFamily} from "../../../styles/FontFamily";

const OrderSuccessScreen = (props) => {
    return (
        <View style={styles.container}>
            <Header>Payment</Header>
            <Image
                source={require("../../../assets/GroupScreens/ordersuccess.png")}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>Order Success</Text>
                <Text style={styles.subtitle}>
                    After we verify your payment,
                    we will prepare for the shipment.
                    Thanks for order!
                </Text>
            </View>
            <Pressable
                style={styles.getStartedButton}
                onPress={() => props.navigation.navigate("Home")}
            >
                <Text style={styles.getStartedText}>Back to Home</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 65,
        flex: 1,
        backgroundColor: "rgb(250, 250, 250)",
    },
    image: {
        width: "100%",
        resizeMode: 'contain',
        marginTop: 40,
        alignSelf: 'center',
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
        marginHorizontal: 8,
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
    getStartedButton: {
        height: 60,
        marginHorizontal: 24,
        marginBottom: 40,
        backgroundColor: Colors.buttonDarkGreen,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    getStartedText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.white,
        fontFamily: FontFamily.bold,
    },
});

export default OrderSuccessScreen;