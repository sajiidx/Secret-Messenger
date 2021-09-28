import React, {useState} from 'react';
import { View, TextInput, Image, Button } from 'react-native';
import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
require("firebase/firestore");
require("firebase/firebase-storage")

export default function Save(props) {
    const [caption, setCaption] = useState("");
    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `posts/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
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
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                likes: 0,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then((function(){
                props.navigation.popToTop();
            }));
    }
    return (
        <View style={{flex: 1, padding: 10}}>
            <Image source={{uri: props.route.params.image}} style={{aspectRatio: 1/1}}/>
            <TextInput
                placeholder="Write a Caption . . ."
                onChangeText={(caption) => setCaption(caption)}
                multiline={true}
                style={{
                    padding: 5,
                    marginVertical: 5,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    borderRadius: 2,
                }}
            />

            <Button
                title="Upload"
                onPress={() => uploadImage()}
            />
        </View>
    )
}
