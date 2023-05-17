import React, {useEffect, useRef, useState} from "react";
import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import {Colors} from "../../../styles/Colors";
import {FontSizes} from "../../../styles/FontSizes";
import {GroupCard} from "../../Cards/GroupCard";
import {ButtonGroup} from "../../pressable/ButtonGroup";
import {Header} from "../../widgets/Header";
import {FilterButton} from "../../pressable/FilterButton";
import RBSheet from "react-native-raw-bottom-sheet";
import GroupFilter from "./GroupFilter";
import {AddButton} from "../../pressable/AddButton";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {FormGroupScreen} from "./FormGroupScreen";
import {getShipGroupsByUserEmail} from "../../../api/shipGroup";
import {useDispatch, useSelector} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import {stateFullNameToAbbr} from "./allStates";
import {getUserLocation, calculateLocation} from "../../../api/location";
import {FontFamily} from "../../../styles/FontFamily";
import {updateGroups} from "../../../redux/group-reducer.js";


const GroupMainScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [tab, setTab] = useState('Latest');
  const [selectedRoute, setSelectedRoute] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedEndIn, setSelectedEndIn] = useState("All");

  // Get and set groups from redux
  const groups = useSelector((state) => state.group.groups);
  const setGroups = (groups) => {
    dispatch(updateGroups(groups));
  }

  const [filteredGroups, setFilteredGroups] = useState([]);

  const isFocused = useIsFocused();
  const [userLocation, setUserLocation] = useState(null);

  const resetAllFilters = () => {
    setSelectedRoute("All");
    setSelectedState("All");
    setSelectedEndIn("All");
  }
  const refRBSheet = useRef();

  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);

  // Get user location
  useEffect(() => {
    getUserLocation().then((location) => setUserLocation(location));
  }, []);

  useEffect(() => {
    // Fetch data from the database
    const fetchShips = async () => {
      const groups = await getShipGroupsByUserEmail({token, email});
      setGroups(groups);
    }
    fetchShips().catch((err) => console.log("error fetching ships " + err));
  }, [token, email, isFocused]);


  // filter
  useEffect(() => {
    if (groups === undefined) {
      return;
    }

    let filteredGroups = groups
      .filter((group) => {
        // filter out group that has already ended.
        if (group.shipEndDate === null || group.shipEndDate === undefined) {
          return false;
        }

        const shipEndDate = new Date(group.shipEndDate);
        const currentDate = new Date();
        if (shipEndDate < currentDate) {
          return false;
        }
        // filter by route
        if (selectedRoute !== 'All' && group.shipRoute !== selectedRoute) {
          return false;
        }
        // filter by state
        if (selectedState !== 'All'
          && (
            group.pickupLocation === null
            || group.pickupLocation === undefined
            || group.pickupLocation.shortAddress.slice(-2) !== stateFullNameToAbbr[selectedState]
          )
        ) {
          return false;
        }
        // filter by end date
        if (selectedEndIn !== 'All') {
          const today = new Date();
          const diffTime = Math.abs(shipEndDate - today);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const filterDays = selectedEndIn.replace(" Days", "");
          return diffDays <= parseInt(filterDays);
        }
        return true;
      }).sort((a, b) => {
        // sort by distance
        if (tab === 'Latest') {
          return new Date(b.created) - new Date(a.created);
        }
        // sort by distance
        else if (tab === 'By Distance') {
          let aDistance = calculateLocation(userLocation?.lat, userLocation?.lng, a.pickupLocation.geoLatitude, a.pickupLocation.geoLongitude);
          let bDistance = calculateLocation(userLocation?.lat, userLocation?.lng, b.pickupLocation.geoLatitude, b.pickupLocation.geoLongitude);
          return aDistance - bDistance;
        }
        // sort by end date
        else if (tab === 'By End Date') {
          return new Date(a.shipEndDate) - new Date(b.shipEndDate);
        } else {
          return 0;
        }
      });
    setFilteredGroups(filteredGroups);
  }, [
    selectedRoute,
    selectedState,
    selectedEndIn,
    tab,
    groups
  ]);

  return (
    <View style={styles.container}>
      {/*header*/}
      <Header
        leftComponent=
          {<FilterButton
            onPress={() => refRBSheet.current.open()}
            size={23}
            length={40}
          />}
        rightComponent=
          {<AddButton
            onPress={() => navigation.navigate('FormGroup')}
            size={23}
            length={40}
          />}
      >
        Ongoing Groups
      </Header>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        keyboardAvoidingViewEnabled={true}
        customStyles={styles.RBSheetCustomStyles}
        height={495}
      >
        <GroupFilter
          states={{
            selectedRoute,
            setSelectedRoute,
            selectedState,
            setSelectedState,
            selectedEndIn,
            setSelectedEndIn,

            resetAllFilters,
            refRBSheet
          }}
        />
      </RBSheet>
      <ButtonGroup
        selections={['Latest', 'By Distance', 'By End Date']}
        selectedValue={tab}
        setSelectedValue={setTab}
        marginHorizontal={0}
      />
      {/*main content -- group list*/}
      {groups === undefined || groups.length === 0 ?
        <View style={styles.centerView}>
          <Image source={require('../../../assets/images/no_order_image.png')}/>
          <View style={{height: 20}}></View>
          <Text style={styles.noOngoingText}>No ongoing groups</Text>
        </View>
        :
        <FlatList data={filteredGroups} renderItem={({item}) => (
          <GroupCard
            group={item}
            distance={calculateLocation(userLocation?.lat, userLocation?.lng, item.pickupLocation.geoLatitude, item.pickupLocation.geoLongitude)}
            navigation={navigation}
          />
        )}/>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    paddingTop: 65,
    paddingHorizontal: 24,
    width: '100%',
  },
  title: {
    marginTop: 50,
    color: Colors.black,
    fontSize: FontSizes.iconSize,
    alignSelf: 'center',
  },
  RBSheetCustomStyles: {
    wrapper: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      container: {
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
      },
      draggableIcon: {
        backgroundColor: "#EFEFEF",
        width: 100,
      },
    },
    container: {
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
    },
  },
  addButton: {
    width: 46,
    height: 46,
    borderRadius: 30,
    backgroundColor: Colors.textOrange,
    position: 'absolute',
    bottom: 15,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noOngoingText: {
    fontFamily: FontFamily.regular,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    textAlign: 'center',
    letterSpacing: 1,
    color: Colors.darkGrayBlack,
  }
})

const GroupMainScreenAll = ({navigation}) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="GroupMainScreen">
      <Stack.Screen
        name="GroupMainScreen"
        component={GroupMainScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FormGroupScreen"
        component={FormGroupScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>)
}

export default GroupMainScreenAll;