import haversine from 'haversine-distance';
import { Alert } from "react-native";
import * as Location from 'expo-location';


export function calculateLocation(aLat, aLng, bLat, bLng) {
    const start = {
        latitude: aLat,
        longitude: aLng
    }
    const end = {
        latitude: bLat,
        longitude: bLng
    }
    const distanceInMeter = haversine(start, end);
    return (distanceInMeter / 1600).toFixed(1);
}

export async function getUserLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permission to access location was denied, you will not get access to any location related features.');
        return;
    }

    try {
        let location = await Location.getLastKnownPositionAsync({});
        if (location !== null) {
            Location.getCurrentPositionAsync({});
            return {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            };
        } else {
            location = await Location.getCurrentPositionAsync({});
            return {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            };
        }
    } catch {
        Alert.alert('Could not get your location, please try again later.');
    }
}