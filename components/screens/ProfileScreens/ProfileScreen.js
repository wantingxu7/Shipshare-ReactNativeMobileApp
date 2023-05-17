import React, {useEffect, useRef} from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {Colors} from "../../../styles/Colors";
import {FontSizes} from "../../../styles/FontSizes";
import {Avatar, IconButton} from "@react-native-material/core";
import {AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons} from '@expo/vector-icons';
import GreenButton from "../../pressable/GreenButton";
import RBSheet from "react-native-raw-bottom-sheet";
import CalculateMore from "./CalculateMore";
import WarehouseAddress from "./WarehouseAddress";
import * as Clipboard from 'expo-clipboard';
import {Header} from "../../widgets/Header";
import {setUser as setUserRedux} from "../../../redux/auth.js";


const warehouseAddress = 'Recipient: ShipShare\n' +
  'Phone Number: +8618817001700\n' +
  'Address: No.10, Lane 7, Xinhedong, Fuhai Street, Bao\'an District, Shenzhen, Guangdong Province, China';
import Svg, {Path} from 'react-native-svg';
import {changeAvatar, getCurrentUser} from "../../../api/user.js";
import {useDispatch, useSelector} from "react-redux";
import ImagePickerButton from "../../pressable/ImagePickerButton";
import {uploadImage} from "../../../api/imageUpload";
import {FontFamily} from "../../../styles/FontFamily";

