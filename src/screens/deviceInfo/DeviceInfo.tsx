import * as React from "react";
import {
  NativeModules,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../../theme/colors";
import Geolocation from "@react-native-community/geolocation";
import useLocation from "./helper/location";
import Device from "react-native-device-info";
import { PermissionsAndroid } from "react-native";

async function requestPhoneStatePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      {
        title: "Phone State Permission",
        message:
          "This app needs access to your phone state in order to retrieve the SIM phone number.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Phone state permission granted");
    } else {
      console.log("Phone state permission denied");
    }

    return granted; // Return the result of the permission request
  } catch (err) {
    console.warn(err);
    return null; // Return null in case of error
  }
}

async function requestSMSPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: "SMS Permission",
        message:
          "This app needs access to your SMS in order to retrieve SMS messages.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("SMS permission granted");
    } else {
      console.log("SMS permission denied");
    }

    return granted; 
  } catch (err) {
    console.warn(err);
    return null; 
  }
}

const { ReactCustomModule } = NativeModules;
interface IDeviceInfoProps {}

const DeviceInfo: React.FunctionComponent<IDeviceInfoProps> = (props) => {
  const {
    locationStatus,
    requestLocationPermission,
    currentLongitude,
    currentLatitude,
  } = useLocation();

  const [battery, setBattery] = React.useState<number>();
  const [osVersion, setOsVersion] = React.useState<string>();
  const [imeiNo, setImeiNo] = React.useState<string>();
  const [mobileNo, setMobileNo] = React.useState();
  const fetchBatteryLevel = async () => {
    const batteryLevel = await Device.getBatteryLevel();
    setBattery(Math.abs(batteryLevel * 100));
  };

  const fetchOSVersion = () => {
    const version = Device.getSystemVersion();
    setOsVersion(version);
  };

  const fetchImeiNo = async () => {
    const imei = await Device.getSerialNumber();
    setImeiNo(imei);
  };
  const fetchMobileNo = async () => {
    try {
      const phoneStatePermission = await requestPhoneStatePermission();
      const smsPermission = await requestSMSPermission();

      console.log("Phone state permission:", phoneStatePermission);
      console.log("SMS permission:", smsPermission);

      // Check if both permissions are granted before attempting to fetch the SIM phone number
      if (
        phoneStatePermission === PermissionsAndroid.RESULTS.GRANTED &&
        smsPermission === PermissionsAndroid.RESULTS.GRANTED
      ) {
        const number = await ReactCustomModule.getSIMPhoneNumber();
        setMobileNo(number);
      } else {
        console.log("Phone state or SMS permission denied");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.dataContainer}
    >
      <View>
        <View style={styles.rowContainer}>
          <Pressable style={styles.btn} onPress={requestLocationPermission}>
            <Text style={styles.btnText}>{"Get Current Coordinates"}</Text>
          </Pressable>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{`longitude:${
              currentLongitude ? currentLongitude : 0
            },latitude:${currentLatitude ? currentLatitude : 0}`}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Pressable style={styles.btn} onPress={fetchMobileNo}>
            <Text style={styles.btnText}>{"Get Mobile No."}</Text>
          </Pressable>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{mobileNo}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Pressable style={styles.btn} onPress={fetchImeiNo}>
            <Text style={styles.btnText}>{"Get ImEI No"}</Text>
          </Pressable>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{imeiNo}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Pressable style={styles.btn} onPress={() => {}}>
            <Text style={styles.btnText}>{"Get Photo Count"}</Text>
          </Pressable>
          <View style={styles.btn}>
            <Text style={styles.btnText}></Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Pressable style={styles.btn} onPress={fetchBatteryLevel}>
            <Text style={styles.btnText}>{"Get Battery %"}</Text>
          </Pressable>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{battery}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Pressable style={styles.btn} onPress={fetchOSVersion}>
            <Text style={styles.btnText}>{"Get OS Version"}</Text>
          </Pressable>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{osVersion}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DeviceInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    flex: 1,
  },
  btn: {
    borderColor: colors.primary,
    borderWidth: 0.5,
    flex: 1,
    margin: 10,
    minHeight: 25,
  },
  btnText: {
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
    alignSelf: "center",
    flexWrap: "wrap",
    flex: 1,
    flexShrink: 1,
    margin: 6,
  },
  dataContainer: {
    padding: 20,
  },
});
