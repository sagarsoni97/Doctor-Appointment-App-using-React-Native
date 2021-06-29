import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    Linking,
    Platform
} from 'react-native';

const Header = ({content}) => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    header :{
        width: '100%',
        height: 50,
        backgroundColor: '#E3ACF1'
    },

    text:{
        textAlign:'center',
        fontSize:20,
        fontFamily: 'Josefin Sans',
        marginTop:"2%",
        fontWeight:'bold'
    }

})
export default Header
