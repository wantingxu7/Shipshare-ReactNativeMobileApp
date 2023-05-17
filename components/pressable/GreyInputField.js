import { Input } from '@rneui/themed';
import {useWindowDimensions} from "react-native";
import {Colors} from "../../styles/Colors";

function GreyInputField({placeholder,leading, trailing, onChangeValue}) {
    const {width} = useWindowDimensions();
    return(
        <Input
            placeholder={placeholder}
            leftIcon={leading}
            rightIcon={trailing}

            leftIconContainerStyle={{
                marginRight: 10,
            }}
            placeholderTextColor={Colors.gray}
            containerStyle={{
                backgroundColor: '#FAFAFA',
                borderRadius:12,
                width: width - 48,
                height: 56,
                marginBottom: 10
            }}
            onChangeText={onChangeValue}
            inputContainerStyle={{
                backgroundColor: '#FAFAFA',
                marginTop: 5,
                marginLeft: 8,
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

export default GreyInputField;