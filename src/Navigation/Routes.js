import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import {ValidStack} from './ValidStack';
import { AuthContext } from './AuthProvider';
import {
  View, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity,
  Keyboard, ActivityIndicator, KeyboardAvoidingView
} from 'react-native';

export default function Routes() {

    const { user, setUser } = useContext(AuthContext);
    // const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);

    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, []);

    // if (loading) {
    //   return <Loading />;
    // }
    
    return (
      <NavigationContainer>
        {user ? <ValidStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }

  
