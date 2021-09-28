import React, {useState} from 'react';
import { View, TextInput, Image, Button } from 'react-native';
import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
require("firebase/firestore");
require("firebase/firebase-storage")

export default function SaveProfilePic(props) {
    const [caption, setCaption] = useState("");
    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `profileImage/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath);
        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);
        
        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`);
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot);
            });
        }

        const taskError = snapshot => {
            console.log(snapshot);
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {
        firebase.firestore()
            .collection('user')
            .doc(firebase.auth().currentUser.uid)
            .set({
                downloadURL,
                profileImageLastChangedOn: firebase.firestore.FieldValue.serverTimestamp()
            }, {merge: true})
            .then((function(){
                props.navigation.popToTop();
            }));
    }
    return (
        <View style={{flex: 1}}>
            <Image source={{uri: props.route.params.image}} style={{aspectRatio: 1/1}}/>
            <Button
                title="Save"
                onPress={() => uploadImage()}
            />
        </View>
    )
}
