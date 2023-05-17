import React, {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {Colors} from "../../styles/Colors";
import {FontSizes} from "../../styles/FontSizes";
import {SignButton} from "../pressable/SignButton";
import {Button, TextInput} from "@react-native-material/core";
import Svg, {Path, Rect} from 'react-native-svg';
import {AntDesign} from '@expo/vector-icons';
import {FontFamily} from "../../styles/FontFamily";

export const LogScreen = ({navigation}) => {
  const [remembered, setRemembered] = React.useState(true);
  const [pageState, setPageState] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isSecure, setIsSecure] = useState(true);

  return (
    <View style={styles.container}>
      {pageState === 0 ? <Text style={styles.title}>Login to your Account</Text> :
        <Text style={styles.title}>Create your Account</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        inputStyle={{fontFamily: FontFamily.regular}}
        color={Colors.buttonDarkGreen}
        leading={props => <Svg width={17} height={16} viewBox="0 0 17 16">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.4492 0.5C13.5667 0.5 14.6417 0.941667 15.4325 1.73417C16.2242 2.525 16.6667 3.59167 16.6667 4.70833V11.2917C16.6667 13.6167 14.775 15.5 12.4492 15.5H4.21667C1.89083 15.5 0 13.6167 0 11.2917V4.70833C0 2.38333 1.8825 0.5 4.21667 0.5H12.4492ZM13.775 5.95L13.8417 5.88333C14.0408 5.64167 14.0408 5.29167 13.8325 5.05C13.7167 4.92583 13.5575 4.85 13.3917 4.83333C13.2167 4.82417 13.05 4.88333 12.9242 5L9.16667 8C8.68333 8.40083 7.99083 8.40083 7.5 8L3.75 5C3.49083 4.80833 3.1325 4.83333 2.91667 5.05833C2.69167 5.28333 2.66667 5.64167 2.8575 5.89167L2.96667 6L6.75833 8.95833C7.225 9.325 7.79083 9.525 8.38333 9.525C8.97417 9.525 9.55 9.325 10.0158 8.95833L13.775 5.95Z"
            fill={email !== "" ? Colors.blackText : Colors.gray}
          />
        </Svg>}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={isSecure}
        value={password}
        inputStyle={{fontFamily: FontFamily.regular}}
        color={Colors.buttonDarkGreen}
        leading={props => <Svg width={20} height={20} viewBox="0 0 20 20">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.6023 6.1633V7.44108C16.0376 7.88909 17.0834 9.18841 17.0834 10.7403V14.8544C17.0834 16.7756 15.4906 18.3333 13.5269 18.3333H6.47408C4.50955 18.3333 2.91675 16.7756 2.91675 14.8544V10.7403C2.91675 9.18841 3.96337 7.88909 5.39782 7.44108V6.1633C5.40629 3.67895 7.46397 1.66663 9.98738 1.66663C12.5447 1.66663 14.6023 3.67895 14.6023 6.1633ZM10.0043 3.11583C11.7233 3.11583 13.1205 4.48222 13.1205 6.1633V7.26138H6.87969V6.14673C6.88816 4.47394 8.28535 3.11583 10.0043 3.11583ZM10.741 13.7124C10.741 14.1182 10.4108 14.4411 9.99585 14.4411C9.58939 14.4411 9.25915 14.1182 9.25915 13.7124V11.874C9.25915 11.4765 9.58939 11.1535 9.99585 11.1535C10.4108 11.1535 10.741 11.4765 10.741 11.874V13.7124Z"
            fill={password !== "" ? Colors.blackText : Colors.gray}
          />
        </Svg>}
        trailing={
          isSecure?
             (
          <Svg width={20} height={20} viewBox="0 0 20 20" onPress={()=>setIsSecure(!isSecure)}>
          <Path
          fill={password !== "" ? Colors.blackText : Colors.gray}
          d="M8.16941 12.7103C8.68981 13.0631 9.32404 13.2764 9.99892 13.2764C11.7878 13.2764 13.2433 11.8078 13.2433 10.0029C13.2433 9.32196 13.0318 8.68203 12.6822 8.15696L11.7959 9.05122C11.9423 9.33017 12.0236 9.65834 12.0236 10.0029C12.0236 11.1269 11.1129 12.0458 9.99892 12.0458C9.65741 12.0458 9.33217 11.9637 9.05571 11.8161L8.16941 12.7103ZM15.3574 5.45777C16.5364 6.54073 17.5365 8.00108 18.2846 9.75679C18.3496 9.91267 18.3496 10.0932 18.2846 10.2408C16.5445 14.3265 13.4465 16.7714 9.99892 16.7714H9.99079C8.42148 16.7714 6.91722 16.2545 5.59184 15.3111L4.01439 16.9027C3.89243 17.0257 3.73794 17.0832 3.58344 17.0832C3.42895 17.0832 3.26633 17.0257 3.15249 16.9027C2.94921 16.6976 2.91669 16.3694 3.07931 16.1315L3.10371 16.0987L15.1297 3.9646C15.1459 3.94819 15.1622 3.93178 15.1703 3.91537L15.1703 3.91536C15.1866 3.89896 15.2029 3.88255 15.211 3.86614L15.9753 3.09495C16.2193 2.85702 16.6014 2.85702 16.8372 3.09495C17.0812 3.33287 17.0812 3.72667 16.8372 3.9646L15.3574 5.45777ZM6.74866 10.0061C6.74866 10.2194 6.77305 10.4327 6.80558 10.6296L3.79705 13.6652C2.98393 12.7135 2.27652 11.5649 1.71547 10.244C1.65042 10.0964 1.65042 9.91587 1.71547 9.75999C3.45554 5.67428 6.55351 3.23762 9.99299 3.23762H10.0011C11.1639 3.23762 12.2941 3.51656 13.3349 4.04163L10.6191 6.78185C10.4239 6.74903 10.2125 6.72442 10.0011 6.72442C8.20413 6.72442 6.74866 8.19298 6.74866 10.0061Z"/>
          </Svg>
          )
        :  (
          <AntDesign name="eye" size={24} color={Colors.gray} onPress={()=>setIsSecure(!isSecure)}/>
          )
        }

        onChangeText={setPassword}
      />
      {pageState === 1 ?
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          secureTextEntry={isSecure}
          inputStyle={{fontFamily: FontFamily.regular}}
          color={Colors.buttonDarkGreen}
          leading={props => <Svg width={20} height={20} viewBox="0 0 20 20">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.6023 6.1633V7.44108C16.0376 7.88909 17.0834 9.18841 17.0834 10.7403V14.8544C17.0834 16.7756 15.4906 18.3333 13.5269 18.3333H6.47408C4.50955 18.3333 2.91675 16.7756 2.91675 14.8544V10.7403C2.91675 9.18841 3.96337 7.88909 5.39782 7.44108V6.1633C5.40629 3.67895 7.46397 1.66663 9.98738 1.66663C12.5447 1.66663 14.6023 3.67895 14.6023 6.1633ZM10.0043 3.11583C11.7233 3.11583 13.1205 4.48222 13.1205 6.1633V7.26138H6.87969V6.14673C6.88816 4.47394 8.28535 3.11583 10.0043 3.11583ZM10.741 13.7124C10.741 14.1182 10.4108 14.4411 9.99585 14.4411C9.58939 14.4411 9.25915 14.1182 9.25915 13.7124V11.874C9.25915 11.4765 9.58939 11.1535 9.99585 11.1535C10.4108 11.1535 10.741 11.4765 10.741 11.874V13.7124Z"
              fill={confirmPassword !== "" ? Colors.blackText : Colors.gray}
            />
          </Svg>}
          trailing={
            isSecure?
              (
                <Svg width={20} height={20} viewBox="0 0 20 20" onPress={()=>setIsSecure(!isSecure)}>
                  <Path
                    fill={password !== "" ? Colors.blackText : Colors.gray}
                    d="M8.16941 12.7103C8.68981 13.0631 9.32404 13.2764 9.99892 13.2764C11.7878 13.2764 13.2433 11.8078 13.2433 10.0029C13.2433 9.32196 13.0318 8.68203 12.6822 8.15696L11.7959 9.05122C11.9423 9.33017 12.0236 9.65834 12.0236 10.0029C12.0236 11.1269 11.1129 12.0458 9.99892 12.0458C9.65741 12.0458 9.33217 11.9637 9.05571 11.8161L8.16941 12.7103ZM15.3574 5.45777C16.5364 6.54073 17.5365 8.00108 18.2846 9.75679C18.3496 9.91267 18.3496 10.0932 18.2846 10.2408C16.5445 14.3265 13.4465 16.7714 9.99892 16.7714H9.99079C8.42148 16.7714 6.91722 16.2545 5.59184 15.3111L4.01439 16.9027C3.89243 17.0257 3.73794 17.0832 3.58344 17.0832C3.42895 17.0832 3.26633 17.0257 3.15249 16.9027C2.94921 16.6976 2.91669 16.3694 3.07931 16.1315L3.10371 16.0987L15.1297 3.9646C15.1459 3.94819 15.1622 3.93178 15.1703 3.91537L15.1703 3.91536C15.1866 3.89896 15.2029 3.88255 15.211 3.86614L15.9753 3.09495C16.2193 2.85702 16.6014 2.85702 16.8372 3.09495C17.0812 3.33287 17.0812 3.72667 16.8372 3.9646L15.3574 5.45777ZM6.74866 10.0061C6.74866 10.2194 6.77305 10.4327 6.80558 10.6296L3.79705 13.6652C2.98393 12.7135 2.27652 11.5649 1.71547 10.244C1.65042 10.0964 1.65042 9.91587 1.71547 9.75999C3.45554 5.67428 6.55351 3.23762 9.99299 3.23762H10.0011C11.1639 3.23762 12.2941 3.51656 13.3349 4.04163L10.6191 6.78185C10.4239 6.74903 10.2125 6.72442 10.0011 6.72442C8.20413 6.72442 6.74866 8.19298 6.74866 10.0061Z"/>
                </Svg>
              )
              :  (
                <AntDesign name="eye" size={24} color={Colors.gray} onPress={()=>setIsSecure(!isSecure)}/>
              )
          }
          onChangeText={setConfirmPassword}
        /> : null}

      {/*Sign up / log in button*/}
      <SignButton text={pageState === 1 ? "Sign up" : "Log in"} navigation={navigation} email={email}
                  password={password} isLogin={pageState === 0} confirmPassword={confirmPassword}/>

      {/*Switch between sign up and log in*/}
      <View style={styles.switchContainer}>
        {pageState === 0 ? <Text style={styles.bottomGrayText}>Don't have an account?</Text> :
          <Text style={styles.bottomGrayText}>Already have an account?</Text>}
        <Button variant="text" title={pageState === 0 ? "Sign up" : "Log in"} color={Colors.buttonDarkGreen}
                style={styles.greenText} onPress={() => setPageState(1 - pageState)}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'flex-start'
  },
  title: {
    color: Colors.black,
    fontSize: FontSizes.logTitle,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    marginBottom: 50,
    marginLeft: "6%",
    fontFamily: FontFamily.bold,
  },
  input: {
    width: '88%',
    height: 60,
    marginBottom: 20,
    alignSelf: 'center',
  },
  rememberContainer: {
    flexDirection: 'row',
    marginLeft: "5%",
    padding: 5,
    width: '88%',
  },
  rememberText: {
    color: Colors.black,
    fontSize: FontSizes.bodyText,
    textAlign: 'center',
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 20,
  },
  notRememberText: {
    color: Colors.gray,
    fontSize: FontSizes.bodyText,
    textAlign: 'center',
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 20,
  },
  greenText: {
    color: Colors.buttonDarkGreen,
    alignSelf: 'center',
    marginVertical: 20,
    fontFamily: FontFamily.bold,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 100,
    marginBottom: -100,
  },
  bottomGrayText: {
    color: Colors.gray,
    fontSize: FontSizes.groupCardText,
    fontFamily: FontFamily.regular,
  }
})
