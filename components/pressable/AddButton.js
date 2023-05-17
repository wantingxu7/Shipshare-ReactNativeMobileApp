import React from "react";
import {Image as ImagePath, Pressable, StyleSheet, View} from "react-native";
import {SvgUri} from "react-native-svg";

export function AddButton({ onPress, length, size }) {
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
                    uri={ImagePath.resolveAssetSource(require("../../assets/icons/Add.svg")).uri}
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonView: {
        justifyContent: "center",
        alignItems: "center",
    },
});