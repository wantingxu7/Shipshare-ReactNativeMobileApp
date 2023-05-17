import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import {Colors} from "../../../styles/Colors";
import {ALL_STATES} from "./allStates";
import TwoButtons from "../../pressable/TwoButtonsGroup";
import {FontFamily} from "../../../styles/FontFamily";

const GroupFilter = ({
        states: {
           selectedRoute,
           setSelectedRoute,
           selectedState,
           setSelectedState,
           selectedEndIn,
           setSelectedEndIn,

           resetAllFilters,
           refRBSheet,
        },
       }) => {
    const [routeLocal, setRouteLocal] = useState(selectedRoute);
    const [stateLocal, setStateLocal] = useState(selectedState);
    const [endInLocal, setEndInLocal] = useState(selectedEndIn);

    const route = [
        { key: "All", value: "All" },
        { key: "Air Standard", value: "Air Standard" },
        { key: "Air Sensitive", value: "Air Sensitive" },
        { key: "Sea Standard", value: "Sea Standard" },
        { key: "Sea Sensitive", value: "Sea Sensitive" }];

    const state = [{ key: "All", value: "All" }, ...ALL_STATES];

    const endIn = [
        { key: "All", value: "All" },
        { key: "7", value: "7 Days" },
        { key: "14", value: "14 Days" },
        { key: "31", value: "31 Days" },
    ];

    const resetHandler = () => {
        setSelectedRoute(selectedRoute);
        setSelectedState(selectedState);
        setSelectedEndIn(selectedEndIn);
        resetAllFilters();
    };

    const applyHandler = () => {
        setSelectedRoute(routeLocal);
        setSelectedState(stateLocal);
        setSelectedEndIn(endInLocal);

        refRBSheet.current.close();
    };

    return (
        <ScrollView
            style={styles.filterContainer}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.headerText}>Filter</Text>

            <Text style={styles.reminderText}>
                Arrange Based On The Following Choices
            </Text>

            <Text style={styles.optionText}>Route</Text>
            <SelectList
                setSelected={(val) => setRouteLocal(val)}
                data={route}
                save="value"
                search={false}
                inputStyles={{fontFamily: FontFamily.regular}}
                dropdownTextStyles={{fontFamily: FontFamily.regular}}
                defaultOption={{ key: selectedRoute, value: selectedRoute }}
            />

            <Text style={styles.optionText}>State</Text>
            <SelectList
                setSelected={(val) => setStateLocal(val)}
                data={state}
                save="value"
                inputStyles={{fontFamily: FontFamily.regular}}
                dropdownTextStyles={{fontFamily: FontFamily.regular}}
                defaultOption={{ key: selectedState, value: selectedState }}
            />

            <Text style={styles.optionText}>End in</Text>
            <SelectList
                setSelected={(val) => setEndInLocal(val)}
                data={endIn}
                save="value"
                inputStyles={{fontFamily: FontFamily.regular}}
                dropdownTextStyles={{fontFamily: FontFamily.regular}}
                defaultOption={{ key: selectedEndIn, value: selectedEndIn }}
                search={false}
            />

            <View style={styles.submitButtonContainer}>
                <TwoButtons
                    leftText="Reset"
                    rightText="Apply"
                    onButton1Press={resetHandler}
                    onButton2Press={applyHandler}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        marginHorizontal: 15,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
        marginLeft: 5,
        marginBottom: 5,
        fontFamily: FontFamily.bold,
    },
    optionText: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "left",
        marginTop: 20,
        marginLeft: 5,
        marginBottom: 5,
        fontFamily: FontFamily.bold,
    },
    reminderText: {
        fontSize: 14,
        textAlign: "left",
        marginLeft: 5,
        color: Colors.textGray,
        fontFamily: FontFamily.regular,
    },
    submitButtonContainer: {
        marginTop: 30,
    },
});

export default GroupFilter;