import * as React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../../theme/colors";
import Geolocation from "@react-native-community/geolocation";
import useLocation from "./helper/location";
interface IDeviceInfoProps {}

const DeviceInfo: React.FunctionComponent<IDeviceInfoProps> = (props) => {
  const {
    locationStatus,
    requestLocationPermission,
    currentLongitude,
    currentLatitude,
  } = useLocation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.dataContainer}
    >
      <View>
        <View style={styles.rowContainer}>
          <Pressable
            style={styles.btn}
            onPress={async () => {
              await requestLocationPermission();
            }}
          >
            <Text style={styles.btnText}>{"Get Current Coordinates"}</Text>
          </Pressable>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{`longitude:${
              currentLongitude ? currentLatitude : 0
            },latitude:${currentLatitude ? currentLatitude : 0}`}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Pressable
            style={styles.btn}
            onPress={async () => {
              await requestLocationPermission();
            }}
          >
            <Text style={styles.btnText}>{"Get Mobile No."}</Text>
          </Pressable>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{``}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Pressable style={styles.btn} onPress={async () => {}}>
            <Text style={styles.btnText}>{"Get ImEI No"}</Text>
          </Pressable>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{``}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Pressable style={styles.btn} onPress={async () => {}}>
            <Text style={styles.btnText}>{"Get Photo Count"}</Text>
          </Pressable>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{``}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Pressable style={styles.btn} onPress={async () => {}}>
            <Text style={styles.btnText}>{"Get Battery %"}</Text>
          </Pressable>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{``}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Pressable style={styles.btn} onPress={async () => {}}>
            <Text style={styles.btnText}>{"Get OS Version"}</Text>
          </Pressable>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{``}</Text>
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
