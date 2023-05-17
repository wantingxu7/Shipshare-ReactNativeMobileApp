import {Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";
import {Feather} from '@expo/vector-icons';
import ShippingStatusBar from "../widgets/ShippingStatusBar.js";
import {convertDateToString} from "../../api/convertDateToString";
import {calculateDeliveryTime} from "../../api/calculateDeliveryTime";
import {FontFamily} from "../../styles/FontFamily";

const hintText = [
  'Order placed',
  'Packaged',
  'In Shipping',
  'Time to pick up the package!',
]

const ShipmentCard = ({ship, animationWidth, navigation}) => {
  const endAddress = ship.pickupLocation.address.split(',');
  const endCity = endAddress[endAddress.length - 3];

  let endDateString = calculateDeliveryTime(ship, ship.deliveryStatus);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('ShipmentDetails', {ship})
      }}>
      {/*shipping number*/}
      <View style={styles.shippingNumberContainer}>
        <Feather name="arrow-left-circle" size={16} color="black"/>
        <View style={{width: 5}}></View>
        <Text style={styles.shippingNumberText}>{ship.trackingNumber || "No Tracking Number Yet"}</Text>
      </View>

      {/*animation status*/}
      <View style={styles.animationStatusContainer}>
        <ShippingStatusBar phaseNumber={ship.phaseNumber} animationWidth={animationWidth}/>
      </View>

      {/*shipping location*/}
      <View style={styles.shippingLocationContainer}>

        {/*departure location*/}
        <View>
          <Text style={styles.dateTextLeft}>{convertDateToString(ship.shipEndDate)}</Text>
          <Text style={styles.locationText}>Guangzhou</Text>
        </View>

        {/*arrow*/}
        <View style={styles.centerView}>
          <View style={styles.arrowBox}>
            <View style={[styles.centerView, styles.arrowBackground]}>
              <Feather name="arrow-right" size={16} color="#80B213"/>
            </View>
          </View>
        </View>

        {/*arrival location*/}
        <View>
          <Text style={styles.dateTextRight}>
            {endDateString}
          </Text>
          <Text style={styles.locationText}>
            {endCity}
          </Text>
        </View>
      </View>

      {/*text status*/}
      <View style={styles.textStatusContainer}>
        <Text style={styles.hintText}>
          {hintText[ship.phaseNumber]}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 18,
    width: '100%',
  },
  shippingNumberContainer: {
    flexDirection: 'row',
    height: 25,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  shippingNumberText: {
    fontFamily: FontFamily.bold,
    fontSize: 15,
    lineHeight: 25,
    letterSpacing: 1,
    color: '#2C1F44',
  },
  animationStatusContainer: {
    height: 56,
    marginTop: 8,
    alignItems: 'center',
  },
  dateTextLeft: {
    fontFamily: FontFamily.regular,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#9E9E9E',
  },
  shippingLocationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    height: 43,
    marginTop: 4,
    paddingHorizontal: 20,
  },
  dateTextRight: {
    fontFamily: FontFamily.regular,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#9E9E9E',
    textAlign: 'right',
  },
  centerView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBox: {
    width: 31,
    height: 31,
  },
  arrowBackground: {
    backgroundColor: '#f7f7f7',
    borderRadius: 32,
  },
  textStatusContainer: {
    height: 20, marginTop: 10, paddingHorizontal: 20,
  },
  locationText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 25,
    letterSpacing: 1,
    color: '#80B213',
  },
  hintText: {
    fontFamily: FontFamily.regular,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    letterSpacing: 0.5,
    color: '#2C1F44'
  },
})

export default ShipmentCard;
