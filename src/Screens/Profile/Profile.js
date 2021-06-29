import React, { useEffect, useState, useContext } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Button,
    FlatList,
    Linking,
    Platform,
    ActivityIndicator
} from 'react-native';

// Third Party Library
import { Card } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';

// Firebase
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { serverTimestamp } from '../../../firebase'

// All Required Screens
import {Signin} from '../Index';

// Reuse Component
import {Header} from '../../Component/Index'

//Context API
import { AuthContext } from '../../Navigation/Index';

export const Profile = ({ navigation }) => {

    const { logout } = useContext(AuthContext);


    // Logout Logic
    const logOut = async () => {
        try {
            await logout()
            navigation.navigate("Signin")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            
                <Header content="Profile" />
                <Button onPress={() => logOut()} color="red" title="logout" />

                <Text style={{ textAlign: 'center', fontSize: 20 }}>You Are Logged in As {auth().currentUser.email}</Text>

        </View>
    )
}
