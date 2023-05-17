import {FlatList, Text, View} from "react-native";
import {Colors} from "../../../styles/Colors";
import {FontFamily} from "../../../styles/FontFamily";

function WarehouseAddress(props) {
    return (
        <View style={{
            backgroundColor: '#F2F2F2',
            display: 'flex',
            flex:1,
            width: '100%',
            paddingHorizontal: 24,
            flexDirection:'column',
        }}>
            <Text style={{
                fontFamily: FontFamily.bold,
                fontSize: 24,
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                color: '#212121',
                marginBottom: 8,
                marginTop: 24,
            }}>Address Copied!</Text>
            <View style={{
                backgroundColor: '#FFFFFF',
                padding: 20,
                borderRadius: 12,
                marginVertical: 16,
            }}>
                <Text style={{
                    color: Colors.textGray,
                    lineHeight: 20,
                    fontFamily: FontFamily.regular,
                }}>
                    {props.address}
                </Text>
            </View>
            <View style={{
                marginTop: 8
            }}>
                <Text style={{textAlign: 'center', color: '#444444', fontFamily: FontFamily.regular,}}>
                    Please paste the above information into the "Shipping Address" field of your online shopping order.
                </Text>
            </View>
        </View>
    );
}

export default WarehouseAddress;