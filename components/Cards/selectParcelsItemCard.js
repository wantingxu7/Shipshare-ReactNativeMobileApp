import {Image, Platform, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {Colors} from "../../styles/Colors";
import {CheckBox} from "@rneui/themed";
import {useDispatch, useSelector} from "react-redux";
import {FontFamily} from "../../styles/FontFamily";

const selectParcelsItemCard = ({ship, animationWidth, selectAll, totalWeight, updateTotalWeight, checkFlipNotifier}) => {

  const dispatch = useDispatch();
  const {weight} = useSelector(state => state.parcel);


  const checkHandler = () => {
    if (ship.check === true) {
      updateTotalWeight(-ship.weight);
      ship.check = !ship.check;
    } else {
      updateTotalWeight(ship.weight);
      ship.check = !ship.check;
    }
    checkFlipNotifier();
  }

  return (
    <View style={styles.container}>

      <View style={styles.parcelDetailContainer}>

        <View style={styles.checkBoxContainer}>
          <CheckBox
            center
            checked={ship.check}
            checkedColor={Colors.buttonDarkGreen}
            onPress={checkHandler}
          />
        </View>
        {/*parcel image*/}
        <View style={styles.photoContainer}>
          <Image style={styles.photo}
                 source={{uri: ship.picture || 'https://reactnative.dev/img/tiny_logo.png'}}/>
        </View>

        {/*text status*/}
        <View style={styles.textStatusContainer}>
          <View style={{paddingTop: 10, flexDirection: 'row'}}>
            <View style={{flexDirection: 'column'}}>
              {/*parcel name*/}
              <Text numberOfLines={1} style={styles.categoryText}>{ship.name}</Text>
              {/*shipping number*/}
              <Text style={styles.shippingNumberText}>{ship.trackingNumber}</Text>
              {/*parcel weight*/}
              <Text style={styles.weightText}>{ship.weight || 'Unweighted'} kg</Text>
            </View>
          </View>
        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  shippingNumberText: {
    fontFamily: FontFamily.regular,
    fontWeight: '800',
    fontSize: 12,
    lineHeight: 25,
    letterSpacing: 1,
    color: Colors.textGray,
  },

  textStatusContainer: {
    display: 'flex',
    flexGrow: 10,
    height: 40,
    marginTop: 10,
    left: 10
  },

  categoryText: {
    color: Colors.blackText,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 25,
    letterSpacing: 1,
    fontFamily: FontFamily.regular,
    flexWrap: 'wrap',
    maxWidth: 190,
  },
  parcelDetailContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: `flex-start`,
  },
  photo: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },
  photoContainer: {
    width: '20%',
    top: 22,
  },

  weightText: {
    color: Colors.blackText,
    fontFamily: FontFamily.regular,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 25,

  },
  checkBoxContainer: {
    top: 35,
    left: 5,
  }

})

export default selectParcelsItemCard;