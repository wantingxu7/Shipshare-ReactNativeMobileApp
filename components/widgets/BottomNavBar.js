import MyParcelsScreen from "../screens/ParcelScreens/MyParcelsScreen";
import {ProfileScreen} from "../screens/ProfileScreens/ProfileScreen";
import GroupMainScreen from "../screens/GroupScreens/GroupMainScreen";
import ShipmentsScreen from "../screens/ShipmentScreens/ShipmentsScreen";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Image} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {FontFamily} from "../../styles/FontFamily";


const Tab = createBottomTabNavigator();

const BottomNavigationBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconPath;

          switch (route.name) {
            case 'Parcels':
              iconPath = focused
                ? require('../../assets/NavBar/ParcelsClicked.svg')
                : require('../../assets/NavBar/Parcels.svg');
              break;
            case 'Shipments':
              iconPath = focused
                ? require('../../assets/NavBar/ShipmentsClicked.svg')
                : require('../../assets/NavBar/Shipments.svg');
              break;
            case 'Groups':
              iconPath = focused
                ? require('../../assets/NavBar/GroupsClicked.svg')
                : require('../../assets/NavBar/Groups.svg');
              break;
            case 'Profile':
              iconPath = focused
                ? require('../../assets/NavBar/ProfileClicked.svg')
                : require('../../assets/NavBar/Profile.svg');
              break;
            default:
              iconPath = null;
          }

          const {uri} = Image.resolveAssetSource(iconPath);

          return (
            <SvgUri
              height="20"
              uri={uri}
            />
          );
        },
        "tabBarActiveTintColor": "#80B213",
        "tabBarInactiveTintColor": "#CCCCCC",
        "tabBarLabelStyle": {fontFamily: FontFamily.medium},
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ]
      })}
    >
      <Tab.Screen name="Parcels" component={MyParcelsScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Shipments" component={ShipmentsScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Groups" component={GroupMainScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
};

export default BottomNavigationBar;
