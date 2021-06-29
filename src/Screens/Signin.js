import React, { useState, useEffect, useContext } from 'react'
import {
    View, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity,
    Keyboard, ActivityIndicator, KeyboardAvoidingView
} from 'react-native';

// Firebase Related Import
import auth from '@react-native-firebase/auth';

//Required Screens
// import {Signup, Doctors} from '../Index';

//Context API
import { AuthContext } from '../Navigation/AuthProvider';

//Custom Components
import {Header, CustomButton, CustomInput} from '../Component/Index'

//Utills
import { Colors } from '../GlobalStyles/Index';

const Signin = ({ navigation }) => {

    //Context Distructuring
    const { login } = useContext(AuthContext);

    // All States
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Signin function 

    const signin_fun = async () => {
        if (!email || !password) {
            alert('Please fill all field')
            return
        }
        try {
            await login(email, password)
        } catch (err) {
            alert(err)
        }
    }

    return (
        <View style={{flex:1}}>
            <Header content="Please Signin FIrst" />
            <KeyboardAvoidingView>

                <CustomInput
                    value={email}
                    placeholder={'Email'}
                    onChange={setEmail}
                    keyboardType={'email-address'}
                    autoCapitalize='none'
                    autoCompleteType='off'
                />

                <CustomInput
                    value={password}
                    placeholder={'Password'}
                    onChange={setPassword}
                    autoCapitalize='none'
                    autoCompleteType='off'
                />

                <CustomButton backgroundColor={Colors.orange} onPress={() => signin_fun()} title="Signin" />

                <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={{ alignSelf: 'center', marginTop: "5%" }}>
                    <Text>Don't Have Account Signup Here</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </View>
    )
}


export default Signin