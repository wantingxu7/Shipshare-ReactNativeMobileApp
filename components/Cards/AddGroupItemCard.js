import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {Feather} from '@expo/vector-icons';
import {Colors} from "../../styles/Colors";
import {FontSizes} from "../../styles/FontSizes";
import {CheckBox} from "@rneui/themed";


const AddGroupItemCard = ({ship, animationWidth}) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      {/*shipping number*/}
      <View style={styles.shippingNumberContainer}>
        <Feather name="arrow-left-circle" size={16} color="black"/>
        <View style={{width: 5}}></View>
        <Text style={styles.shippingNumberText}>{ship.shippingId}</Text>
      </View>


      <View style={styles.parcelDetailContainer}>
        <View style={styles.checkBoxContainer}>
          <CheckBox value={isChecked} onValueChange={setChecked}/>
        </View>
        {/*parcel image*/}
        <View style={styles.photoContainer}>
          <Image style={styles.photo}
                 source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
        </View>

        {/*text status*/}
        <View style={styles.textStatusContainer}>
          <View style={{paddingTop: 10, flexDirection: 'row'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.categoryText}>{ship.category}</Text>
              <Text style={styles.weightText}>5kg</Text>
            </View>

          </View>

        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingEnd: 10,
    width: '100%'
  },
  shippingNumberContainer: {
    flexDirection: 'row', height: 25, alignItems: 'center', paddingHorizontal: 20
  },
  shippingNumberText: {
    fontFamily: 'NunitoSans',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 1,
    color: '#2C1F44',
  },

  textStatusContainer: {
    display: 'flex',
    flexGrow: 10,
    height: 50,
    marginTop: 10,
    left: 10
  },

  categoryText: {
    color: Colors.buttonDarkGreen,
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 19,
    lineHeight: 25,
    letterSpacing: 1,
  },
  parcelDetailContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent:`flex-start`,
    // backgroundColor: 'green'
  },
  photo: {
    width: 55,
    height: 55,
    borderRadius: 10,
  },
  photoContainer: {
    width: '20%',
    top: 22,
    // backgroundColor: 'blue'
  },

  weightText: {
    color: Colors.textGray,
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 25,

  },
  checkBoxContainer: {
    top: 20,
    left: 5,
  }

})

export default AddGroupItemCard;
