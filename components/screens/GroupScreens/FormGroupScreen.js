import React, {useState} from "react";
import {StyleSheet, Text, View, Pressable, Alert, ScrollView, KeyboardAvoidingView} from "react-native";
import {Colors} from "../../../styles/Colors";
import {FontSizes} from "../../../styles/FontSizes";
import {Input} from 'react-native-elements';
import TwoButtonsGroup from "../../pressable/TwoButtonsGroup";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Svg, {Path} from 'react-native-svg';
import {REACT_APP_GOOGLE_API_KEY} from "@env";
import DropDownPicker from "react-native-dropdown-picker";
import {createParcel} from "../../../api/parcel";
import {useSelector} from "react-redux";
import {createShipGroup} from "../../../api/shipGroup";
import { Client } from "@googlemaps/google-maps-services-js";
import {Header} from "../../widgets/Header";
import {FontFamily} from "../../../styles/FontFamily";

export const FormGroupScreen = ({navigation}) => {
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [groupName, setGroupName] = useState("");
  const [receiver, setReceiver] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState(null);
  const [items, setItems] = useState([
    {label: 'Air Standard', value: 'Air Standard'},
    {label: 'Air Sensitive', value: 'Air Sensitive'},
    {label: 'Sea Standard', value: 'Sea Standard'},
    {label: 'Sea Sensitive', value: 'Sea Sensitive'}
  ]);
  let [hasErrorGroupName, setHasErrorGroupName] = useState(false);
  let [hasErrorReceiver, setHasErrorReceiver] = useState(false);
  let [hasErrorEndDate, setHasErrorEndDate] = useState(false);
  let [hasErrorRoute, setHasErrorRoute] = useState(false);
  let [hasErrorAddress, setHasErrorAddress] = useState(false);
  let [hasErrorPhone, setHasErrorPhone] = useState(false);
  const verifyInput = () => {
    setHasErrorGroupName(false)
    setHasErrorReceiver(false)
    setHasErrorEndDate(false)
    setHasErrorRoute(false)
    setHasErrorAddress(false)
    setHasErrorPhone(false)

    if (groupName === '') {
      setHasErrorGroupName(true)
      return "You didn't specify a group name, please fill that."
    }
    if (receiver === '') {
      setHasErrorReceiver(true)
      return "You didn't specify a receiver, please fill that."
    }
    if (phone === '') {
      setHasErrorPhone(true)
      return "You didn't provide phone number, please fill that."
    }
    if (selectedDate === null) {
      setHasErrorEndDate(true)
      return "You didn't pick an end date."
    }
    if (route === null) {
      setHasErrorRoute(true)
      return "You didn't pick a shipping route."
    }
    if (address === '') {
      setHasErrorAddress(true)
      return "Please enter a valid address."
    }

    return "";
  }

  const onDateChange = (selectedDate) => {
    setShow(false);
    setSelectedDate(selectedDate);
  };
  const convertDateToStr = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const onSubmitGroup = () => {
    const shipGroup = {
      "name": groupName,
      "shipRoute": route,
      'shipEndDate': selectedDate,
      'courier': 'dhl',
      'phoneNumber': phone,
      "pickupLocation": {
        "name": receiver,
        "address": address,
      },
    }
    const create = async () => {
      const googleMapClient = new Client({});
      const placeDetailsResponse = await googleMapClient
          .placeDetails({
            params: {
              place_id: placeId,
              key: REACT_APP_GOOGLE_API_KEY,
            },
          });
      const geoLocation = placeDetailsResponse?.data?.result?.geometry?.location;
      const shipGroup = {
        "name": groupName,
        "shipRoute": route,
        'shipEndDate': selectedDate,
        'courier': 'dhl',
        "pickupLocation": {
          "name": email,
          "address": address,
          "geoLatitude": geoLocation.lat,
          "geoLongitude": geoLocation.lng,
          "shortAddress": shortAddress,
        },
        "phaseNumber": 0,
      }
      const response = await createShipGroup({shipGroup, token});
    };
    create().then(() => navigation.goBack()).catch((err) => console.log(err));
  };

  const [placeId, setPlaceId] = useState("");
  const [address, setAddress] = useState("");
  const [shortAddress, setShortAddress] = useState("");
  DropDownPicker.setMode("BADGE");

  return (
    <View style={styles.container}>
      {/*<Text style={styles.title}>Form a Group</Text>*/}
      {/*header*/}
      <View style={styles.header}>
        <Header>
          Form a Group
        </Header>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <View
          style={styles.cardContainer}
          keyboardShouldPersistTaps="handled"
        >
          <ScrollView keyboardShouldPersistTaps={'handled'}>

            <View style={{marginTop: 25}}>
              <Input label="Group Name"
                     labelStyle={hasErrorGroupName ? styles.errorLabelStyle : styles.labelStyle}
                     style={hasErrorGroupName ? {borderBottomWidth: 1, borderColor: 'red'} : styles.labelStyle}
                     value={groupName}
                     onChangeText={setGroupName}/>
            </View>
            <View>
              <Input label="Receiver"
                     labelStyle={hasErrorReceiver ? styles.errorLabelStyle : styles.labelStyle}
                     style={hasErrorReceiver ? {borderBottomWidth: 1, borderColor: 'red'} : styles.labelStyle}
                     value={receiver}
                     onChangeText={setReceiver}/>
            </View>
            <View style={{marginTop: 0}}>
              <Input label="Phone Number"
                     labelStyle={hasErrorPhone ? styles.errorLabelStyle : styles.labelStyle}
                     style={hasErrorPhone ? {borderBottomWidth: 1, borderColor: 'red'} : styles.labelStyle}
                     value={phone}
                     onChangeText={setPhone}/>
            </View>

            {/*date picker*/}
            <View style={{marginBottom: 20, marginLeft: 10}}>
              <Text
                style={hasErrorEndDate ? styles.errorEndDate : styles.labelDateStyle}
              >
                End Date</Text>
              <Pressable
                onPress={() => setShow(!show)}
                style={hasErrorEndDate ? styles.errorEndDateView : styles.dateButtonView}
              >
                <Text style={styles.dateButtonText}>
                  <View style={{marginTop: -10, height: 25}}>
                    <Svg width="12" height="15" viewBox="0 0 13 8">
                      <Path
                        d="M11.7705 0.233974C12.0509 -0.0770438 12.5065 -0.0781274 12.7881 0.231554C13.0442 0.513083 13.0682 0.954524 12.8598 1.26613L12.7903 1.35543L7.01042 7.76603C6.75473 8.04961 6.35356 8.07541 6.0714 7.84341L5.99059 7.76607L0.209717 1.35548C-0.0707263 1.04448 -0.069783 0.541308 0.211824 0.231601C0.46783 -0.0499514 0.867657 -0.0746861 1.14894 0.156797L1.2295 0.233927L6.50077 6.07873L11.7705 0.233974Z"
                        fill="#F9C662"/>
                    </Svg>
                  </View>
                  {selectedDate === null ? "  Pick a date" : convertDateToStr(selectedDate)}
                </Text>
              </Pressable>
            </View>
            {show && (
              <View style={styles.calendarContainer}>
                <CalendarPicker
                  scaleFactor={420}
                  textStyle={styles.calendarTextStyle}
                  minDate={new Date()}
                  todayBackgroundColor={Colors.white}
                  headerWrapperStyle={styles.calendarHeader}
                  modalProps={{
                    presentationStyle: 'overFullScreen',
                    transparent: true,
                    animationType: 'fade',
                  }}
                  onDateChange={onDateChange}
                />
              </View>
            )}

            {/*/!*shipping route*!/*/}
            <Text style=
                    {[{left: 10}, hasErrorRoute ? styles.errorLabelDateStyle : styles.labelDateStyle]}
            >Shipping Route</Text>
            <DropDownPicker
              open={open}
              value={route}
              items={items}
              setOpen={setOpen}
              setValue={setRoute}
              setItems={setItems}
              textStyle={{fontFamily: FontFamily.regular}}
              // zIndex={999}
              // modal={true}
              // useNativeAndroidPickerStyle={true}
              dropDownDirection={"TOP"}
              style={hasErrorRoute ? {borderColor: 'red'} : styles.routePicker}
              selectedItemContainerStyle={{
                backgroundColor: Colors.backgroundGray,
              }}
              listItemContainerStyle={{
                height: 40
              }}
              listItemLabelStyle={{fontFamily: FontFamily.regular}}
              containerStyle={{
                width: '93%',
                left: 10,
              }}
              dropDownContainerStyle={{}}
              placeholder="Select a Route"
              onChangeValue={(value) => {
                console.log("selected value", value);
                setRoute(value);
              }
              }
            />
            <View style={{height: 15}}></View>

            {/*Address -- Google Places Autocomplete*/}
            <View>
              <Text style={[hasErrorAddress ? {color: 'red',fontFamily: FontFamily.bold,} : styles.labelStyle, {
                marginLeft: '3%',
                marginBottom: 15
              }]}>Your Address</Text>
              <GooglePlacesAutocomplete
                placeholder="Your Address"
                query={{
                  key: REACT_APP_GOOGLE_API_KEY,
                  language: "en", // language of the results
                }}
                textInputProps={{
                  label: "Your Address",
                  color: Colors.blackText,
                }}
                onPress={(data, details = null) => {
                  setAddress(data.description);
                  setPlaceId(data.place_id);
                  setShortAddress(
                    data.terms.at(-3).value + ", " + data.terms.at(-2).value
                  );
                }}
                styles={{
                  textInput: {
                    height: 52,
                    width: "100%",
                    color: Colors.black,
                    // backgroundColor: Colors.buttonDarkGreen,
                    fontSize: FontSizes.bodyText,
                    // paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: hasErrorAddress ? 'red' : 'black',
                    borderRadius: 8,
                    fontFamily: FontFamily.regular,
                  },
                  container: {
                    color: Colors.black,
                    width: "93%",
                    alignSelf: "center",
                  },
                  description: {
                    fontSize: FontSizes.bodyText,
                    fontFamily: FontFamily.regular,
                  },
                }}
                onFail={(error) => console.log(error)}
              />
            </View>


          </ScrollView>

        </View>
      </KeyboardAvoidingView>

      <View style={{
        width: '100%',
        paddingHorizontal: 31,
        position: 'absolute',
        bottom: 0,
        marginBottom: 41,
      }}>
        <TwoButtonsGroup
          leftText={'Cancel'} rightText={'Save'}
          onButton1Press={() => navigation.goBack()}
          onButton2Press={() => {

            const errorInInput = verifyInput();
            if (errorInInput !== "") {
              Alert.alert("Form group failed", errorInInput);
              return;
            }
            onSubmitGroup()
          }}
        ></TwoButtonsGroup>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // justifyContent: 'flex-start',
    width: '100%',
    // alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    paddingTop: 65,
    paddingHorizontal: 24,
  },
  input:{
    fontFamily: FontFamily.bold,
  },
  title: {
    color: Colors.black,
    fontSize: FontSizes.pageTitle,
    // fontWeight: 400,
    marginBottom: 80,
    marginTop: 50,
    top: 20
  },
  cardContainer: {
    position: 'absolute',
    width: "86%",
    height: '78%',
    // top: -35,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingBottom: 20,

    shadowColor: "rgb(158, 158, 158)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 5,

  },
  labelStyle: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: FontFamily.regular,
  },
  labelDateStyle: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: "normal",
    // marginLeft: 11,
    paddingBottom: 20,
    fontFamily: FontFamily.regular,
  },
  errorLabelDateStyle: {
    color: 'red',
    fontSize: 14,
    fontWeight: "normal",
    // marginLeft: 11,
    paddingBottom: 20,
    fontFamily: FontFamily.regular,
  },
  shadowProp: {
    shadowColor: Colors.textGray,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 24,
    justifyContent: 'space-evenly',
  },
  calendarContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    paddingVertical: 5,
    marginVertical: 50,
    width: 308,
    position: 'absolute',
    top: 90,
    zIndex: 99,

  },
  calendarTextStyle: {
    color: Colors.darkGrayBlack,
    fontSize: 11,
    fontFamily: FontFamily.regular,
  },
  calendarHeader: {
    paddingHorizontal: 50,
  },
  dateButtonView: {
    alignItems: "flex-start",
    padding: 10,
    width: "96%",
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    // top: 100

  },
  errorEndDateView: {
    alignItems: "flex-start",
    padding: 10,
    width: "96%",
    borderBottomWidth: 1,
    borderColor: 'red',

  },
  dateButtonText: {
    textAlign: "center",
    fontSize: FontSizes.bodyText,
    height: 30,
    // paddingTop: 5,
    color: Colors.statusOrange,
    marginBottom: -10,
    marginTop: -10,
    fontFamily: FontFamily.regular,
  },
  routePicker: {
    // zIndex: 999,
    // backgroundColor: 'red'
  },
  errorEndDate: {
    color: 'red',
    fontSize: 14,
    // fontWeight: 300,
    // marginLeft: 11,
    paddingBottom: 20
  },
  errorLabelStyle: {
    color: "red",
    fontFamily: FontFamily.regular,
  }
})