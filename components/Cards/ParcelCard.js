import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useEffect} from "react";
import {Feather} from '@expo/vector-icons';
import {Colors} from "../../styles/Colors";
import {getParcelTracking} from "../../api/parcel";
import {getShipGroupById} from "../../api/shipGroup";
import {FontFamily} from "../../styles/FontFamily";


const ParcelCard = ({navigation, ship, token}) => {
  const [deliveryStatus, setDeliveryStatus] = React.useState(null);
  const [shippingStatus, setShippingStatus] = React.useState("Status Loading...");
  const [detailedDeliveryStatus, setDetailDeliveryStatus] = React.useState([]);
  const [group, setGroup] = React.useState(null);

  React.useEffect(() => {
    const fetchedDeliveryStatus = async () => {
      const deliveryStatus = await getParcelTracking(
        {trackingNumber: ship.trackingNumber.replaceAll(' ', ''), courier: ship.courier});

      setDeliveryStatus(deliveryStatus.status);
      setDetailDeliveryStatus(deliveryStatus?.origin_info?.trackinfo);
    };
    fetchedDeliveryStatus().catch((e) => {
      console.log(e)
    });
  }, [ship]);

  React.useEffect(() => {
    if (ship.isShipped) {
      setShippingStatus("Shipped");
    } else if (ship.isWeighted) {
      setShippingStatus("Ready to ship");
    } else if (deliveryStatus === "delivered") {
      setShippingStatus("In the warehouse");
    } else {
      setShippingStatus(deliveryStatus);
    }
  }, [ship, deliveryStatus]);

  useEffect(() => {
    const fetchData = async () => {
      if (ship.shipGroup !== undefined && ship.shipGroup !== null) {
        try {
          const shipGroupId = ship.shipGroup;
          const group = await getShipGroupById({token, shipGroupId});
          setGroup(group);
        } catch (error) {
          console.log("Error fetching ship group: ", error, error?.response?.data);
        }
      }
    };

    fetchData();
  }, [ship?.shipGroup, token]);


  return (
    <Pressable style={styles.container}
               onPress={() => {
                 navigation.navigate("ParcelStatus", {ship, detailedDeliveryStatus})
               }}>
      {/*shipping number*/}
      <View style={styles.shippingNumberContainer}>
        <Feather name="arrow-left-circle" size={14} color="black"/>
        <View style={{width: 5}}></View>
        <Text style={styles.shippingNumberText}>{ship.trackingNumber}</Text>
      </View>


      <View style={styles.parcelDetailContainer}>
        {/*parcel image*/}
        <View style={styles.photoContainer}>
          <Image style={styles.photo}
                 source={
                   ship.picture?
                       {uri: ship.picture} :
                       require('../../assets/images/placeholder.png')
                 }
          />
        </View>

        {/*text status*/}
        <View style={styles.textStatusContainer}>
          <View style={{paddingTop: 10, flexDirection: 'row'}}>
            <Text numberOfLines={1} style={styles.categoryText}>{ship.name}</Text>
            {ship.phaseNumber === 0 ?
              <View style={{flexDirection: 'row'}}>
                <Text style={{top: -7, fontSize: 21, color: Colors.lineGray, marginHorizontal: 10}}>|</Text>
                <Text style={styles.weightText}>{ship.trackingNumber}</Text>
              </View>
              :
              <View>
              </View>
            }
          </View>
          <View style={{paddingTop: 4}}>
            <Text style={styles.hintText}>
              {shippingStatus}
            </Text>
          </View>
        </View>
        {shippingStatus === "Ready to ship" ?
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Groups')}>
              <Text style={styles.text}>Ship Now</Text>
            </Pressable>
          </View>
          :
          <View>
          </View>
        }
        {shippingStatus === "Shipped" ?
          <View style={styles.buttonContainer}>
            <Pressable style={styles.shippedButton}
                       onPress={() => navigation.navigate('ShipmentDetails', {ship: group})}>
              <Text style={styles.shippedText}>Shipped</Text>
            </Pressable>
          </View>
          :
          <View>
          </View>
        }
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingEnd: 10,
    width: '100%',
  },
  shippingNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  shippingNumberText: {
    fontFamily: FontFamily.regular,
    fontWeight: '800',
    fontSize: 15,
    lineHeight: 25,
    letterSpacing: 1,
    color: '#2C1F44',
  },

  textStatusContainer: {
    height: 50,
    marginTop: 8,
    paddingHorizontal: 20,
    width: 260
  },
  hintText: {
    fontFamily: FontFamily.regular,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 1,
    color: '#2C1F44'
  },
  categoryText: {
    color: Colors.buttonDarkGreen,
    fontFamily: FontFamily.regular,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 1,
    flexWrap: 'wrap',
    maxWidth: 150,
  },
  parcelDetailContainer: {
    flexDirection: 'row',
    // backgroundColor: 'green'
  },
  photo: {
    width: 55,
    height: 55,
    borderRadius: 18,
  },
  photoContainer: {
    width: '20%',
    left: 18,
    marginTop: 12,
    // backgroundColor: 'blue'
  },
  buttonContainer: {
    // width: '80%',
    // backgroundColor: 'red',
    position: 'absolute',
    right: 0,
    top: 20,
  },
  button: {
    backgroundColor: Colors.buttonDarkGreen,
    borderRadius: 15,
    height: 33,
    width: 88,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 15,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.regular,
  },
  weightText: {
    color: Colors.textGray,
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
  },
  shippedButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.buttonDarkGreen,
    borderWidth: 1,
    borderRadius: 15,
    height: 33,
    width: 88,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    marginTop: 10,
  },
  shippedText: {
    color: Colors.buttonDarkGreen,
    fontSize: 16,
    fontFamily: FontFamily.regular,
  },

})

export default ParcelCard;