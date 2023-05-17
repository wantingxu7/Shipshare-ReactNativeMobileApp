import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Header} from "../../widgets/Header";
import React from 'react';
import {Colors} from "../../../styles/Colors";
import {FontFamily} from "../../../styles/FontFamily";
import {getShipGroupById, joinShipGroup} from "../../../api/shipGroup.js";
import {useDispatch, useSelector} from "react-redux";
import {editParcel} from "../../../api/parcel.js";
import {updateGroupById, updateShipmentById} from "../../../redux/group-reducer.js";

const PaymentScreen = (props) => {
  const dispatch = useDispatch();

  const {group, checkedItems} = props.route.params;
  const token = useSelector(state => state.auth.token);

  async function onClickPaymentFinished() {

    await Promise.all([
      joinShipGroup({shipGroupId: group.id, token}),
      checkedItems.forEach((parcel) => {
        if (parcel !== null && parcel !== undefined) {
          delete parcel.check;

          /* parcel join group */
          parcel.shipGroup = group.id;
          parcel.isShipped = true;

          editParcel({parcel, parcelId: parcel.id, token})
            .then(() => {

              getShipGroupById({shipGroupId: group.id, token})
                .then((newGroup) => {
                  dispatch(updateGroupById({id: newGroup.id, group: newGroup}));
                  dispatch(updateShipmentById({id: newGroup.id, shipment: newGroup}));
                })
                .catch((err) => {
                  console.log(`error when getting group ${JSON.stringify(group)} ${err}`);
                });

            })
            .catch((err) => {
              console.log(`error when updating parcel ${JSON.stringify(parcel)} ${err}`);
            });
        }
      })
    ]);

    props.navigation.navigate("OrderSuccess")

  }

  return (
    <View style={styles.container}>
      <Header>Payment</Header>
      <Image
        source={require("../../../assets/GroupScreens/qrcode.png")}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Scan to Pay</Text>
        <Text style={styles.subtitle}>
          Please scan the Venmo code for payment and note that we will verify the payment before continuing with the
          process.
        </Text>
      </View>
      <Pressable
        style={styles.getStartedButton}
        onPress={() => onClickPaymentFinished()}
      >
        <Text style={styles.getStartedText}>Payment Completed</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 65,
    flex: 1,
    backgroundColor: "rgb(250, 250, 250)",
  },
  image: {
    width: "100%",
    resizeMode: 'contain',
    marginTop: 40,
    alignSelf: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.blackText,
    paddingBottom: 24,
    fontFamily: FontFamily.bold,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#AAAAAA',
    lineHeight: 28,
    marginBottom: 16,
    fontFamily: FontFamily.regular,
  },
  getStartedButton: {
    height: 60,
    marginHorizontal: 24,
    marginBottom: 40,
    backgroundColor: Colors.buttonDarkGreen,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    fontFamily: FontFamily.bold,
  },

});

export default PaymentScreen;