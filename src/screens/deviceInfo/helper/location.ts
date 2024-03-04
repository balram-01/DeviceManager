// React Native Geolocation
// https://aboutreact.com/react-native-geolocation/

// import React in our code
import React, { useState, useEffect } from "react";

// import all the components we are going to use
import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";

//import all the components we are going to use.
import Geolocation from "@react-native-community/geolocation";
import DeviceInfo from "react-native-device-info";
const useLocation = () => {
  var watchID: any = null;
  const [currentLongitude, setCurrentLongitude] = useState("");
  const [currentLatitude, setCurrentLatitude] = useState("");
  const [locationStatus, setLocationStatus] = useState("");

  const unSubScribeLocation = () => {
    Geolocation.clearWatch(watchID);
  };
  const requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      getOneTimeLocation();
      subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          // @ts-ignore
          {
            title: "Location Access Required",
            message: "This App needs to Access your location",
          },
          
        );
      
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          DeviceInfo.getAvailableLocationProviders().then((providers) => {
            if(!providers.gps){
              Alert.alert(
                'GPS Not Enabled',
                'GPS is not enabled. Please enable GPS to use this feature.',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Ok',
                    
                  },
                ],
                { cancelable: true}
              );
            }
            // {
            //   gps: true
            //   network: true
            //   passive: true
            // }
          });
          
          
          //To Check, If Permission is granted
          getOneTimeLocation();
          subscribeLocationLocation();
        } else {
          setLocationStatus("Permission Denied");
        }
      } catch (err) {
        console.warn(err);
      } finally {
        unSubScribeLocation();
      }
    }
  };

  const getOneTimeLocation = () => {
    setLocationStatus("Getting Location ...");
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position: any) => {
        setLocationStatus("You are Here");

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error: any) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      }
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position: any) => {
        //Will give you the location on location change

        setLocationStatus("You are Here");
        console.log(position);

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error: any) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      }
    );
  };
  return {
    currentLatitude,
    currentLongitude,
    locationStatus,
    requestLocationPermission,
  };
};

export default useLocation;
