import CalculateFeeCard from "../../Cards/CalculateFeeCard";
import {FlatList, Text, View} from "react-native";
import {Divider} from "@rneui/themed";
import {FontFamily} from "../../../styles/FontFamily";


const data = [
    { path : require('../../../assets/icons/Air-Standard.svg'),
      type : 'Air Standard',
      time : '1 week',
      price : 15,
    },
    { path : require('../../../assets/icons/Air-Sensitive.svg'),
        type : 'Air Sensitive',
        time : '2 week',
        price : 20,
    },
    { path : require('../../../assets/icons/Sea-Standard.svg'),
        type : 'Sea Standard',
        time : '4 week',
        price : 5,
    },
    { path : require('../../../assets/icons/Sea-Sensitive.svg'),
        type : 'Sea Sensitive',
        time : '6 week',
        price : 10,
    },
];

function CalculateResult(props) {

  // Calculate the actual factor. Actual factor is the greater value between weight and volume / 5000.
  const actualFactor =
      props.weight > Math.ceil(props.volume / 5000) ? props.weight : Math.ceil(props.volume / 5000);

  return (
    <View style={{
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flex:1,
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        paddingHorizontal: 24,
        flexDirection:'column',
    }}>
        <View style={{width: 70, alignSelf: 'center'}}>
        <Divider
            width={3} color={"#E0E0E0"}
            style={{ position:"relative", top: -10, marginBottom: 10 }}
        />
        </View>
        <Text style={{
            fontFamily: FontFamily.bold,
            fontSize: 24,
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: '#212121',
            marginBottom: 8,
        }}>Price</Text>

        <FlatList
            style={{flexGrow:0, marginBottom: 48} }
            data={data}
            renderItem={({item}) =>
            <CalculateFeeCard
                path={item.path}
                type={item.type}
                time={item.time}
                price={'$' + (item.price * actualFactor)}
            />
        }
        />
    </View>
  );
}

export default CalculateResult;