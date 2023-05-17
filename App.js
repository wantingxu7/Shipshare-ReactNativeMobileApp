import MyParcelsScreen from "./components/screens/ParcelScreens/MyParcelsScreen";
import {StyleSheet, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import * as Font from "expo-font";
import {useEffect, useState} from "react";

import LandingPage from "./components/screens/LandingScreens/LandingPage";
import WelcomePage from "./components/screens/LandingScreens/WelcomePage";

import {Provider} from "react-redux";
import store from "./redux/store.js";
import {LogScreen} from "./components/screens/LogScreen";
import {SettingProfileScreen} from "./components/screens/ProfileScreens/SettingProfileScreen.js";
import {FormGroupScreen} from "./components/screens/GroupScreens/FormGroupScreen.js";
import {ProfileScreen} from "./components/screens/ProfileScreens/ProfileScreen.js";
import HomeScreen from "./components/screens/Home";
import GroupMainScreen from "./components/screens/GroupScreens/GroupMainScreen.js";
import {ShippingDetailScreen} from "./components/screens/ShipmentScreens/ShipmentDetailScreen.js";
import {CalculateFeeScreen} from "./components/screens/ProfileScreens/CalculateFeeScreen.js";
import TutorialScreen from "./components/screens/ProfileScreens/TutorialScreen";
import ChangePwdScreen from "./components/screens/ProfileScreens/ChangePwdScreen";
import PaymentScreen from "./components/screens/GroupScreens/PaymentScreen";
import {GroupDetailScreen} from "./components/screens/GroupScreens/GroupDetailScreen";
import OrderSuccessScreen from "./components/screens/GroupScreens/OrderSuccessScreen";
import {ParcelStatusScreen} from "./components/screens/ParcelScreens/ParcelStatusScreen";
import {GroupCheckoutScreen} from "./components/screens/GroupScreens/GroupCheckoutScreen";
import {AddParcelScreen} from "./components/screens/ParcelScreens/AddParcelScreen";
import {SelectParcelsScreen} from "./components/screens/GroupScreens/SelectParcelsScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
        'Poppins-Light': require('./assets/fonts/Poppins/Poppins-Light.ttf'),
        'Poppins-Medium': require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
        'Poppins-Italic': require('./assets/fonts/Poppins/Poppins-Italic.ttf'),
        'DMSans-Regular': require('./assets/fonts/DM_Sans/DMSans-Regular.ttf'),
        'NunitoSans': require('./assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf'),
        'Nunito-Bold': require('./assets/fonts/Nunito_Sans/NunitoSans-Bold.ttf'),
        'Nunito-SemiBold': require('./assets/fonts/Nunito_Sans/NunitoSans-SemiBold.ttf'),
        'Nunito-Light': require('./assets/fonts/Nunito_Sans/NunitoSans-Light.ttf'),
      });

      setFontLoaded(true);
    };


    loadFonts().then(r => console.log("Font loaded"));


  }, []);

  if (!fontLoaded) {
    return null;
  }


  if (!fontLoaded
  ) {
    return null;
  }


  return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LandingPage">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="LandingPage"
                component={LandingPage}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="WelcomePage"
                component={WelcomePage}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="LogInPage"
                component={LogScreen}
                options={{headerShown: false}}
            />

            {/*Group Screens*/}
            <Stack.Screen
                name="GroupMain"
                component={GroupMainScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"FormGroup"}
                component={FormGroupScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"GroupDetail"}
                component={GroupDetailScreen}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name={"JoinGroup"}
                component={SelectParcelsScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"GroupCheckout"}
                component={GroupCheckoutScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"Payment"}
                component={PaymentScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"OrderSuccess"}
                component={OrderSuccessScreen}
                options={{headerShown: false}}
            />

            {/*Shipment Screens*/}
            <Stack.Screen
                name={"ShipmentDetails"}
                component={ShippingDetailScreen}
                options={{headerShown: false}}
            />

            {/*Parcel Screens*/}
            <Stack.Screen
                name={"MyParcelsScreen"}
                component={MyParcelsScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"AddNewParcel"}
                component={AddParcelScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"ParcelStatus"}
                component={ParcelStatusScreen}
                options={{headerShown: false}}
            />

            {/*Profile Screens*/}
            <Stack.Screen
                name={"Profile"}
                component={ProfileScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"ProfileSettings"}
                component={SettingProfileScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"CalculateFees"}
                component={CalculateFeeScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"TutorialScreen"}
                component={TutorialScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"ChangePwdScreen"}
                component={ChangePwdScreen}
                options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});