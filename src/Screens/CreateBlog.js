import React, { useState } from 'react';
import {
    View, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity,
    Keyboard, ActivityIndicator, KeyboardAvoidingView
} from 'react-native';
import Doctors from './Doctors';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firebase from '@react-native-firebase/app'
import {serverTimestamp} from '../firebase'

const CreateBlog = ({navigation}) => {

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [address, setAddress] = useState("")
    const [fees, setFees] = useState("")
    const [experience, setExperience] = useState("")
    const [rating, setRating] = useState("")
    const [image, setImage] = useState(null)
    const [progress,setProgress] = useState(false)

    const OpenCamera = () =>{

        ImagePicker.openPicker({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            compressImageQuality:1,
            cropping: true
            
          }).then(fileobj => {

            // console.log(fileobj)
            setProgress(true)
            const uploadTask =  storage().ref().child(`/items/${Date.now()}`).putFile(fileobj.path) 
            uploadTask.on('state_changed', 
            (snapshot) => {
                
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
            }, 
            (error) => {
               alert(error)
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                
                uploadTask.snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                    setImage(downloadURL)
                    setProgress(false)
                });
            }
            );
           })
       }

       const PostData = async() =>{
        if(!name || !type || !address || !fees){
            alert('Please fill all field')
            return
        }
     try {
        await firestore().collection('blog').add({
            name,
            type,
            address,
            fees,
            rating,
            experience,
            image,
            postedBy: auth().currentUser.email,
            uid:auth().currentUser.uid,
            createdAt: serverTimestamp()
        })
        Keyboard.dismiss();
        alert('Congratulations !! Your Blog is Posted Refresh for view your Blog')
     } catch (error) {
         alert(error)
     } 
    }


    return (
        <View>
            <KeyboardAvoidingView>
                <Text style={{ textAlign: 'center', fontSize: 25, marginTop: "5%" }}>Post Your Blog</Text>
                <TextInput style={styles.input}
                    autoCapitalize='none'
                    placeholder='Enter name'
                    onChangeText={name => setName(name)}
                    value={name}
                >
                </TextInput>

                <TextInput style={styles.input}
                    autoCapitalize="none"
                    placeholder='Enter Profession Type'
                    onChangeText={type => setType(type)}
                    autoCompleteType='off'
                    value={type}
                >
                </TextInput>

                <TextInput style={styles.input}
                    autoCapitalize="none"
                    placeholder='Enter Address'
                    onChangeText={address => setAddress(address)}
                    autoCompleteType='off'
                    value={address}
                >
                </TextInput>

                <TextInput style={styles.input}
                    autoCapitalize="none"
                    placeholder='Enter Fees'
                    onChangeText={fees => setFees(fees)}
                    autoCompleteType='off'
                    value={fees}
                >
                </TextInput>

                <TextInput style={styles.input}
                    autoCapitalize="none"
                    placeholder='Enter experience'
                    onChangeText={experience => setExperience(experience)}
                    autoCompleteType='off'
                    value={experience}
                >
                </TextInput>

                <TextInput style={styles.input}
                    autoCapitalize="none"
                    placeholder='Enter Rating'
                    onChangeText={rating => setRating(rating)}
                    autoCompleteType='off'
                    value={rating}
                >
                </TextInput>

                <TouchableOpacity onPress={() => OpenCamera()} style={styles.btn}>
                        <View style={{flexDirection:'row', alignSelf:'center'}}>
                        {
                    progress ? (
                        <ActivityIndicator 
                            size={28}
                            color={"black"}
                        />
                    ):(
                        <Text style={styles.btnText}>Upload</Text>
                    )
                }
                        <FontAwesome5 style={{alignSelf:'center', padding:'2%'}} name={'camera'} size={25} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity disabled={image?false:true} mode="contained" onPress={() => PostData()} style={styles.btn}>
                    <View style={{flexDirection:'row', alignSelf:'center'}}>
                        <Text style={styles.btnText}>Post Your Blog</Text>
                        <FontAwesome5 style={{alignSelf:'center', padding:'2%'}} name={'thumbs-up'} size={25} />
                        </View>
                    </TouchableOpacity>

            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignSelf:'center'
    },

    input: {
        borderWidth: 1,
        width: '95%',
        marginTop: '5%',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingLeft: 20,
        alignSelf: 'center'
    },

    btn: {
        width: '70%',
        height: '10%',
        backgroundColor: '#51FF00',
        borderRadius: 20,
        marginTop: '5%',
        alignSelf: 'center'
    },

    btnText: {
        fontSize: 15,
        textAlign: 'center',
        padding: 10
    }
})

export default CreateBlog
