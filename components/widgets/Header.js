import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {FontFamily} from "../../styles/FontFamily";
import {Colors} from "../../styles/Colors";

export function Header({ children, leftComponent, rightComponent }) {
    return (
        <View style={styles.container}>
            <View style={styles.leftComponent}>
                {leftComponent}
            </View>
            <Text style={styles.titleText}>{children}</Text>
            <View style={styles.rightComponent}>
                {rightComponent}
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        height: 40,
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        color: Colors.blackText,
        fontFamily: FontFamily.bold,
    },
    leftComponent: {
        flex: 1,
        display: "flex",
        alignItems: "flex-start",
    },
    rightComponent: {
        flex: 1,
        display: "flex",
        alignItems: "flex-end",
    },
});