export const ProfileScreen = ({navigation}) => {
  const refWarehouseRBSheet = useRef();
  const refCalculateRBSheet = useRef();

  // get info from store redux
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.user.id);
  const avatarUser = useSelector(state => state.auth.user.avatar);

  const [image, setImage] = React.useState(avatarUser);

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const setUser = (user) => {
    dispatch(setUserRedux(user));
  }

  useEffect(() => {
    async function fetchUser() {
      const userInfo = await getCurrentUser({token, userId});
      setUser(userInfo);
    }

    fetchUser().catch((e) => {
      console.log(e)
    });
  }, []);

  async function handleSaveImg(image) {
    try {
      const imageUrl = await uploadImage({fileUri: image, token});
      await changeAvatar({token, userId, imageUrl});
      const userInfo = await getCurrentUser({token, userId});
      setUser(userInfo);
      setImage(image);
    } catch (error) {
      console.log("error in handleSaveButtonPress", error, error?.response?.message);
    }
  }

  return (
    <ScrollView style={{width: '100%'}}>
      <View style={styles.topContainer}>
        <Header>Profile</Header>
        <ImagePickerButton
          image={image}
          setImage={handleSaveImg}
          defaultImage="https://picx.zhimg.com/50/v2-6afa72220d29f045c15217aa6b275808_720w.jpg"
          icon={<MaterialCommunityIcons name="pencil" size={24} color={Colors.white}/>}
        />
        <View style={{
          alignItems: 'center',
          flex: 1,
          position: 'relative',
          top: -15,
        }}>
          <Text style={{
            fontSize: FontSizes.buttonText,
            fontFamily: FontFamily.regular,
          }}>{user.email}</Text>
          <View style={styles.label}>
            <View style={{width: '50%'}}>
              <Text style={styles.whiteNumberText}>{user.numberShipments}</Text>
              <Text style={styles.whiteText}>Shipments</Text>
            </View>

            <View style={styles.verticalLine}></View>

            <View style={{width: '50%'}}>
              <Text style={styles.whiteNumberText}>{user.numberParcels}</Text>
              <Text style={styles.whiteText}>Parcels</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={{height: 20}}></View>

        <Pressable style={styles.pressableItem}
           onPress={() => {
             Clipboard.setStringAsync(warehouseAddress);
             refWarehouseRBSheet.current.open();
           }}
        >
          <View style={styles.icon}>
            <Svg width={28} height={29} viewBox="0 0 28 29" fill="none" style={{marginLeft: 5}}>
              <Path id="Home_2" fill-rule="evenodd" clip-rule="evenodd"
                    d="M20.1522 7.59123C20.8642 8.16388 21.2822 9.02539 21.2913 9.93906L21.2826 17.913C21.2826 20.0789 19.5268 21.8347 17.3609 21.8347H15.6217C14.5734 21.8347 13.7222 20.9874 13.7174 19.9391V16.3391C13.7174 16.0605 13.4916 15.8347 13.213 15.8347H10.6043C10.4691 15.8347 10.3394 15.889 10.2446 15.9855C10.1498 16.082 10.0977 16.2125 10.1 16.3478V17.7217C10.1 18.1539 9.74961 18.5043 9.31739 18.5043C8.88517 18.5043 8.53478 18.1539 8.53478 17.7217V16.3478C8.53478 15.7966 8.75374 15.2679 9.14349 14.8782C9.53324 14.4884 10.0619 14.2695 10.613 14.2695H13.2217C14.3661 14.2743 15.2913 15.2033 15.2913 16.3478V19.9391C15.2913 20.1215 15.4392 20.2695 15.6217 20.2695H17.4043C18.701 20.2695 19.7522 19.2183 19.7522 17.9217V9.95645C19.7458 9.51519 19.5415 9.10015 19.1957 8.82601L13.187 4.03471C12.4293 3.41091 11.336 3.41091 10.5783 4.03471L8.64783 5.47819C8.29004 5.73512 7.79172 5.65336 7.53478 5.29558C7.27785 4.93779 7.35961 4.43947 7.71739 4.18253L9.62174 2.79992C10.9421 1.73857 12.8231 1.73857 14.1435 2.79992L20.1522 7.59123ZM6.42174 20.2608H10.4217V20.2782C10.854 20.2782 11.2043 20.6286 11.2043 21.0608C11.2043 21.493 10.854 21.8434 10.4217 21.8434H6.42174C4.25781 21.8386 2.50478 20.0856 2.5 17.9217V9.95645C2.51384 9.03602 2.94588 8.17194 3.67391 7.60862L4.39565 7.06949C4.73552 6.90927 5.14129 7.0132 5.36229 7.31707C5.58329 7.62095 5.55714 8.039 5.3 8.31297L4.59565 8.83471C4.26191 9.11198 4.06776 9.52256 4.06522 9.95645V17.913C4.07474 19.2091 5.12562 20.2561 6.42174 20.2608Z"
                    fill="#EEBD5E"/>
            </Svg>
          </View>
          <Text style={styles.pressableText}>Warehouse Address</Text>
          <View style={{width: 30, alignItems: 'center'}}>
            <Text style={styles.pressableRightMark}></Text>
          </View>
          <View style={styles.pressableRightMark}>
            <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.14622 3.71593C5.89867 3.96114 5.89697 4.35867 6.14792 4.60389L9.85863 8.23773L9.92418 8.29371C10.175 8.48026 10.5335 8.46076 10.7612 8.23522C10.8846 8.11303 10.9475 7.95234 10.9475 7.79249C10.9475 7.63181 10.8846 7.47029 10.7595 7.3481L7.0488 3.71342L6.98325 3.65743C6.73244 3.47088 6.37392 3.49038 6.14622 3.71593ZM6.09033 14.7254C5.89885 14.9716 5.91919 15.3243 6.14611 15.5491C6.39451 15.7943 6.79859 15.7951 7.04869 15.5499L12.636 10.0766L12.6934 10.0124C12.7803 9.9008 12.824 9.76678 12.824 9.63218C12.824 9.47233 12.7611 9.31165 12.6377 9.18946C12.3893 8.94341 11.9852 8.94257 11.7351 9.18778L6.14781 14.6611L6.09033 14.7254Z"
                fill="#898989"
                fill-opacity="0.5"
              />
            </Svg>
          </View>
        </Pressable>

        <View style={styles.horizontalLine}></View>
        <Pressable style={styles.pressableItem} onPress={() => navigation.navigate("TutorialScreen")}>
          <View style={styles.icon}>
            <Svg width={28} height={29} viewBox="0 0 28 29">
              <Path fill-rule="evenodd" clip-rule="evenodd"
                    d="M9.7658 2.68823H18.5924C22.2684 2.68823 24.4701 4.92067 24.4801 8.64814V19.6083C24.4801 23.3358 22.2884 25.5682 18.6023 25.5682H15.3347C14.9156 25.5214 14.5985 25.1623 14.5985 24.7349C14.5985 24.3074 14.9156 23.9483 15.3347 23.9015H18.5924C21.4017 23.9015 22.8164 22.457 22.8164 19.6083V8.64814C22.8164 5.79951 21.4017 4.35499 18.5924 4.35499H9.7658C6.95644 4.35499 5.53184 5.79951 5.53184 8.64814V19.6083C5.53184 22.457 6.95644 23.9015 9.7658 23.9015C10.1849 23.9483 10.502 24.3074 10.502 24.7349C10.502 25.1623 10.1849 25.5214 9.7658 25.5682C6.08972 25.5682 3.88806 23.3358 3.88806 19.6083V8.64814C3.88806 4.91057 6.08972 2.68823 9.7658 2.68823ZM10.0547 10.123H13.1928C13.6119 10.0761 13.9291 9.71708 13.9291 9.28959C13.9291 8.8621 13.6119 8.50307 13.1928 8.45621H10.0547C9.63565 8.50307 9.31846 8.8621 9.31846 9.28959C9.31846 9.71708 9.63565 10.0761 10.0547 10.123ZM18.2935 14.9616H10.0547H10.0447C9.62569 14.9148 9.3085 14.5557 9.3085 14.1282C9.3085 13.7007 9.62569 13.3417 10.0447 13.2949H18.2935C18.6087 13.2596 18.9161 13.4103 19.0846 13.6827C19.2531 13.9552 19.2531 14.3013 19.0846 14.5737C18.9161 14.8462 18.6087 14.9969 18.2935 14.9616ZM18.2935 19.8002H10.0547H10.0447C9.59358 19.8002 9.22784 19.4294 9.22784 18.9719C9.22784 18.5145 9.59358 18.1436 10.0447 18.1436H18.2935C18.7447 18.1436 19.1104 18.5145 19.1104 18.9719C19.1104 19.4294 18.7447 19.8002 18.2935 19.8002Z"
                    fill="#EEBD5E"/>
            </Svg>
          </View>
          <Text style={styles.pressableText}>Tutorial</Text>
          <View style={styles.pressableRightMark}>
            <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.14622 3.71593C5.89867 3.96114 5.89697 4.35867 6.14792 4.60389L9.85863 8.23773L9.92418 8.29371C10.175 8.48026 10.5335 8.46076 10.7612 8.23522C10.8846 8.11303 10.9475 7.95234 10.9475 7.79249C10.9475 7.63181 10.8846 7.47029 10.7595 7.3481L7.0488 3.71342L6.98325 3.65743C6.73244 3.47088 6.37392 3.49038 6.14622 3.71593ZM6.09033 14.7254C5.89885 14.9716 5.91919 15.3243 6.14611 15.5491C6.39451 15.7943 6.79859 15.7951 7.04869 15.5499L12.636 10.0766L12.6934 10.0124C12.7803 9.9008 12.824 9.76678 12.824 9.63218C12.824 9.47233 12.7611 9.31165 12.6377 9.18946C12.3893 8.94341 11.9852 8.94257 11.7351 9.18778L6.14781 14.6611L6.09033 14.7254Z"
                fill="#898989"
                fill-opacity="0.5"
              />
            </Svg>
          </View>
        </Pressable>

        <View style={styles.horizontalLine}></View>
        <Pressable style={styles.pressableItem} onPress={() => navigation.navigate("CalculateFees")}>
          <View style={styles.icon}>
            <Svg width={28} height={29} viewBox="0 0 28 29">
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.36193 3.61206H19.0051C22.6547 3.61206 25.624 6.64913 25.624 10.3833V18.5768C25.624 22.311 22.6547 25.3481 19.0051 25.3481C18.5841 25.3481 18.2424 24.9985 18.2424 24.5677C18.2424 24.137 18.5841 23.7874 19.0051 23.7874C21.8137 23.7874 24.0987 21.4505 24.0987 18.5768V12.0376H20.3423C19.1088 12.0386 18.1031 13.0666 18.1021 14.3297C18.1031 15.5928 19.1088 16.6208 20.3423 16.6218H21.9032C22.3242 16.6218 22.6659 16.9714 22.6659 17.4022C22.6659 17.8329 22.3242 18.1825 21.9032 18.1825H20.3423C18.2668 18.1815 16.5778 16.4533 16.5768 14.3297C16.5778 12.2062 18.2668 10.478 20.3423 10.4769H24.0987V10.3833C24.0987 7.50958 21.8137 5.17273 19.0051 5.17273H9.36193C7.09834 5.17273 5.19879 6.70011 4.53679 8.79245H14.5898C15.0107 8.79245 15.3524 9.14204 15.3524 9.57279C15.3524 10.0046 15.0107 10.3531 14.5898 10.3531H4.2724C4.2724 10.3583 4.27164 10.3633 4.27088 10.3682C4.27011 10.3732 4.26935 10.3781 4.26935 10.3833V18.5768C4.26935 21.4505 6.55328 23.7874 9.36193 23.7874H14.2135C14.6345 23.7874 14.9762 24.137 14.9762 24.5677C14.9762 24.9985 14.6345 25.3481 14.2135 25.3481H9.36193C5.71232 25.3481 2.74402 22.311 2.74402 18.5768V10.3833C2.74402 6.64913 5.71232 3.61206 9.36193 3.61206ZM19.745 14.2594C19.745 13.8286 20.0867 13.479 20.5076 13.479H20.8544C21.2754 13.479 21.6171 13.8286 21.6171 14.2594C21.6171 14.6901 21.2754 15.0397 20.8544 15.0397H20.5076C20.0867 15.0397 19.745 14.6901 19.745 14.2594Z"
                fill="#EEBD5E"/>
            </Svg>
          </View>
          <Text style={styles.pressableText}>Calculate Fees</Text>
          <View style={styles.pressableRightMark}>
            <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.14622 3.71593C5.89867 3.96114 5.89697 4.35867 6.14792 4.60389L9.85863 8.23773L9.92418 8.29371C10.175 8.48026 10.5335 8.46076 10.7612 8.23522C10.8846 8.11303 10.9475 7.95234 10.9475 7.79249C10.9475 7.63181 10.8846 7.47029 10.7595 7.3481L7.0488 3.71342L6.98325 3.65743C6.73244 3.47088 6.37392 3.49038 6.14622 3.71593ZM6.09033 14.7254C5.89885 14.9716 5.91919 15.3243 6.14611 15.5491C6.39451 15.7943 6.79859 15.7951 7.04869 15.5499L12.636 10.0766L12.6934 10.0124C12.7803 9.9008 12.824 9.76678 12.824 9.63218C12.824 9.47233 12.7611 9.31165 12.6377 9.18946C12.3893 8.94341 11.9852 8.94257 11.7351 9.18778L6.14781 14.6611L6.09033 14.7254Z"
                fill="#898989"
                fill-opacity="0.5"
              />
            </Svg>
          </View>
        </Pressable>

        <View style={styles.horizontalLine}></View>
        <Pressable style={styles.pressableItem} onPress={() => refCalculateRBSheet.current.open()}>
          <View style={styles.icon}>
            <Svg width={26} height={26} viewBox="0 0 26 26" fill="none">
              <Path
                d="M3.00513 12.2846C3.45796 12.2846 3.82413 11.9184 3.82413 11.4656V11.4461V8.94034C3.82413 5.64376 5.64413 3.82376 8.94071 3.82376H17.0592C20.3666 3.82376 22.1758 5.64376 22.1758 8.94034V17.0653C22.1758 20.3619 20.3558 22.1722 17.0592 22.1722H8.94179C5.63546 22.1722 3.82521 20.3522 3.82521 17.0653C3.82521 16.6082 3.45471 16.2366 2.99646 16.2366C2.53821 16.2366 2.16771 16.6082 2.16771 17.0653C2.16663 21.2416 4.75796 23.8329 8.93096 23.8329H17.0592C21.242 23.8329 23.8333 21.2416 23.8333 17.0686V8.94359C23.8333 4.75868 21.242 2.16626 17.0592 2.16626H8.94179C4.77746 2.16626 2.16663 4.75868 2.16663 8.94034V11.4558C2.16555 11.913 2.53605 12.2846 2.99321 12.2846H2.99538H3.00513ZM12.1877 8.26954C12.1877 7.82104 12.5517 7.45704 13.0002 7.45704C13.4487 7.45704 13.8127 7.82104 13.8127 8.26954V12.5325L17.0908 14.4868C17.4754 14.7175 17.6022 15.2159 17.3725 15.6015C17.2208 15.8561 16.95 15.998 16.6738 15.998C16.5318 15.998 16.3888 15.9612 16.2578 15.8832L12.5842 13.6916C12.3383 13.5443 12.1877 13.2789 12.1877 12.9929V8.26954Z"
                fill="#EEBD5E"
              />
            </Svg>
          </View>
          <Text style={styles.pressableText}>Time & Cost</Text>
          <View style={styles.pressableRightMark}>
            <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.14622 3.71593C5.89867 3.96114 5.89697 4.35867 6.14792 4.60389L9.85863 8.23773L9.92418 8.29371C10.175 8.48026 10.5335 8.46076 10.7612 8.23522C10.8846 8.11303 10.9475 7.95234 10.9475 7.79249C10.9475 7.63181 10.8846 7.47029 10.7595 7.3481L7.0488 3.71342L6.98325 3.65743C6.73244 3.47088 6.37392 3.49038 6.14622 3.71593ZM6.09033 14.7254C5.89885 14.9716 5.91919 15.3243 6.14611 15.5491C6.39451 15.7943 6.79859 15.7951 7.04869 15.5499L12.636 10.0766L12.6934 10.0124C12.7803 9.9008 12.824 9.76678 12.824 9.63218C12.824 9.47233 12.7611 9.31165 12.6377 9.18946C12.3893 8.94341 11.9852 8.94257 11.7351 9.18778L6.14781 14.6611L6.09033 14.7254Z"
                fill="#898989"
                fill-opacity="0.5"
              />
            </Svg>
          </View>
        </Pressable>

        <RBSheet
          ref={refWarehouseRBSheet}
          // closeOnDragDown={true}
          closeOnPressMask={true}
          height={320}
          openDuration={300}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }
          }}
        >
          <WarehouseAddress address={warehouseAddress}/>
        </RBSheet>
        <RBSheet
          ref={refCalculateRBSheet}
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
          <CalculateMore/>
        </RBSheet>
        <View style={styles.horizontalLine}></View>
        <Pressable style={styles.pressableItem} onPress={() => navigation.navigate("ChangePwdScreen")}>
          <View style={styles.icon}>
            <Svg width="21" height="24" viewBox="0 0 21 24">
              <Path
                d="M11.3161 0.858866L18.9151 3.45225C19.7651 3.74282 20.3361 4.52529 20.3361 5.40158V12.9987C20.3361 15.3015 19.4802 17.5311 17.9274 19.2711C17.2164 20.0684 16.304 20.7537 15.1385 21.3668L11.0312 23.5232C10.9028 23.5896 10.7616 23.6239 10.6191 23.6239C10.4779 23.6239 10.3366 23.5896 10.2083 23.5232L6.09264 21.3657C4.92482 20.7514 4.01128 20.0661 3.3014 19.2722C1.74627 17.53 0.888062 15.2992 0.888062 12.9941C0.888062 12.5297 1.27655 12.1522 1.75451 12.1522C2.23247 12.1522 2.62096 12.5297 2.62096 12.9941C2.62096 14.8954 3.3273 16.7326 4.60932 18.1694C5.18028 18.8089 5.93489 19.3695 6.91553 19.8843L10.6191 21.8256L14.3145 19.8854C15.2928 19.3718 16.0474 18.8112 16.6195 18.1694C17.8992 16.7338 18.6043 14.8988 18.6043 12.9987V5.40158C18.6043 5.23913 18.4984 5.09499 18.3418 5.04122L10.7427 2.44784C10.6592 2.41924 10.5661 2.41924 10.4814 2.44784L2.88348 5.04122C2.72691 5.09499 2.62096 5.23913 2.62096 5.40158V7.57512C2.62096 8.04072 2.23247 8.41823 1.75451 8.41823C1.27655 8.41823 0.888062 8.04072 0.888062 7.57512V5.40158C0.888062 4.52529 1.4602 3.74282 2.31017 3.45225L9.90807 0.858866C10.3625 0.705573 10.8628 0.705573 11.3161 0.858866ZM9.79551 14.8351C9.56477 14.8351 9.3458 14.7459 9.18334 14.588L6.99839 12.4648C6.66052 12.1354 6.66052 11.6046 6.99839 11.2751C7.33743 10.9456 7.88485 10.9456 8.22272 11.2751L9.79551 12.8023L13.6828 9.02604C14.0206 8.69772 14.5692 8.69772 14.9071 9.02604C15.245 9.35436 15.245 9.88745 14.9071 10.2158L10.4077 14.588C10.2452 14.7459 10.0251 14.8351 9.79551 14.8351Z"
                fill="#EEBD5E"/>
            </Svg>
          </View>
          <Text style={styles.pressableText}>Change Password</Text>
          <View style={styles.pressableRightMark}>
            <Svg width="19" height="19" viewBox="0 0 19 19" fill="none">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.14622 3.71593C5.89867 3.96114 5.89697 4.35867 6.14792 4.60389L9.85863 8.23773L9.92418 8.29371C10.175 8.48026 10.5335 8.46076 10.7612 8.23522C10.8846 8.11303 10.9475 7.95234 10.9475 7.79249C10.9475 7.63181 10.8846 7.47029 10.7595 7.3481L7.0488 3.71342L6.98325 3.65743C6.73244 3.47088 6.37392 3.49038 6.14622 3.71593ZM6.09033 14.7254C5.89885 14.9716 5.91919 15.3243 6.14611 15.5491C6.39451 15.7943 6.79859 15.7951 7.04869 15.5499L12.636 10.0766L12.6934 10.0124C12.7803 9.9008 12.824 9.76678 12.824 9.63218C12.824 9.47233 12.7611 9.31165 12.6377 9.18946C12.3893 8.94341 11.9852 8.94257 11.7351 9.18778L6.14781 14.6611L6.09033 14.7254Z"
                fill="#898989"
                fill-opacity="0.5"
              />
            </Svg>
          </View>
        </Pressable>
        <View style={styles.horizontalLine}></View>

        <Pressable style={styles.pressableItem} onPress={() => navigation.navigate("LogInPage")}>
          <View style={styles.icon}>
            <Svg width={30} height={29} viewBox="0 0 28 29" fill="none">
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.979 2.95215H19.7754C22.6843 2.95215 25.052 5.22869 25.052 8.02803V16.7384C25.052 17.2246 24.6406 17.6181 24.1363 17.6181C23.6297 17.6181 23.2194 17.2246 23.2194 16.7384V8.02803C23.2194 6.20108 21.6746 4.71389 19.7754 4.71389H13.979C12.0727 4.71389 10.5219 6.20565 10.5219 8.03947V9.10452C10.5219 9.59071 10.1128 9.98425 9.60618 9.98425C9.10075 9.98425 8.69046 9.59071 8.69046 9.10452V8.03947C8.69046 5.23441 11.063 2.95215 13.979 2.95215ZM16.0042 12.5158C15.8335 12.6908 15.6081 12.7778 15.3815 12.7778C15.1596 12.7778 14.9364 12.6931 14.7645 12.5226L13.9267 11.691C13.5829 11.3489 13.5795 10.7918 13.9199 10.4452C14.2591 10.0985 14.8135 10.0962 15.1596 10.4383L15.9985 11.2711C16.3423 11.612 16.3458 12.1703 16.0042 12.5158ZM13.9224 18.3414C13.5808 17.9959 13.582 17.4388 13.9246 17.0956L15.7461 15.2732H4.1926C3.70878 15.2732 3.31604 14.8786 3.31604 14.3924C3.31604 13.9062 3.70878 13.5104 4.1926 13.5104H17.8691C18.2243 13.5104 18.5442 13.7254 18.6797 14.056C18.8151 14.3855 18.7389 14.7653 18.4884 15.017L15.1621 18.3437C14.9913 18.5142 14.767 18.6 14.5428 18.6C14.3185 18.6 14.0931 18.5142 13.9224 18.3414ZM24.1357 19.864C23.6303 19.864 23.22 20.2586 23.22 20.7448C23.22 22.5786 21.6692 24.0704 19.7629 24.0704H13.9665C12.0685 24.0704 10.5225 22.5832 10.5225 20.7563V19.6798C10.5225 19.1936 10.1122 18.7989 9.60677 18.7989C9.10135 18.7989 8.69106 19.1936 8.69106 19.6798V20.7563C8.69106 23.5556 11.0576 25.8321 13.9665 25.8321H19.7629C22.6789 25.8321 25.0514 23.5499 25.0514 20.7448C25.0514 20.2586 24.6412 19.864 24.1357 19.864Z"
                fill="#EEBD5E"/>
            </Svg>
          </View>
          <Text style={styles.pressableText}>Logout</Text>
        </Pressable>
        <View style={styles.horizontalLine}></View>
        <View style={{height: 40}}></View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: Colors.profileBackgroundGreen,
    justifyContent: 'center',
    width: '100%',
    height: 400,
    paddingTop: 65,
    alignItems: 'center'
  },
  label: {
    flexDirection: 'row',
    backgroundColor: Colors.labelLightGreen,
    width: '56%',
    justifyContent: 'space-evenly',
    height: 72,
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 16,
  },
  whiteText: {
    fontFamily: FontFamily.regular,
    color: Colors.white,
    fontSize: 14,
    alignSelf: 'center',
  },
  whiteNumberText: {
    color: Colors.white,
    fontSize: FontSizes.bodyText,
    fontFamily: FontFamily.bold,
    alignSelf: 'center',
  },
  verticalLine: {
    height: '50%',
    width: 1,
    backgroundColor: Colors.lineGray,
  },
  bottomContainer: {
    paddingHorizontal: 10,
    marginTop: -20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: Colors.white,
  },
  horizontalLine: {
    height: 1,
    width: '90%',
    backgroundColor: Colors.lineGray,
    alignSelf: 'center',
  },
  pressableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20
  },
  pressableText: {
    fontFamily: FontFamily.medium,
    marginLeft: 16,
    fontSize: 15,
    color: '#212121'
  },
  pressableRightMark: {
    position: 'absolute',
    right: 0,
  },
  icon: {
    width: 25,
    alignItems: 'center',
  }
})
