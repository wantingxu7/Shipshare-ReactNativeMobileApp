import {Text, View, StyleSheet, Image} from "react-native";
import {SvgUri} from "react-native-svg";
import {FontFamily} from "../../styles/FontFamily";


function CalculateFeeCard ({path, type, time, price}) {
    const {uri} = Image.resolveAssetSource(path);
    return (
        <View style={styles.container}>
            <View style={styles.leftIconContainer}>
                <SvgUri
                    height="24"
                    uri={uri}
                />
            </View>
            <View style={styles.middleTextContainer}>
                <Text style={styles.topText}>{type}</Text>
                <Text style={styles.bottomText}>{time}</Text>
            </View>
            <View style={styles.rightTextContainer}>
                <Text style={styles.rightText}>{price}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 30,
        gap: 16,
        width: '100%',
        height: 108,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginTop: 12,
        marginBottom: 12,

        shadowColor: 'lightgrey',
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
    },
    leftIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        gap: 10,
        backgroundColor: 'rgba(34, 187, 156, 0.08)',
        borderRadius: 28
    },
    middleTextContainer: {
        flexGrow: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 0,
        gap: 6,
    },
    topText: {
        fontFamily: FontFamily.bold,
        fontSize: 16,
        color: '#212121',
    },
    bottomText: {
        fontFamily: FontFamily.light,
        fontSize: 14,
        letterSpacing: 0.2,
        color: '#616161',
    },
    rightTextContainer: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    rightText: {
        fontFamily: FontFamily.bold,
        fontSize: 18,
        color: '#80B213',
    }
});


export default CalculateFeeCard;