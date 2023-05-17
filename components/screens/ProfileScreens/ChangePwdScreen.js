import React from "react";
import {StyleSheet, Text, View, TextInput, Pressable, Image as ImagePath, Alert} from "react-native";
import {Colors} from "../../../styles/Colors";
import { Divider } from "react-native-elements";
import {Header} from "../../widgets/Header";
import {SvgUri} from "react-native-svg";
import {FontSizes} from "../../../styles/FontSizes";
import {useSelector} from "react-redux";
import {changePassword} from "../../../api/user";
import {FontFamily} from "../../../styles/FontFamily";

const ChangePwdScreen = (props) => {
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector(state => state.auth.user.id);
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const verifyPassword = (password) => {
        // Valid password pattern:
        // 1. Contains both numbers and letters
        // 2. More than 6 characters
        const validPasswordPattern = /(?=.*\d+)(?=.*[a-zA-Z]+).{6,}/g;
        return password.match(validPasswordPattern);
    };

    const handleChangePwd = async () => {
        if (confirmPassword !== newPassword) {
            Alert.alert(
                "Update failed",
                "Passwords did not match, please try again."
            );
            return;
        }
        if (!verifyPassword(newPassword)) {
            Alert.alert(
                "Update failed",
                "Please use 6 or more characters with a mix of numbers and letters."
            );
            setNewPassword("");
            setConfirmPassword("");
            return;
        }
        await changePassword({newPassword, userId, token});
        props.navigation.goBack();
    };
    return (
        <View style={styles.container}>
            {/* Screen Title */}
            <Header
                leftComponent={
                    <Pressable
                        style={{position: "relative", top: 2}}
                        onPress={() => props.navigation.goBack()}>
                        <SvgUri
                            height="20"
                            uri={ImagePath.resolveAssetSource(require("../../../assets/icons/ArrowLeft.svg")).uri}
                        />
                    </Pressable>
                }
                rightComponent=
                    {<Pressable onPress={() => handleChangePwd()}>
                        <Text style={styles.confirmationText}>Done</Text>
                    </Pressable>}>
                Set Password</Header>

            {/* Password Input boxes */}
            <View style={styles.inputsContainer}>
                <TextInput
                    placeholder="Set New Password"
                    value={newPassword}
                    style={styles.textInput}
                    secureTextEntry
                    onChangeText={setNewPassword}
                />
                <Divider style={styles.divider} />
                <TextInput
                    placeholder="Enter Password Again"
                    value={confirmPassword}
                    style={styles.textInput}
                    secureTextEntry
                    onChangeText={setConfirmPassword}
                />
            </View>

            {/* Helper Text */}
            <Text style={styles.reminderText}>
                Please use 6 or more characters with a mix of numbers and letters.
            </Text>
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
    inputsContainer: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        marginTop: 30,
        marginBottom: 15,
    },
    textInput: {
        fontSize: 14,
        padding: 14,
        fontFamily: FontFamily.regular,
    },
    divider: {
        marginHorizontal: 10,
    },
    reminderText: {
        fontSize: 14,
        paddingLeft: 14,
        color: "rgb(154, 153, 153)",
        fontFamily: FontFamily.regular,
    },
    confirmationText: {
        fontSize: FontSizes.buttonText,
        color: Colors.buttonDarkGreen,
    }
});

export default ChangePwdScreen;