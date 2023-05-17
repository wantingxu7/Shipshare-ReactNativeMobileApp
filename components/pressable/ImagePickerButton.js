import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import {BottomSheet} from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import React, {useState} from "react";
import {Alert, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Colors} from "../../styles/Colors";
import {IconButton} from "@react-native-material/core";

export default function ImagePickerButton({image, setImage, icon, defaultImage}) {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.2,
      });

      setIsBottomSheetVisible(false);
      if (!result.canceled) {
        await setImage(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert("Error", "Unable to pick image");
    }
  };

  const pickImageFromCamera = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert("You've refused to allow this app to access your camera!");
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.2,
      });

      setIsBottomSheetVisible(false);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert("Error", "Unable to pick image");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {image ? (
          <Image source={{uri: image}} style={styles.photo}/>
        ) : (
          <Image style={[styles.photo, {borderRadius: 0}]}
                 source={require('../../assets/images/placeholder.png')}/>
        )}

        <IconButton
          onPress={() => setIsBottomSheetVisible(true)}
          icon={icon || <MaterialCommunityIcons name="plus" size={34} color={Colors.white}/>}
          style={{backgroundColor: Colors.buttonDarkGreen, position: 'absolute', left: 65, top: 65}}
        />
      </View>
      <BottomSheet isVisible={isBottomSheetVisible}>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? "#fafafa" : Colors.white,
            },
            styles.bottomSheetPressable,
          ]}
          onPress={pickImage}
        >
          <Text>Choose From Camera Roll</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? "#fafafa" : Colors.white,
            },
            styles.bottomSheetPressable,
          ]}
          onPress={pickImageFromCamera}
        >
          <Text>Take a Photo</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? "#fafafa" : Colors.white,
            },
            styles.bottomSheetPressable,
          ]}
          onPress={() => setIsBottomSheetVisible(false)}
        >
          <Text>Cancel</Text>
        </Pressable>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  photoContainer: {
    width: "100%"
  },
  photo: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  text: {
    color: Colors.textGray,
    fontSize: 14
  },
  bottomSheetPressable: {
    alignItems: "center",
    padding: 20,
  },
});