import React, {useState, useEffect} from "react";
import {FlatList, Image, ScrollView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {Circle, Path, Rect, Svg} from "react-native-svg";
import {Colors} from "../../../styles/Colors.js";
import {FontSizes} from "../../../styles/FontSizes.js";
import ShippingStatusBar from "../../widgets/ShippingStatusBar.js";
import {DeliveryStatusCard} from "../../Cards/DeliveryStatusCard";
import {ItemCard} from "../../Cards/ItemCard";
import {getParcelsByShipGroupId, getParcelTracking} from "../../../api/parcel";
import {addDaysToUTCDate, convertDateToString} from "../../../api/convertDateToString";
import {useSelector} from "react-redux";
import {calculateDeliveryTime} from "../../../api/calculateDeliveryTime";
import {FontFamily} from "../../../styles/FontFamily";
import {IconButton} from "@react-native-material/core";
import {Feather} from "@expo/vector-icons";

const hintText = [
  'Order placed',
  'Packaged',
  'In Shipping',
  'Time to pick up the package!',
]

export const ShippingDetailScreen = ({navigation, route}) => {

  const {height, width} = useWindowDimensions();
  const [shipEndDate, setShipEndDate] = useState("Loading...");
  const ship = route.params.ship;
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [parcels, setParcels] = useState([]);
  const token = useSelector(state => state.auth.token);

  // Fetch the delivery status
  useEffect(() => {
    const fetchedDeliveryStatus = async () => {
      const deliveryStatus = ship.phaseNumber >= 2 ? await getParcelTracking(
          {trackingNumber: ship.trackingNumber.replaceAll(' ', ''), courier: 'dhl'}) : undefined;
      if (deliveryStatus) {
        setDeliveryStatus(deliveryStatus.origin_info.trackinfo);
        setShipEndDate(calculateDeliveryTime(ship, deliveryStatus.origin_info.trackinfo));
      } else {
        setShipEndDate(calculateDeliveryTime(ship));
      }
      const parcels = await getParcelsByShipGroupId({token, shipGroupId: ship.id});
      setParcels(parcels);
    };
    fetchedDeliveryStatus().catch((e) => {console.log(e)});
  }, [ship]);

  // Calculate the startDate and endDate
  const startDate = convertDateToString(ship.shipEndDate);

  return (
    <ScrollView>
      <View style={styles.container}>
        {/*<View style={styles.greenHeadPart}>*/}
        {/*  <Text style={styles.title}>Shipment Details</Text>*/}
        {/*</View>*/}
        <View style={styles.greenHeadPart}>
          <View style={{marginTop: 60, flexDirection:'row', alignItems:'center'}}>
            <IconButton
              icon={props => <Feather name="arrow-left" size={24} color={Colors.white}/>}
              onPress={() => navigation.goBack()}
              style={{ position: 'absolute', right: 230}}
            />
            <Text style={styles.title}>Shipment Details</Text>
          </View>
        </View>

        {/*Top container -- tracking number part*/}
        <View style={styles.topContainer}>
          <View style={styles.trackingNumberContainer}>
            <Text style={styles.trackingNumberText}>Tracking Number</Text>
            <Text style={styles.trackingNumber}>{ship.trackingNumber || "No Tracking Number Yet"}</Text>
          </View>

          <View style={styles.flexRow}>
            <View style={styles.ball}/>
            <View style={styles.breakLine}/>
            <View style={styles.ball}/>
          </View>

          {/*Middle part -- contact part*/}
          <View style={styles.addressContainer}>
            <View style={styles.addressTitlePart}>
              <Svg width="13" height="16" viewBox="0 0 13 16" fill="none">
                <Path
                  d="M12.25 6.625C12.25 11 6.625 14.75 6.625 14.75C6.625 14.75 1 11 1 6.625C1 5.13316 1.59263 3.70242 2.64752 2.64752C3.70242 1.59263 5.13316 1 6.625 1C8.11684 1 9.54758 1.59263 10.6025 2.64752C11.6574 3.70242 12.25 5.13316 12.25 6.625Z"
                  stroke="#F9C662"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M6.625 8.5C7.66053 8.5 8.5 7.66053 8.5 6.625C8.5 5.58947 7.66053 4.75 6.625 4.75C5.58947 4.75 4.75 5.58947 4.75 6.625C4.75 7.66053 5.58947 8.5 6.625 8.5Z"
                  stroke="#F9C662"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text style={styles.addressTitle}>Shipping address</Text>
            </View>
            <Text style={styles.nameText}>{ship.pickupLocation.name}</Text>
            <Text style={styles.contactText}>{ship.phoneNumber}</Text>
            <Text style={styles.contactText}>{ship.pickupLocation.address}</Text>
            <View style={{height: 50}}/>
          </View>

          <View style={styles.breakLine}/>

          {/*Status part -- shipping status*/}
          <View style={styles.flexRow}>
            <View style={styles.status1}>
              <Text style={styles.statusText}>{startDate}</Text>
              <Text style={styles.statusLocation}>Guangzhou</Text>
            </View>
            <Svg width="31" height="31" viewBox="0 0 31 31" fill="none">
              <Circle cx="15.5" cy="15.5" r="15.5" fill="#F7F7F7"/>
              <Path
                d="M14.938 19.7072L16.062 20.8311L21.3932 15.4999L16.062 10.1687L14.938 11.2926L18.3504 14.705H10.7308V16.2948H18.3504L14.938 19.7072Z"
                fill="#80B213"
              />
            </Svg>
            <View style={styles.status2}>
              <Text style={styles.statusText}>{shipEndDate}</Text>
              <Text style={styles.statusLocation}>{ship?.pickupLocation?.shortAddress?.split(",")[0]}</Text>
            </View>
          </View>
          <View style={{height: 30}}/>

          {/*animation status*/}
          <Text style={styles.shippingText}>{hintText[ship.phaseNumber]}</Text>
          <View style={styles.animationStatusContainer}>
            <ShippingStatusBar phaseNumber={ship.phaseNumber} animationWidth={width - 32 * 2 - 10}/>
          </View>
        </View>


        {/*Bottom Container*/}
        { ship.phaseNumber >= 2 &&
          <DeliveryStatusCard deliveryStatus={deliveryStatus}/>
        }

        {/*Detail items list*/}
        <View style={{marginTop: ship.phaseNumber >= 2 ? 30 : -10, width:'90%'}}>
          <ItemCard leftCornerIconColor={"#F9C662"}
            items={parcels}
            title={"Items Included"}/>
        </View>

        <View style={{height: 180}}/>
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.detailBackgroundGray,
    alignItems: 'center',
  },
  greenHeadPart: {
    backgroundColor: Colors.buttonDarkGreen,
    height: 170,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: FontSizes.pageTitle,
    // marginTop: 60,
    fontFamily: FontFamily.regular,
  },
  topContainer: {
    width: '90%',
    backgroundColor: Colors.white,
    alignItems: 'center',
    top: -50,
    borderRadius: 10,
  },
  trackingNumberContainer: {
    width: '90%',
    marginTop: 20,
    borderRadius: 10,
    borderStyle: 'dashed',
    height: 100,
    borderWidth: 2,
    borderColor: Colors.lineGray,
  },
  trackingNumberText: {
    color: Colors.textGray,
    marginTop: 20,
    alignSelf: 'center',
    fontSize: FontSizes.trackingLabel,
    fontFamily: FontFamily.regular,
  },
  trackingNumber: {
    color: Colors.blackText,
    marginTop: 8,
    alignSelf: 'center',
    fontSize: FontSizes.pageTitle,
    fontWeight: 'bold',
    fontFamily: FontFamily.bold,
  },
  flexRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  animationStatusContainer: {
    height: 56,
    marginTop: 8,
    alignItems: 'center',
  },
  ball: {
    width: 50,
    borderRadius: 50,
    height: 50,
    backgroundColor: Colors.detailBackgroundGray,
  },
  breakLine: {
    width: '88%',
    borderWidth: 0.5,
    borderColor: Colors.lineGray,
    borderStyle: 'dashed',
  },
  addressContainer: {
    width: '90%',
    marginTop: 20,
  },
  addressTitlePart: {
    flexDirection: 'row',
  },
  addressTitle: {
    color: Colors.textGray,
    marginLeft: 10,
    fontSize: FontSizes.bodyText,
    fontWeight: 'bold',
    fontFamily: FontFamily.bold,
  },
  nameText: {
    color: Colors.blackText,
    marginTop: 8,
    fontSize: FontSizes.groupCardText,
    fontWeight: 'bold',
    marginLeft: 22,
    fontFamily: FontFamily.bold,
  },
  contactText: {
    color: Colors.textGray,
    fontSize: FontSizes.groupCardText,
    marginTop: 8,
    marginLeft: 22,
    fontFamily: FontFamily.regular,
  },
  status1: {
    alignItems: 'flex-start',
    width: '40%',
  },
  status2: {
    alignItems: 'flex-end',
    width: '40%',
  },
  statusText: {
    color: Colors.textGray,
    fontSize: FontSizes.groupCardText,
    fontFamily: FontFamily.regular,
  },
  statusLocation: {
    color: Colors.buttonDarkGreen,
    fontSize: FontSizes.dimensionText,
    fontWeight: 'bold',
    fontFamily: FontFamily.bold,
  },
  shippingText: {
    color: Colors.blackText,
    fontSize: FontSizes.bodyText,
    marginBottom: 11,
    alignSelf: 'center',
    fontFamily: FontFamily.regular,
  },
  breakDeliveryLine: {
    width: 290,
    borderWidth: 0.5,
    borderColor: Colors.lineGray,
    borderStyle: 'dashed',
    marginVertical: 20,
  },
  deliveryBar: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 30
  },
  deliveryBarText: {
    marginLeft: 10,
    color: Colors.darkGrayBlack,
    fontSize: FontSizes.bodyText,
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
  },
  bottomContainer: {
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: 10,
  },

})