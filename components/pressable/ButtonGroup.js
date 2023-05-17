import ButtonToggleGroup from "react-native-button-toggle-group";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../styles/Colors";


export function ButtonGroup({ selections, selectedValue, setSelectedValue, marginHorizontal, marginTop, marginBottom }) {

    return (
        <View style={[styles.container, {marginHorizontal, marginTop, marginBottom}]}>
            <View style={{ flex: 1 }}>
                <ButtonToggleGroup
                    values={selections}
                    value={selectedValue}
                    onSelect={setSelectedValue}

                    highlightBackgroundColor={Colors.buttonDarkGreen}
                    highlightTextColor={Colors.white}

                    inactiveBackgroundColor={Colors.white}
                    inactiveTextColor={Colors.gray}

                    textStyle={{fontFamily: "Poppins-Regular"}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        margin: 20,
    },
});