import {Image, Text, View, StyleSheet, FlatList, Platform} from "react-native";
import {Path, Svg} from "react-native-svg";
import React from "react";
import {Colors} from "../../styles/Colors";
import {FontSizes} from "../../styles/FontSizes";
import {FontFamily} from "../../styles/FontFamily";

export const CheckoutItemCard = ({item}) => {
  return (
    <View style={styles.bottomContainer}>
      {/*Item list*/}
      <View style={{marginHorizontal: 20, marginBottom: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.tinyLogo}
            source={
              item.picture ?
                {uri: item.picture} :
                require('../../assets/images/placeholder.png')
            }
          />
          <View style={styles.itemContainer}>
            <Text numberOfLines={1} style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemNumber}>{item.trackingNumber}</Text>
            <Text style={styles.weightText}>{item.weight} kg</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 10,
  },
  itemContainer: {
    marginLeft: 14,
    marginTop: -5,
    right: 5,
  },
  itemTitle: {
    paddingTop: 3,
    color: Colors.blackText,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 25,
    letterSpacing: 1,
    fontFamily: FontFamily.regular,
    flexWrap: 'wrap',
    maxWidth: Platform.OS === 'ios' ? 230 : 250,

  },
  itemNumber: {
    fontFamily: FontFamily.regular,
    fontWeight: '800',
    fontSize: 12,
    lineHeight: 25,
    letterSpacing: 1,
    color: Colors.textGray,
  },
  weightText: {
    color: Colors.blackText,
    fontFamily: FontFamily.regular,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 25,
  },
  deliveryBar: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20
  },
  deliveryBarText: {
    marginLeft: 10,
    color: Colors.darkGrayBlack,
    fontSize: FontSizes.bodyText,
    letterSpacing: 1,
  },
  deliveryTextCurrent: {
    color: Colors.buttonDarkGreen,
    fontSize: FontSizes.bodyText,
    marginBottom: 5,
  },
  deliveryDateText: {
    color: Colors.textGray,
    fontSize: FontSizes.bodyText,
  },
  deliveryText: {
    color: Colors.darkGrayBlack,
    fontSize: FontSizes.bodyText,
    marginBottom: 5,
  },
  tinyLogo: {
    width: 72,
    height: 72,
    borderRadius: 10,
  },
})