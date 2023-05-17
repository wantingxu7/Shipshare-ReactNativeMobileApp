import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {Image as ImagePath, Pressable, StyleSheet, View} from "react-native";
import {SvgUri} from "react-native-svg";

export function FilterButton({ onPress, length, size }) {
    return (
        <Pressable
            onPress={onPress}
            style={styles.buttonView}
        >
            <View
                style={[
                    {
                        width: length,
                        height: length,
                    },
                    styles.buttonView,
                ]}
            >
                <SvgUri
                    height="24"
                    uri={ImagePath.resolveAssetSource(require("../../assets/icons/Filter.svg")).uri}
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonView: {
        justifyContent: "center",
        backgroundColor: "#EEBD5E",
        borderRadius: 10,
        alignItems: "center",
    },
});