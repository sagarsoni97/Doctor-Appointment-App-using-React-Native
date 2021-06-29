import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    Button,
    FlatList,
} from 'react-native';

// Third Party Library
import { Card } from 'react-native-elements'
import { showMessage } from "react-native-flash-message";
import moment from 'moment'

// Firebase Import
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// All Screens
import {Signin} from '../Index';

// Reuse Component
import {Header} from '../../Component/Index'

export const MyAppointment = () => {

    // All States
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

    // Get Appointment Details
    const getDetails = async () => {
        const querySnap = await firestore().collection('appointment')
            .where('uid', '==', auth().currentUser.uid)
            .get()
        const result = querySnap.docs.map((docSnap) => {
            return {
                ...docSnap.data(),
                id: docSnap.id
            }
        })
        setItems(result)
    }

    // Hooks
    useEffect(() => {
        getDetails()
    }, [])

    // Handle Cancel Appointment
    const handleCancel = (id) => {
        firestore().collection("appointment").doc(id).delete().then(() => {
            getDetails()
            showMessage({
                message: 'Your Appointment is Cancelled',
                type: 'success',
                duration: 5000
            });
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    // Render Card Component
    const renderItem = (item) => {
        console.log(item)
        return (

            <View>
                <Card key={item.number} containerStyle={{ marginBottom: '4%', backgroundColor: '#F4F6F7' }}>
                    <Text style={styles.content}>Name: {item.name} </Text>
                    <Text style={styles.content}>Speciality: {item.type} </Text>
                    <Text style={styles.content}>Address: {item.address}</Text>
                    <Text style={styles.content}>Fees: {item.fees}</Text>
                    <Text style={styles.content}>Experience: {item.experience} year</Text>
                    <Text style={styles.content}>Rating: {item.rating} star</Text>
                    <Text style={styles.content}>Time: {item.value}</Text>
                    <Text style={styles.content}>Date : {item.date}</Text>
                    <Text style={styles.content}>Contact Mobile: {item.mobile}</Text>
                    <Button onPress={() => handleCancel(item.id)} title="Cancel Appointment" color="red" />
                </Card>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
                <Header content="Your Appointments" />
                {
                    items.length > 0 ?
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={items.reverse()}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => renderItem(item)}
                                onRefresh={() => {
                                    setLoading(true)
                                    getDetails()
                                    setLoading(false)
                                }}
                                refreshing={loading}
                            />
                        </View>
                        :
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ fontSize: 20 }}>NO Appointment Schedulled Right Now</Text>
                        </View>
                }
        </View>
    )
}

const styles = StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '5%',
        backgroundColor: '#F4F6F7',
    },

    image: {
        width: '100%',
        height: 200,
        marginTop: '-4%',
        borderRadius: 25
    },

    content: {
        fontSize: 18,
        fontFamily: 'Josefin Sans',
        margin: 2
    }

})

