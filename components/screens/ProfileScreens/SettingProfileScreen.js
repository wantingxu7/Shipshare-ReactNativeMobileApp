import React from "react";
import {View, Text, StyleSheet, Pressable, Dimensions, Image} from "react-native";
import {Colors} from "../../../styles/Colors";
import {TextInput, IconButton, Switch, Button} from "@react-native-material/core";
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {FontSizes} from "../../../styles/FontSizes";
import {Input} from "react-native-elements";
import TwoButtonsGroup from "../../pressable/TwoButtonsGroup";
import ImagePickerButton from "../../pressable/ImagePickerButton";
import {uploadImage} from "../../../api/imageUpload.js";
import {useDispatch, useSelector} from "react-redux";
import {changeAvatar} from "../../../api/user.js";
import {setUser} from "../../../redux/auth.js";

export const SettingProfileScreen = ({navigation}) => {
  const avatarUser = useSelector(state => state.auth.user.avatar);
  const [image, setImage] = React.useState(avatarUser);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user.id);


  async function handleSaveButtonPress() {

    try {
      const imageUrl = await uploadImage({fileUri: image, token});
      const user = await changeAvatar({token, userId, imageUrl});
      dispatch(setUser(user));

    } catch (error) {
      console.log("error in handleSaveButtonPress", error, error?.response?.message);
    }
    navigation.goBack();
  }

  return (

    <View style={styles.container}>

      <View style={styles.topLineContainer}>
        <View style={styles.backButtonView}>
          <IconButton
            icon={props => <Feather name="arrow-left" size={24} color="black"/>}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View>
          <Text style={styles.titleText}>Update Profile</Text>
        </View>
      </View>
      <ImagePickerButton image={image} setImage={setImage}></ImagePickerButton>

      <View style={{alignItems: 'center', width: '100%', height: 577}}>
        <View style={[styles.shadowProp, styles.cardContainer]}>
          <View style={{margin: 20}}>
            <Input label="Name" labelStyle={styles.labelStyle}/>
            <Input label="Phone Number" labelStyle={styles.labelStyle}/>
            <Input label="Your Address" labelStyle={styles.labelStyle}/>
            <View style={{flexDirection: 'row'}}>
              <Input label="County" containerStyle={{width: '50%'}} labelStyle={styles.labelStyle}/>
              <Input label="State" containerStyle={{width: '50%'}} labelStyle={styles.labelStyle}/>
            </View>
            <Input label="Postcode" containerStyle={{width: '50%'}} labelStyle={styles.labelStyle}/>
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
          onButton2Press={() => handleSaveButtonPress()}
        />
      </View>
    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'flex-start'
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
  cardContainer: {
    width: "86%",
    height: 460,
    backgroundColor: Colors.white,
    borderRadius: 15,
    shadowColor: Colors.black,

  },
  labelStyle: {
    color: Colors.black,
    fontWeight: '300',
    fontSize: 14,
  },
  parcelDetailContainer: {
    position: 'absolute',
    width: 330,
    height: 238,
    left: 31,
    top: 250,

  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
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
  photo: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  photoContainer: {
    position: 'absolute',
    width: 129,
    height: 129,
    left: 150,
    top: 110,
  },
  topLineContainer: {
    flex: 1,
    display: 'flex',
    marginHorizontal: -5,
    // flexDirection: 'row',

  },
  titleText: {
    fontSize: FontSizes.pageTitle,
    textAlign: "center",
    color: Colors.black,
    position: "absolute",
    left: 140,
    top: 54,
  },
  backButtonView: {
    position: "absolute",
    left: 30,
    top: 55,
    alignItems: 'flex-start',
  },
  shadowProp: {
    shadowColor: Colors.textGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

})