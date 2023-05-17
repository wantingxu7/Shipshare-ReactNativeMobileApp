import React, {useRef} from "react";
import {
  Image as ImagePath,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import {Colors} from "../../../styles/Colors";
import {FontSizes} from "../../../styles/FontSizes";
import {Path, Svg, SvgUri} from "react-native-svg";
import GreenButton from "../../pressable/GreenButton";
import GreyInputfield from "../../pressable/GreyInputField";
import {Input} from "@rneui/themed";
import RBSheet from "react-native-raw-bottom-sheet";
import CalculateResult from "./CalculateResult";
import CalculateMore from "./CalculateMore";
import {Header} from "../../widgets/Header";
import {FontFamily} from "../../../styles/FontFamily";


export const CalculateFeeScreen = ({navigation}) => {
  const {width} = useWindowDimensions();
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();

  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [length, setLength] = React.useState('');
  const [parcelWidth, setParcelWidth] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header leftComponent={
          <Pressable
              style={{position: "relative", top: 2}}
              onPress={() => navigation.goBack()}>
            <SvgUri
                height="20"
                uri={ImagePath.resolveAssetSource(require("../../../assets/icons/ArrowLeft.svg")).uri}
            />
          </Pressable>
        }>Calculate Fees</Header>
      </View>

      <View style={styles.inputFields}>
        {/* Weight */}
        <View>
          <Text style={styles.dimensionText}>Weight</Text>
          <GreyInputfield
              placeholder="0"
              onChangeValue={setWeight}
              leading={props => <Svg width={24} height={24} viewBox="0 0 20 20" fill="none">
                <Path
                    d="M11.1742 2.09421C10.4212 1.78891 9.57886 1.78891 8.82585 2.09421L7.00085 2.83421L14.9942 5.94254L17.8059 4.85671C17.6906 4.76106 17.5613 4.68376 17.4225 4.62754L11.1742 2.09421Z"
                    fill="#9E9E9E"/>
                <Path
                    d="M18.3333 5.99243L10.625 8.97077V18.0733C10.8117 18.0358 10.995 17.9799 11.1742 17.9074L17.4225 15.3741C17.6916 15.2651 17.9221 15.0782 18.0844 14.8374C18.2466 14.5966 18.3333 14.3128 18.3333 14.0224V5.99326V5.99243Z"
                    fill="#9E9E9E"/>
                <Path
                    d="M9.37496 18.0733V8.97076L1.66663 5.99243V14.0233C1.66679 14.3135 1.75355 14.5971 1.91582 14.8377C2.07808 15.0784 2.30845 15.2651 2.57746 15.3741L8.82579 17.9074C9.00496 17.9799 9.18829 18.0349 9.37496 18.0741V18.0733Z"
                    fill="#9E9E9E"/>
                <Path
                    d="M2.19421 4.85679L10 7.87262L13.2642 6.61095L5.31171 3.51929L2.57755 4.62762C2.43588 4.68512 2.30755 4.76262 2.19421 4.85679Z"
                    fill="#9E9E9E"/>
              </Svg>}
              trailing={props => <Text style={styles.dimensionTrailingText}>kg</Text>}
          />
        </View>


        {/*break*/}
        <View style={{
          width: width - 48,
          backgroundColor: Colors.lineGray,
          height: 1,
          alignSelf: 'center',
        }}></View>

        {/* Dimension */}
        <View>
          <Text style={styles.dimensionText}>Dimension</Text>
          <View style={styles.dimensionInputs}>
            <DimensionInput
                placeholder="Length"
                onChangeValue={setLength}
                rightIcon={props => <Text style={styles.dimensionTrailingText}>cm</Text>}
            />
            <DimensionInput
                placeholder="Width"
                onChangeValue={setParcelWidth}
                rightIcon={props => <Text style={styles.dimensionTrailingText}>cm</Text>}
            />
            <DimensionInput
                placeholder="Height"
                onChangeValue={setHeight}
                rightIcon={props => <Text style={styles.dimensionTrailingText}>cm</Text>}
            />
          </View>
        </View>
        <View style={{marginTop: 32}}>
          <GreenButton text={"Calculate"} onPress={()=>refRBSheet2.current.open()} />
            <RBSheet
                ref={refRBSheet2}
                // closeOnDragDown={true}
                closeOnPressMask={true}
                height={650}
                openDuration={250}
                customStyles={{
                  container: {
                    justifyContent: "center",
                    alignItems: "center",
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                  }
                }}
            >
              <CalculateResult
                  weight={weight}
                  volume={height * length * parcelWidth}/>
            </RBSheet>
        </View>
      </View>
    </View>
  )
}

function DimensionInput({placeholder, rightIcon, onChangeValue}) {
    const {width} = useWindowDimensions();
    return(
        <Input
            placeholder={placeholder}
            rightIcon={rightIcon}

            leftIconContainerStyle={{
              marginRight: 10,
            }}
            onChangeText={onChangeValue}
            placeholderTextColor={Colors.gray}
            containerStyle={{
              backgroundColor: '#FAFAFA',
              borderRadius:12,
              width: (width-72) / 3,
              height: 56,
              marginBottom: 10
            }}
            inputContainerStyle={{
              backgroundColor: '#FAFAFA',
              marginTop: 5,
              marginLeft: 5,
              borderColor: '#FAFAFA',
            }}
            inputStyle={{
              color:'#212121',
              fontSize: 14,
              fontFamily: 'Nunito-SemiBold'
            }}
        />
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: '100%',
    alignItems: 'flex-start'
  },
  headerContainer: {
    marginTop: 65,
    marginBottom: 32,
    paddingHorizontal: 24,
    width: '100%',
  },
  title: {
    color: Colors.black,
    fontSize: FontSizes.calculateText,
    alignSelf: 'center',
    marginBottom: 24,
    marginLeft: 10,
    fontFamily: 'Nunito-Bold',
  },
  topContainer: {
    flexDirection: "row",
    marginLeft: 10,
    padding: 12,
    marginTop: 56,
  },
  dimensionText: {
    fontSize: FontSizes.dimensionText,
    fontFamily: FontFamily.bold,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  dimensionTrailingText:{
    color: Colors.gray,
    fontFamily: FontFamily.regular,
    fontSize: 14,
  },
  inputFields: {
    marginHorizontal: 24,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    gap: 24,
  },
  dimensionInputs:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    fontFamily: FontFamily.bold,
  }
})