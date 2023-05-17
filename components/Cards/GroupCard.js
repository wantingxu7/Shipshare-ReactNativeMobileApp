import {Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";
import {Colors} from "../../styles/Colors";
import {FontSizes} from "../../styles/FontSizes";
import Svg, {G, Path} from 'react-native-svg';
import {convertDateToString} from "../../api/convertDateToString";
import {FontFamily} from "../../styles/FontFamily";

export const GroupCard = ({group, distance, navigation}) => {

  const endDateString = convertDateToString(group.shipEndDate);

  const endAddress = group.pickupLocation.shortAddress?.split(',');
  const endCity = endAddress?.[0];
  const endState = endAddress?.[1];

  return (
    <View style={styles.container}>
      <View style={{justifyContent:'center', width: '85%'}}>
        {/*group name*/}
        <Text style={styles.text}>{group.name}</Text>

        {/*route*/}
        <View style={styles.infoLine}>
          <Svg width={15} height={15} viewBox="0 0 15 15">
            <G id="Iconly/Broken/Tick Square">
              <G id="Time Square">
                <Path
                  id="Tick Square_2"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.7501 7.76369C13.7501 8.02431 13.5382 8.23619 13.2776 8.23619H13.272V8.22494C13.0082 8.22494 12.7945 8.01181 12.7939 7.74806V7.74681V6.15806C12.7939 4.24994 11.7501 3.20619 9.84762 3.20619H5.16012C3.25637 3.20619 2.20637 4.25619 2.20637 6.15806V10.8456C2.20637 12.7418 3.25637 13.7918 5.15825 13.7918H9.84575C11.7476 13.7918 12.792 12.7418 12.792 10.8456C12.792 10.5818 13.0057 10.3674 13.2701 10.3674C13.5345 10.3674 13.7482 10.5818 13.7482 10.8456C13.7501 13.2549 12.2551 14.7499 9.84762 14.7499H5.15825C2.74512 14.7499 1.25012 13.2549 1.25012 10.8474V6.15994C1.25012 3.74494 2.74512 2.24994 5.15825 2.24994H9.84575C12.2439 2.24994 13.7501 3.74494 13.7501 6.15806V7.76369ZM6.75862 9.32088L9.39362 6.68525C9.57675 6.50213 9.87362 6.50213 10.0567 6.68525C10.2399 6.86838 10.2399 7.16525 10.0567 7.34838L7.08987 10.3153C7.00175 10.4028 6.88237 10.4521 6.75862 10.4521C6.63362 10.4521 6.51487 10.4028 6.42675 10.3153L4.94362 8.8315C4.7605 8.64838 4.7605 8.3515 4.94362 8.16838C5.12675 7.98525 5.42362 7.98525 5.60675 8.16838L6.75862 9.32088Z"
                  fill="#EEBD5E"/>
              </G>
            </G>
          </Svg>
          <Text style={styles.routeText}>{group.shipRoute}</Text>
        </View>

        {/*end date*/}
        <View style={styles.infoLine}>
          <Svg width={15} height={15} viewBox="0 0 15 15">
            <G id="Iconly/Broken/Time Circle">
              <G id="Time Circle">
                <Path
                  id="Time Circle_2"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.24988 7.49988C1.24988 4.053 4.05363 1.24988 7.49988 1.24988C10.9461 1.24988 13.7499 4.053 13.7499 7.49988C13.7499 10.9461 10.9461 13.7499 7.49988 13.7499C5.5455 13.7499 3.73925 12.8605 2.5455 11.3111C2.39238 11.1118 2.42988 10.8261 2.62863 10.6736C2.82738 10.5199 3.11175 10.558 3.2655 10.7561C4.28613 12.0811 5.82925 12.8411 7.49988 12.8411C10.4449 12.8411 12.8411 10.4455 12.8411 7.49988C12.8411 4.55488 10.4449 2.15863 7.49988 2.15863C4.55488 2.15863 2.15925 4.55488 2.15925 7.49988C2.15925 7.77363 2.17925 8.0455 2.21988 8.31175C2.25738 8.55925 2.08738 8.79113 1.83925 8.82925C1.58988 8.8705 1.35925 8.69738 1.32175 8.44925C1.27425 8.138 1.24988 7.81863 1.24988 7.49988ZM6.83369 4.89825C6.83369 4.647 7.03744 4.44325 7.28807 4.44325C7.53869 4.44325 7.74244 4.647 7.74244 4.89825V7.677L9.88244 8.95325C10.0981 9.082 10.1687 9.36075 10.0399 9.57638C9.95557 9.71825 9.80432 9.79763 9.64994 9.79763C9.57057 9.79763 9.48994 9.777 9.41744 9.73388L7.05494 8.32513C6.91807 8.24263 6.83369 8.0945 6.83369 7.9345V4.89825Z"
                  fill="#212121"/>
              </G>
            </G>
          </Svg>
          <Text style={styles.infoText}>End Date: {endDateString}</Text>
        </View>

        {/*pickup location*/}
        <View style={styles.infoLine}>
          <Svg viewBox="0 0 15 15" style={{width: 16}}>
            <G id="Iconly/Broken/Location">
              <G id="Location">
                <Path
                  id="Location_2"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.49996 1.25H7.52081C10.4498 1.26151 12.8239 3.65123 12.8124 6.57645V6.63455C12.7729 8.72501 11.5161 10.4597 10.469 11.5466C10.171 11.8574 9.85379 12.1556 9.52671 12.434C9.33078 12.6012 9.03662 12.5782 8.86923 12.3825C8.70185 12.1863 8.72545 11.8925 8.92137 11.7253C9.22431 11.4672 9.51902 11.1898 9.79617 10.901C10.728 9.93412 11.8454 8.40546 11.8794 6.61756C11.8888 4.16151 9.93227 2.19109 7.51697 2.18122H7.49996C5.09289 2.18122 3.1298 4.13247 3.12047 6.53808C3.16163 7.72637 3.56336 8.856 4.28285 9.80367C5.12252 10.9218 6.39631 12.1057 7.60698 12.8939C7.82321 13.0342 7.88412 13.3225 7.74308 13.5384C7.65417 13.6755 7.50435 13.75 7.35178 13.75C7.26452 13.75 7.17671 13.7259 7.09768 13.6744C5.8014 12.8308 4.43706 11.5625 3.53757 10.3649C2.70283 9.26489 2.2358 7.95218 2.1875 6.57042C2.19902 3.61615 4.5803 1.25 7.49996 1.25ZM6.40948 6.63384C6.40948 7.23291 6.89792 7.72127 7.49831 7.72127C8.09871 7.72127 8.58715 7.23291 8.58715 6.63384C8.58715 6.03421 8.09871 5.54585 7.49831 5.54585C7.24092 5.54585 7.03183 5.33758 7.03183 5.08052C7.03183 4.82291 7.24092 4.61463 7.49831 4.61463C8.61294 4.61463 9.52012 5.52009 9.52012 6.63384C9.52012 7.74703 8.61294 8.65249 7.49831 8.65249C6.38368 8.65249 5.4765 7.74703 5.4765 6.63384C5.4765 6.37623 5.6856 6.16795 5.94299 6.16795C6.20038 6.16795 6.40948 6.37623 6.40948 6.63384Z"
                  fill="#212121"/>
              </G>
            </G>
          </Svg>
          <Text style={styles.infoText}>Pickup at: {endCity}, {endState}</Text>
        </View>
      </View>

      {/*right side part*/}
      <View style={{marginLeft: 30, marginTop: 12}}>
        {/*miles away*/}
        <Text style={styles.distanceText}>{distance} Mi</Text>

        {/*buttons on the right*/}
        <Pressable style={styles.greenButton} onPress={() => navigation.navigate("JoinGroup", {group: group})}>
          <Text style={styles.whiteText}>Join</Text>
        </Pressable>
        <Pressable style={styles.whiteButton} onPress={() => navigation.navigate("GroupDetail", {group: group})}>
          <Text style={styles.greenText}>More</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    height: 151,
    padding: 13,
    marginHorizontal: 32,
    marginVertical: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  text: {
    color: Colors.black,
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: 5,
    fontFamily: FontFamily.bold,
  },
  routeText: {
    color: Colors.textOrange,
    fontSize: FontSizes.groupCardText,
    marginLeft: 6,
    fontFamily: FontFamily.regular,
  },
  infoText: {
    color: Colors.black,
    fontSize: FontSizes.groupCardText,
    marginLeft: 6,
    fontFamily: FontFamily.regular,
  },
  infoLine: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  distanceText: {
    color: Colors.textGray,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginRight: 5,
    fontFamily: FontFamily.bold,
  },
  greenButton: {
    backgroundColor: Colors.buttonDarkGreen,
    borderRadius: 10,
    height: 30,
    width: 70,
    justifyContent: 'center',
    marginTop: 15,
    alignItems: 'center',
  },
  whiteButton: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 30,
    width: 70,
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.buttonDarkGreen,
    alignItems: 'center',
  },
  whiteText: {
    color: Colors.white,
    fontSize: FontSizes.bodyText,
    fontWeight: 'bold',
    fontFamily: FontFamily.bold,
  },
  greenText: {
    color: Colors.buttonDarkGreen,
    fontSize: FontSizes.bodyText,
    fontWeight: 'bold',
    fontFamily: FontFamily.bold,
  }
})