import React, { useState, useEffect, useContext } from 'react'
import {
    View, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity,
    Keyboard, ActivityIndicator, KeyboardAvoidingView
} from 'react-native';

// Firebase Related Import
import auth from '@react-native-firebase/auth';

//Required Screens
// import {Signin, Doctors} from '../Index';

//Context API
import { AuthContext } from '../Navigation/AuthProvider';

//Custom Components
import {Header, CustomButton, CustomInput} from '../Component/Index'

//Utills
import { Colors } from '../GlobalStyles/Index';

const Signup = ({ navigation }) => {

    const { register } = useContext(AuthContext);

    // All States

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Signup function 

    const signup_fun = async () => {
        if (!email || !password) {
            alert('Please fill all field')
            return
        }
        try {
            setCalculating(true);
            await register(email, password)
            console.log("singup success")
            navigation.navigate("Doctors")
        } catch (error) {
            alert(error)
        }
    }

    return (
        <View style={{flex:1}}>
            <Header content="Please SignUp FIrst" />
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

                <CustomButton backgroundColor={Colors.blue} onPress={() => signup_fun()} title="SignUp" />

                <TouchableOpacity onPress={() => navigation.navigate("Signin")} style={{ alignSelf: 'center', marginTop: "5%" }}>
                    <Text>Already Have Account Login Here</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </View>
    )
}


export default Signup