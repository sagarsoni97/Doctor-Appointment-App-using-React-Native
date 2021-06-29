import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    Button,
} from 'react-native';

// Third Party Library
import { Card } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker';
import { showMessage } from "react-native-flash-message";

// Firebase Import
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { serverTimestamp } from '../../../firebase'

// Reuse Component
import {Header} from '../../Component/Index'

// Required Screens
import {MyAppointment} from '../Index';

export const DoctorDetails = (props) => {

    const item = (props.route.params.item)

    // State
    const [name, setName] = useState(item.name)
    const [type, setType] = useState(item.type)
    const [address, setAddress] = useState(item.address)
    const [fees, setFees] = useState(item.fees)
    const [experience, setExperience] = useState(item.experience)
    const [rating, setRating] = useState(item.rating)
    const [mobile, setMobile] = useState(item.mobile)
    const [date, setDate] = useState(new Date())

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: '9:00 To 10:00 AM', value: '9:00 To 10:00 AM' },
        { label: '10:00 To 11:00 AM', value: '10:00 To 11:00 AM' },
        { label: '11:00 To 12:00 AM', value: '11:00 To 12:00 AM' },
        { label: '04:00 To 05:00 AM', value: '04:00 To 05:00 AM' },
        { label: '05:00 To 06:00 AM', value: '05:00 To 06:00 AM' },
        { label: '06:00 To 07:00 AM', value: '06:00 To 07:00 AM' },
        { label: '07:00 To 08:00 AM', value: '07:00 To 08:00 AM' },
    ]);


    // Appointment COnfirmation Logic
    const confirmAppointment = async () => {
        try {
            await firestore().collection('appointment').add({
                name,
                type,
                address,
                fees,
                rating,
                experience,
                value,
                date,
                mobile,
                uid: auth().currentUser.uid,
                createdAt: serverTimestamp()
            })
            showMessage({
                message: 'Congratulations !! Your Appointment is Schedulled',
                type: 'success',
                duration: 5000
            });
            props.navigation.navigate("MyAppointment")
        } catch (error) {
            showMessage({
                message: 'something went wrong',
                type: 'danger',
                duration: 5000
            });
        }
    }

    return (
        <View >
            <Header content="Please Confirm Details" />
            <Card>
                <Image style={styles.image} source={{ uri: item.image }} />
                <Text style={styles.content}>Select Time Slot :-</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Select Time Slot"
                />
                <Text style={styles.content}>Name: {item.name} </Text>
                <Text style={styles.content}>Speciality: {item.type} </Text>
                <Text style={styles.content}>Address: {item.address}</Text>
                <Text style={styles.content}>Select Date :-</Text>
                <View>
                    <DatePicker
                        style={{ width: "100%" }}
                        format="DD-MM-YYYY"
                        date={date}
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={setDate}
                    />
                </View>

                <Text style={styles.content}>Fees: {item.fees}</Text>
                <Text style={styles.content}>Experience: {item.experience} year</Text>
                <Text style={styles.content}>Rating: {item.rating} star</Text>
                <View style={{ marginTop: "5%" }}></View>
                <Button title="Confirm Appointment" onPress={() => confirmAppointment()} />
            </Card>

        </View>
    )
}

const styles = StyleSheet.create({


    image: {
        width: '100%',
        height: 200,
        marginTop: '-4%',

    },

    content: {
        fontSize: 18,
        fontFamily: 'Josefin Sans',
        margin: 3

    },

    content2: {
        fontSize: 18,
        fontFamily: 'Josefin Sans',
        margin: 2,

    }

})
