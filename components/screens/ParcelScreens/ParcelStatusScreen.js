import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Circle, Path, Rect, Svg} from "react-native-svg";
import {Colors} from "../../../styles/Colors.js";
import {FontSizes} from "../../../styles/FontSizes.js";
import ShippingStatusBar from "../../widgets/ShippingStatusBar.js";
import {DeliveryStatusCard} from "../../Cards/DeliveryStatusCard";
import {Feather} from "@expo/vector-icons";
import {IconButton} from "@react-native-material/core";
import {FontFamily} from "../../../styles/FontFamily";


export const ParcelStatusScreen = ({route, navigation}) => {
	const ship = route.params.ship;
	const detailedDeliveryStatus = route.params.detailedDeliveryStatus;
	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.greenHeadPart}>
					<View style={{marginTop: 60, flexDirection:'row', alignItems:'center'}}>
						<IconButton
							icon={props => <Feather name="arrow-left" size={24} color={Colors.white}/>}
							onPress={() => navigation.goBack()}
							style={{ position: 'absolute', right: 200}}
						/>
						<Text style={styles.title}>Parcel Status</Text>
					</View>
				</View>

				{/*Top container -- tracking number part*/}
				<View style={styles.topContainer}>
					<View style={styles.trackingNumberContainer}>
						<Text style={styles.trackingNumberText}>Tracking Number</Text>
						<Text style={styles.trackingNumber}>{ship.trackingNumber}</Text>
					</View>
				</View>


				{/*Bottom Container*/}
				<DeliveryStatusCard deliveryStatus={detailedDeliveryStatus}/>

				<View style={{height: 150}}/>

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
		marginVertical: 20,
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
		marginTop: 10,
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
	statusLocation: {
		color: Colors.buttonDarkGreen,
		fontSize: FontSizes.dimensionText,
		fontWeight: 'bold',
	},
	shippingText: {
		color: Colors.blackText,
		fontSize: FontSizes.bodyText,
		marginBottom: 13,
		alignSelf: 'center',
	},

})