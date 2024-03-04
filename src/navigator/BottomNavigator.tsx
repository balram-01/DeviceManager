import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Register from '../screens/register/Register';
import Candidates from '../screens/candidates/Candidates';
import DeviceInfo from '../screens/deviceInfo/DeviceInfo';
import CapturePhoto from '../screens/capturePhoto/CapturePhoto';
import Icon from 'react-native-vector-icons/FontAwesome'; 
const Tab = createBottomTabNavigator();

function BottomNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen 
          name="Register" 
          component={Register} 
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon name="user" size={size} color={color} /> 
            ),
            headerShown:false
          }}
        />
        <Tab.Screen  
          name="Candidates" 
          component={Candidates} 
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon name="users" size={size} color={color} /> 
            ),
            headerShown:false
          }}
        />
        <Tab.Screen 
          name="DeviceInfo" 
          component={DeviceInfo} 
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon name="info" size={size} color={color} /> 
            ),
             headerShown:false
          }}
        />
        <Tab.Screen 
          name="CapturePhoto" 
          component={CapturePhoto} 
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon name="camera" size={size} color={color} />
            ),
             headerShown:false
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomNavigator;
