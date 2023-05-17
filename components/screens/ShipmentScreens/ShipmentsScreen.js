import React, {useEffect, useState} from "react";
import {FlatList, Image, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {ShippingDetailScreen} from "./ShipmentDetailScreen.js";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ShipmentCard from "../../Cards/ShipmentCard.js";
import {editShipGroup, getShipGroupsByMembersEmail} from "../../../api/shipGroup.js";
import {getParcelTracking, multiGetParcelTrackings} from "../../../api/parcel.js";
import {Header} from "../../widgets/Header";
import {FontFamily} from "../../../styles/FontFamily";
import {Colors} from "../../../styles/Colors";
import {updateShipments} from "../../../redux/group-reducer.js";

const exampleDeliveryStatus = {
  "Date": "2023-02-14 19:22:00",
  "Details": "SAN JOSE, CA - USA",
  "StatusDescription": "Delivered",
  "checkpoint_status": "delivered",
  "substatus": "delivered001"
};


const ShipmentsScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {height, width} = useWindowDimensions();

  // const [ships, setShips] = useState([]);
  const ships = useSelector((state) => state.group.shipments);
  const setShips = (ships) => {
    dispatch(updateShipments(ships));
  };

  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);

  useEffect(() => {
    const fetchShips = async () => {
      const shipments = await getShipGroupsByMembersEmail({token, email});
      const trackings = await multiGetParcelTrackings({parcels: shipments});
      const trackingMap = {};
      trackings?.forEach((tracking) => {
        trackingMap[tracking.trackingNumber] = tracking?.data;
      });
      const shipmentsWithTracking = shipments.map((shipment) => {
        const tracking = trackingMap[shipment.trackingNumber];

        // Update phaseNumber of shipment if it is delivered.
        if (tracking && tracking.status === 'delivered' && shipment.phaseNumber !== 3) {
          shipment.phaseNumber = 3;
          editShipGroup({shipGroup: shipment, shipGroupId: shipment.id, token});
        }
        if (tracking) {
          shipment.deliveryStatus = tracking?.origin_info?.trackinfo;
        }
        return shipment;
      });

      setShips(shipmentsWithTracking);
    };
    fetchShips().catch((err) => console.log(err));
  }, [token, email]);

  return (
    <View style={styles.container}>
      {/*header*/}
      <View style={styles.header}>
        <Header>
          Shipments
        </Header>
      </View>

      {ships === undefined || ships.length === 0 ?
        <View style={styles.centerView}>
          {ships === undefined || ships.length === 0 ?
            <View style={styles.centerView}>
              <Image source={require('/assets/images/no_order_image.png')}/>
              <View style={{height: 20}}></View>
              <Text style={styles.noOrderedText}>No orders yet</Text>
            </View>
            :
            <FlatList data={ships}
                      renderItem={
                        ({item}) =>
                          <View style={[styles.card, {width: width - 32 * 2}]}>
                            <ShipmentCard ship={item} animationWidth={width - 32 * 2 - 10} navigation={navigation}/>
                          </View>
                      }
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
            />
          }
        </View>
        :
        <FlatList data={ships}
                  renderItem={
                    ({item}) =>
                      <View style={[styles.card, {width: width - 24 * 2}]}>
                        <ShipmentCard ship={item} animationWidth={width - 32 * 2 - 10} navigation={navigation}/>
                      </View>
                  }
                  ListFooterComponent={<View style={{height: 52}}></View>}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  header: {
    justifyContent: 'center',
    paddingTop: 65,
    paddingHorizontal: 24,
  },
  card: {
    marginTop: 20,
    display: 'flex',
    marginHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: "rgb(158, 158, 158)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 8,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  noOrderedText: {
    fontFamily: FontFamily.regular,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 25,
    textAlign: 'center',
    letterSpacing: 1,
    color: Colors.darkGrayBlack,
  },
})

const ShipmentsScreenAll = ({navigation}) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="ShipmentsScreen">
      <Stack.Screen
        name="ShipmentsScreen"
        component={ShipmentsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShippingDetailScreen"
        component={ShippingDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>)
}

export default ShipmentsScreenAll;
