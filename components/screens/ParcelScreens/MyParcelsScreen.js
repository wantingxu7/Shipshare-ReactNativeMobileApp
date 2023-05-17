import React, {useEffect} from "react";
import {FlatList, Image, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import ParcelCard from "../../Cards/ParcelCard";
import {ButtonGroup} from "../../pressable/ButtonGroup";
import {AddButton} from "../../pressable/AddButton";
import {Header} from "../../widgets/Header";
import {Colors} from "../../../styles/Colors";
import {useSelector} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import {getParcelsByUserEmail, multiGetParcelTrackings} from "../../../api/parcel";
import {FontFamily} from "../../../styles/FontFamily";


const MyParcelsScreen = ({navigation, route}) => {
  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchShips = async () => {
      const shipments = await getParcelsByUserEmail({token, email});
      setParcels(shipments);
    };

    fetchShips().catch((err) => console.log(err));
  }, [token, email, isFocused]);

  const {height, width} = useWindowDimensions();
  const [tab, setTab] = React.useState('All');
  const [parcels, setParcels] = React.useState([]);
  const [trackingMap, setTrackingMap] = React.useState({});
  const [filteredParcels, setFilteredParcels] = React.useState([]);

  useEffect(() => {
    const fetchShips = async () => {
      try {
        const parcels = await getParcelsByUserEmail({token, email});
        const trackings = await multiGetParcelTrackings({parcels});
        const trackingMap = {};
        trackings.forEach((tracking) => {
          trackingMap[tracking.trackingNumber] = tracking?.data;
        });
        setTrackingMap(trackingMap);
        setParcels(parcels);
      } catch (error) {
        console.log(error);
      }
    };

    if (token && email) {
      fetchShips().catch((err) => console.log(err));
    }
  }, [token, email]);

  useEffect(() => {
    if (tab === 'Shipped') {
      setFilteredParcels(parcels.filter((parcel) => parcel.isShipped));
    } else if (tab === 'Arrived') {
      setFilteredParcels(parcels.filter(
        (parcel) => !parcel.isShipped
          && trackingMap[parcel.trackingNumber]
          && trackingMap[parcel.trackingNumber].status === 'delivered'));
    } else if (tab === 'Transit') {
      setFilteredParcels(parcels.filter(
        (parcel) => !parcel.isShipped
          && trackingMap[parcel.trackingNumber]
          && trackingMap[parcel.trackingNumber].status !== 'delivered'));
    } else {
      setFilteredParcels(parcels);
    }
  }, [tab, trackingMap, parcels]);
  return (
    <View style={styles.container}>
      {/*header*/}
      <View style={styles.header}>
        <Header
          rightComponent=
            {<AddButton
              onPress={() => navigation.navigate('AddNewParcel', {ships: route.params?.ships})}
              size={23}
              length={40}
            />}
        >
          My Parcels
        </Header>
      </View>

      <ButtonGroup
        selections={['All', 'Transit', 'Arrived', 'Shipped']}
        selectedValue={tab}
        setSelectedValue={setTab}
        marginHorizontal={24}
      />

      {parcels === undefined || filteredParcels.length === 0 ?
        <View style={styles.centerView}>
          <Image source={require('/assets/images/no_order_image.png')}/>
          <View style={{height: 20}}></View>
          <Text style={styles.noOrderedText}>No parcels yet</Text>
        </View>
        :
        <FlatList data={filteredParcels}
                  renderItem={
                    ({item}) =>
                      <View style={styles.card}>
                        <ParcelCard ship={item} navigation={navigation} token={token}/>
                      </View>
                  }
                  ListFooterComponent={<View style={{height: 50}}></View>} // add view to the end of the list
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
    backgroundColor: Colors.white,
  },
  header: {
    justifyContent: 'center',
    paddingTop: 65,
    paddingHorizontal: 24,
  },
  card: {
    marginTop: 20,
    display: 'flex',
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 24,
    shadowColor: "rgb(158, 158, 158)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
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

export default MyParcelsScreen;
