import React, {useState} from "react";
import {View, Text, StyleSheet, Alert} from "react-native";
import {Colors} from "../../../styles/Colors";
import {IconButton} from "@react-native-material/core";
import {Feather} from '@expo/vector-icons';
import {FontSizes} from "../../../styles/FontSizes";
import {Input} from "react-native-elements";
import TwoButtonsGroup from "../../pressable/TwoButtonsGroup";
import ImagePickerButton from "../../pressable/ImagePickerButton";
import {useSelector} from "react-redux";
import {createParcel} from "../../../api/parcel";
import DropDownPicker from "react-native-dropdown-picker";
import {uploadImage} from "../../../api/imageUpload.js";
import {Header} from "../../widgets/Header";
import {FontFamily} from "../../../styles/FontFamily";

export const AddParcelScreen = ({navigation}) => {

  const [image, setImage] = React.useState(null);
  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Yunda Express', value: 'yunda'},
    {label: 'YTO Express', value: 'yto'}
  ]);
  const [parcelName, setParcelName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState('');
  let [hasErrorName, setHasErrorName] = useState(false);
  const [hasErrorNumber, setHasErrorNumber] = useState(false);
  const [hasErrorCourier, setHasErrorCourier] = useState(false);

  function isAlphanumeric(input) {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(input);
  }

  const verifyInput = () => {
    setHasErrorName(false)
    setHasErrorNumber(false)
    setHasErrorCourier(false)

    if (parcelName === '') {
      setHasErrorName(true)
      return "You didn't specify a parcel name, please fill that."
    }
    if (trackingNumber === '') {
      setHasErrorNumber(true)
      return "You didn't specify a trackingNumber, please fill that."
    }
    if (!isAlphanumeric(trackingNumber)) {
      setHasErrorNumber(true)
      return "You can only input number and character in trackingName field."
    }
    if (value === null) {
      setHasErrorCourier(true)
      return "Please select a courier."
    }
    return "";
  }

  return (
    <View style={styles.container}>

      {/*header*/}
      <View style={styles.header}>
        <Header leftComponent={<IconButton
              icon={props => <Feather name="arrow-left" size={24} color={Colors.black}/>}
              onPress={() => navigation.goBack()}/>}>
          Add a Parcel　
        </Header>
      </View>

      <View style={{height:50}}></View>
      <ImagePickerButton image={image} setImage={setImage}></ImagePickerButton>

      <View style={{
        alignItems: 'center',
        width: '100%',
        height: 600,
      }}>
        <View style={[styles.shadowProp, styles.parcelDetailContainer]} refreshControl>
          <View style={{margin: 20}}>
            <Input style={hasErrorName ? styles.inputError : styles.inputStyle}
                   onChangeText={(text) => {
                     setParcelName(text);
                   }}
                   label="Parcel Name"
                   labelStyle={hasErrorName ? styles.labelError : styles.labelStyle}/>
            <Input style={hasErrorNumber ? styles.inputError : styles.inputStyle}
                   onChangeText={setTrackingNumber}
                   label="Tracking Number"
                   labelStyle={hasErrorNumber ? styles.labelError : styles.labelStyle}/>
            <View style={{marginHorizontal: 9}}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={hasErrorCourier ? styles.dropDownError : styles.courier}
                placeholder="Select a Courier"
                textStyle={{fontFamily: FontFamily.regular}}
                onChangeValue={(value) => {
                  console.log("selected value", value);
                  setValue(value);
                }
                }
              />
            </View>
          </View>
        </View>
      </View>

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
          onButton2Press={async () => {
            try {
              const imageUrl = await uploadImage({fileUri: image, token});
              const parcel = {
                "name": parcelName,
                "trackingNumber": trackingNumber,
                'courier': value,
                'picture': imageUrl ? imageUrl : null,
              }
              const errorInInput = verifyInput();
              if (errorInInput !== "") {
                Alert.alert("Add parcel failed", errorInInput);
                return;
              }
              await createParcel({parcel, token});
            } catch (error) {
              console.log("Add parcel failed", error, error?.response?.data);
            }
            navigation.goBack();
          }}
        />
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    justifyContent: 'center',
    paddingTop: 65,
    paddingHorizontal: 24,
  },
  title: {
    position: 'absolute',
    width: 130,
    height: 25,
    left: 147.5,
    top: 68,
    display: 'flex',
    // alignItems: 'baseline',
    textAlign: 'center',
    // fontFamily: 'DM Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 24,
    color: '#141312',

  },

  parcelDetailContainer: {
    width: 330,
    height: 285,
    top: 100,
    backgroundColor: Colors.white,
    borderRadius: 15,
    shadowColor: Colors.black,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  buttonLineContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  topLineContainer: {
    flex: 1,
    display: 'flex',
    marginHorizontal: -5,
    // marginTop: 70,
  },
  titleText: {
    fontFamily: "NunitoSans",
    fontSize: FontSizes.pageTitle,
    textAlign: "center",
    color: Colors.black,
    position: "absolute",
    left: 142,
    top: 64,
  },
  backButtonView: {
    position: "absolute",
    left: 30,
    top: 55,
  },
  labelStyle: {
    fontFamily: FontFamily.regular,
    color: Colors.blackText,
    fontSize: 14,
  },
  inputStyle: {
    fontFamily: FontFamily.medium,
    color: Colors.blackText,
    fontSize: 16,
  },
  shadowProp: {
    shadowColor: "rgb(158, 158, 158)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 5,
  },
  inputError: {
    borderBottomWidth: 1,
    borderColor: 'red',
    color: 'red',
    padding: 10,
  },
  courier: {
    borderColor: Colors.gray
  },
  labelError: {
    fontFamily: FontFamily.regular,
    color: 'red',
    fontSize: 14,
  },
  dropDownError: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'red',
    color: 'red',
    padding: 10,
  },
})