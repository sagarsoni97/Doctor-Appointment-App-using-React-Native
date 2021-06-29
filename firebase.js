import React from 'react'
import firebase from '@react-native-firebase/app'

const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export {serverTimestamp}
