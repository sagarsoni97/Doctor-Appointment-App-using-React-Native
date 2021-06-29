import React, { useState } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Doctors, DoctorDetails} from '../Screens/Index';
import {Profile, MyAppointment} from '../Screens/Index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Vstack = createStackNavigator();

export const VisitStack = () => {
  return (

    <Vstack.Navigator>
      <Vstack.Screen name="Doctors" component={Doctors}  options={{ headerShown: false }}/>
      <Vstack.Screen name="DoctorDetails" component={DoctorDetails}  options={{ headerShown: false }}/>
    </Vstack.Navigator>
  )
}

 const ValidStack =()=> {

  return (

   
    <Tab.Navigator>

      <Tab.Screen name="VisitStack" component={VisitStack} options={{
        tabBarLabel: 'Doctors',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="clinic-medical" color={color} size={size} />
        ),
      }} />

      <Tab.Screen name="MyAppointment" component={MyAppointment} options={{
        tabBarLabel: 'MyAppointment',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="calendar-check" color={color} size={size} />
        ),
      }} />

      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="user" color={color} size={size} />
        ),
      }} />

    </Tab.Navigator>
  
  );
}

export { ValidStack };