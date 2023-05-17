import React, {useEffect, useState} from "react";
import {FlatList, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {Colors} from "../../../styles/Colors";
import {IconButton} from "@react-native-material/core";
import {Feather, FontAwesome5} from '@expo/vector-icons';
import {CheckBox} from "@rneui/themed";
import SelectParcelsItemCard from "../../Cards/selectParcelsItemCard";
import {useSelector} from "react-redux";
import {getParcelsByUserEmail, multiGetParcelTrackings} from "../../../api/parcel";
import {updateWeight} from "../../../redux/parcel-reducer.js";
import {FontFamily} from "../../../styles/FontFamily";


export const SelectParcelsScreen = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const [check, setCheck] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);
  const [parcels, setParcels] = useState([]);
  const [arrivedParcels, setArrivedParcels] = useState([]);
  const [trackingMap, setTrackingMap] = React.useState({});
  const group = route.params.group;
  const [totalWeight, setTotalWeight] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [parcelCheckChanged, setParcelCheckChanged] = useState(false);

  const checkFlipNotifier = () => {
    setParcelCheckChanged(!parcelCheckChanged);
  }

  useEffect(() => {
    const fetchShips = async () => {
      const parcels = await getParcelsByUserEmail({token, email});
      const trackings = await multiGetParcelTrackings({parcels});
      const trackingMap = {};
      trackings.forEach((tracking) => {
        trackingMap[tracking.trackingNumber] = tracking?.data;
      });
      setTrackingMap(trackingMap);
      setParcels(parcels);
    };

    if (token && email) {
      fetchShips().catch((err) => console.log("error in fetchShips: ", err, err?.response?.data));
    }
  }, [token, email]);


  useEffect(() => {
    const fetchShips = async () => {
      const parcels = await getParcelsByUserEmail({token, email});
      setParcels(parcels);
    };
    if (token && email) {
      fetchShips().catch((err) => console.log(err));
    }
  }, [token, email]);

  useEffect(() => {
    setArrivedParcels(parcels.filter(
      (parcel) => !parcel.isShipped
        && trackingMap[parcel.trackingNumber]
        && trackingMap[parcel.trackingNumber].status === 'delivered'
        && parcel.weight
        && (parcel.shipGroup === undefined || parcel.shipGroup === null)
      // && parcel.isWeighted
    ));

  }, [parcels]);

  useEffect(() => {
    const updateChooseAll = () => {
      if (arrivedParcels.length === 0) {
        setCheck(false)
      } else {
        let allChecked = true;
        for (let i = 0; i < arrivedParcels.length; i++) {
          if (!arrivedParcels[i].check) {
            allChecked = false;
            break;
          }
        }
        setCheck(allChecked);
      }
    }
    updateChooseAll();
  }, [arrivedParcels, parcelCheckChanged]);


  const updateTotalWeight = (newWeight) => {
    if (newWeight < 0) {
      setCheck(false)
    }
    setTotalWeight((parseFloat(totalWeight) + newWeight).toFixed(2));
  }

  return (
    <View style={styles.container}>
      <View style={{height: 10}}></View>
      <View style={styles.topLineContainer}>
        <View style={styles.backButtonView}>
          <IconButton
            icon={props => <Feather name="arrow-left" size={24} color="black"/>}
            onPress={() => navigation.goBack()}
            style={styles.icon}
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Select Parcels</Text>
        </View>
      </View>

      {/* <View style={{height:'86%'}}> */}
      <View style={styles.parcelsContainer}>
        <ScrollView
          contentContainerStyle={{flexDirection: 'column'}}
          style={{width: '100%'}}>
          <View style={styles.parcels}>

            <View style={styles.subtitle}>
              <FontAwesome5 name="wallet" size={20} color='#80B213'/>
              <Text style={styles.subtitleText}>Parcels Arrived</Text>
            </View>

            <View>

              {/*<FlatList*/}
              {/*  data={arrivedParcels}*/}
              {/*  renderItem={*/}
              {/*    ({item}) =>*/}
              {/*      <View style={[styles.card, {width: width, height: 100}]}>*/}
              {/*        <SelectParcelsItemCard*/}
              {/*          checkFlipNotifier={checkFlipNotifier}*/}
              {/*          ship={item}*/}
              {/*          animationWidth={width - 32 * 2 - 10}*/}
              {/*          // selectAll={selectAll}*/}
              {/*          totalWeight={totalWeight}*/}
              {/*          updateTotalWeight={updateTotalWeight}/>*/}
              {/*      </View>*/}
              {/*  }*/}
              {/*/>*/}


              {arrivedParcels!==null && arrivedParcels.length>0 && arrivedParcels.map((item, index) => (
                <View key={index} style={[styles.card, {width: width, height: 100}]}>
                  <SelectParcelsItemCard
                    checkFlipNotifier={checkFlipNotifier}
                    ship={item}
                    animationWidth={width - 32 * 2 - 10}
                    totalWeight={totalWeight}
                    updateTotalWeight={updateTotalWeight}
                  />
                </View>
              ))}


            </View>
          </View>
        </ScrollView>
      </View>
      {/* </View> */}


      <View style={styles.totalContainer}>
        <View style={styles.aboveCheckOutButton}>

          <View style={styles.chooseAllContainer}>
            <CheckBox
              center
              checked={check}
              checkedColor={Colors.buttonDarkGreen}
              value={check}
              onPress={() => {

                setCheck(!check)
                setTotalWeight(!check ? (arrivedParcels.reduce((acc, cur) => acc + cur.weight, 0)).toFixed(2) : 0)
                // setSelectAll(!selectAll)
                for (let i = 0; i < arrivedParcels.length; i++) {
                  if (check) {
                    arrivedParcels[i].check = false
                  } else {
                    arrivedParcels[i].check = true
                  }
                }
              }}
            />

            <Text style={styles.chooseAllText}>Choose all</Text>
          </View>

          <View>
            <Text style={styles.totalWeightText}>{totalWeight} kg</Text>
          </View>
        </View>

        <View style={{paddingTop: 3}}>
          <Pressable style={styles.checkOutButton}
                     onPress={() => {
                       if (totalWeight <= 0) {
                         alert("Please select at least one parcel");
                       }
                       else {
                         navigation.navigate("GroupCheckout", {
                           checkedItems: arrivedParcels.filter((item) => item.check),
                           group: group,
                           totalWeight: totalWeight
                         })
                       }
                     }}>
            <Text style={styles.checkOutText}>Check Out</Text>
          </Pressable>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    top: -45,
    // left: -8,

  },

  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    gap: 4,
    position: 'absolute',
    width: 150,
    height: 28,
    left: '50%',
    marginLeft: -64.5,
    top: '50%',
    marginTop: 39,

  },
  titleText: {
    right: 30,
    width: 200,
    height: 28,
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    color: '#313131',
    flex: 0,
    flexGrow: 0,
    fontFamily: FontFamily.bold,
  },
  backButtonView: {
    position: 'absolute',
    width: 36,
    height: 36,
    left: 2,
    top: 53,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,

  },
  icon: {
    position: 'absolute',
    left: '-16%',
    top: '-16%',
  },


  bottomContainer: {
    top: 50,
    paddingHorizontal: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: Colors.white,
    height: '78%'
  },
  card: {
    marginBottom: 10,
    display: 'flex',
    height: 150,
    left: -25,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },

  totalWeightText: {
    fontSize: 17,
    fontWeight: 'bold',
    right: 13,
    fontFamily: FontFamily.bold,
  },
  button: {
    backgroundColor: Colors.buttonDarkGreen,
    borderRadius: 22,
    height: 42,
    padding: 10,
    margin: 10,
    width: '20%',
    alignItems: 'center',
    alignSelf: 'center',
    left: 40,
    top: -5
  },
  buttonText: {
    fontFamily: 'Nunito-Bold',
    color: Colors.white,
    fontSize: 16,
  },
  topLineContainer: {
    position: 'absolute',
    left: '5.8%',
    right: '5.8%',
    top: '6.7%',
    bottom: '90%',
  },
  parcelsContainer: {
    alignItems: 'flex-start',
    width: '86%',
    alignSelf: 'center',
    top: 160,
    overflow: 'scroll',
    maxHeight: 545,
    borderRadius: 16,
    backgroundColor: 'white'
  },
  parcels: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 12,
    width: 366,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flex: 0,
    flexGrow: 0,
    order: 0,
  },
  totalContainer: {
    alignSelf: 'center',
    position: 'absolute',
    width: '86%',
    height: 125,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    shadowColor: '#232323',
    shadowOffset: {width: 1, height: 8},
    shadowOpacity: 0.04,
    shadowRadius: 17,

    borderRadius: 16,
  },
  checkOutButton: {
    width: '80%',
    height: 48,
    marginHorizontal: 24,
    marginBottom: 40,
    backgroundColor: Colors.buttonDarkGreen,
    borderRadius: 16,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    fontFamily: FontFamily.bold,
  },
  chooseAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    alignContent: 'flex-start'

  },
  chooseAllText: {
    // marginLeft: 8
    width: '65%',
    fontFamily: FontFamily.bold,
  },
  checkBoxContainer: {

    // flexDirection: 'column',
    // alignItems: 'flex-start',
    // padding: 10,
    // width: 13,
    // height: 13,
    //
    // borderColor: '#E2E8F0',
    // borderWidth: 1,
    // borderRadius: 6,

  },
  aboveCheckOutButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitleText: {
    fontWeight: 'bold',
    fontSize: 17,
    left: 15,
    color: Colors.blackText,
    fontFamily: FontFamily.bold,
  },
  subtitle: {
    flexDirection: 'row',
    alignItems: 'center'
  }


})
