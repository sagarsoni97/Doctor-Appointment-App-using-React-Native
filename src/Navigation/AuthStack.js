import React,{useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()
// import {Signup, Signin} from '../Screens/Index'
import Signup from '../Screens/Signup'
import Signin from '../Screens/Signin'

export default function AuthStack() {

  return (
 
      <Stack.Navigator>
        <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name='Signin' component={Signin} options={{headerShown:false}}/>
      </Stack.Navigator>
   
  )
}
