import React from 'react';
import {TouchableOpacity, Text, StyleSheet, useWindowDimensions, View} from 'react-native';
import {FontFamily} from "../../styles/FontFamily";

const GreenButton = ({ text, onPress }) => {
    const {width} = useWindowDimensions();
    return (
        <View style={{width: (width-48)}}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#80B213',
        borderRadius: 100,
        width: '100%',
        height: 58,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: FontFamily.bold,
    },
});

export default GreenButton;
