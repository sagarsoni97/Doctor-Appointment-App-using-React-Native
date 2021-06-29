import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';

// Firebase Related Import
import firestore from '@react-native-firebase/firestore';

// All Screens
import {Signin, DoctorDetails} from '../Index';

// Third Party Library
import { Card } from 'react-native-elements'

//Custom Components
import {Header} from '../../Component/Index'

export const Doctors = ({ navigation }) => {

    // All STates
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

    // Get Details Function
    const getDetails = async () => {
        const querySnap = await firestore().collection('blog').get()
        const result = querySnap.docs.map(docSnap => docSnap.data())
        setItems(result)
    }

    // Hooks
    useEffect(() => {
        getDetails()
        return () => {
            console.log('cleanUp')
        }
    }, [])

    // Render Card Component
    const renderItem = (item) => {
        console.log(item)
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('DoctorDetails', { item })}>
                    <Card containerStyle={{ marginBottom: '4%', backgroundColor: '#F4F6F7', borderRadius: 25 }}>
                        <Image style={styles.image} source={{ uri: item.image }} />
                        <Text style={styles.content}>Name: {item.name} </Text>
                        <Text style={styles.content}>Speciality: {item.type} </Text>
                        <Text style={styles.content}>Address: {item.address}</Text>
                        <Text style={styles.content}>Fees: {item.fees}</Text>
                        <Text style={styles.content}>Experience: {item.experience} year</Text>
                        <Text style={styles.content}>Rating: {item.rating} star</Text>
                    </Card>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
                <Header content="Please Select Doctor" />
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
