import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Colors} from "../../../styles/Colors";
import {FontSizes} from "../../../styles/FontSizes";
import {Input} from 'react-native-elements';
import TwoButtonsGroup from "../../pressable/TwoButtonsGroup";
import {convertDateToString} from "../../../api/convertDateToString";
import {Header} from "../../widgets/Header";
import {Feather} from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import {FilterButton} from "../../pressable/FilterButton";
import {IconButton} from "@react-native-material/core";
import {FontFamily} from "../../../styles/FontFamily";

export const GroupDetailScreen = ({navigation, route}) => {
	const group = route.params.group;

	const endDateString = convertDateToString(group.shipEndDate);

	return (
		<View style={styles.container}>
			{/*<Text style={styles.title}>Group Details</Text>*/}
			<View style={styles.header}>
				<Header
					leftComponent=
						{<IconButton
							icon={props => <Feather name="arrow-left" size={24} color="black"/>}
							onPress={() => navigation.goBack()}
							style={styles.icon}
						/>}>
					Groups Details
				</Header>
			</View>

			<View style={styles.cardContainer}>
				<View style={{margin: 20, marginTop: 40}}>
					<View style={{flexDirection:'row'}}>
						<View style={{width:'50%'}}>
							<Text style={styles.labelStyle}>Group Name</Text>
						</View>
						<View style={{width:'50%'}}>
							<Text style={styles.infoStyle}>{group.name}</Text>
						</View>
					</View>

					<View style={styles.textLine}>
						<View style={{width:'50%'}}>
							<Text style={styles.labelStyle}>Route</Text>
						</View>
						<View style={{width:'50%'}}>
							<Text style={styles.infoStyle}>{group.shipRoute}</Text>
						</View>
					</View>

					<View style={styles.textLine}>
						<View style={{width:'50%'}}>
							<Text style={styles.labelStyle}>Join before</Text>
						</View>
						<View style={{width:'50%'}}>
							<Text style={styles.infoStyle}>{endDateString}</Text>
						</View>
					</View>

					<View style={styles.textLine}>
						<View style={{width:'50%'}}>
							<Text style={styles.labelStyle}>Address</Text>
						</View>
						<View style={{width:'50%'}}>
							<Text style={styles.infoStyle}>{group.pickupLocation.shortAddress}</Text>
						</View>
					</View>

					<View style={styles.textLine}>
						<View style={{width:'50%'}}>
							<Text style={styles.labelStyle}>Current Weight</Text>
						</View>
						<View style={{width:'50%'}}>
							<Text style={styles.infoStyle}>{group.totalWeight}</Text>
						</View>
					</View>

					<View style={styles.textLine}>
						<View style={{width:'50%'}}>
							<Text style={styles.labelStyle}>Participants</Text>
						</View>
						<View style={{width:'50%'}}>
							<Text style={styles.infoStyle}>{group.members.length}</Text>
						</View>
					</View>

				</View>
			</View>

			<View style={{
				width: '100%',
				paddingHorizontal: 31,
				position: 'absolute',
				bottom: 0,
				marginBottom: 41,
			}}>
				<TwoButtonsGroup
					leftText={'Back'} rightText={'Join'}
					onButton1Press={()=> navigation.goBack()}
					onButton2Press={()=> navigation.navigate("JoinGroup", {group})}
				></TwoButtonsGroup>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		justifyContent: 'flex-start',
		width: '100%',
		// alignItems: 'center',
	},
	header: {
		justifyContent: 'center',
		paddingTop: 65,
		paddingHorizontal: 24,
	},
	title: {
		color: Colors.black,
		fontSize: FontSizes.pageTitle,
		fontWeight: 400,
		marginBottom: 80,
		marginTop: 50,
	},
	cardContainer: {
		marginTop: 50,
		width: "86%",
		alignSelf: 'center',
		backgroundColor: Colors.white,
		borderRadius: 15,
		shadowColor: Colors.black,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.30,
		shadowRadius: 4.65,
		elevation: 8,
	},
	labelStyle: {
		color: Colors.gray,
		fontSize: 14,
		fontWeight: 300,
		marginBottom:5,
		fontFamily: FontFamily.regular,
	},
	infoStyle: {
		color: Colors.black,
		fontSize: FontSizes.bodyText,
		fontWeight: 400,
		marginBottom:15,
		fontFamily: FontFamily.regular,
	},
	textLine: {
		flexDirection:'row',
		marginBottom:5,
	}
})