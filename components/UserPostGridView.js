import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, Button, Image, FlatList, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';

function UserPostGridView({currentUser, userPosts, navigation}) {
    return (
        <View style={styles.container}>
                <FlatList
                    data={userPosts}
                    keyExtractor={(item) => item.id}
                    renderItem={({item})=>(
                        <TouchableOpacity style={styles.postContainer} onPress={()=> navigation.navigate("PostsView",{item, user: currentUser})}>
                            <Image source={{uri: item.downloadURL}} style={styles.post}/>
                        </TouchableOpacity>
                    )}
                    numColumns={3}
                    horizontal={false}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefefe',
    },
    postContainer: {
        flex: 1/3,
        margin: 1,
    },
    post: {
        flex: 1,
        aspectRatio: 1 / 1
    }
});

const mapStateToProps = (store) => ({
  currentUser: store.user.currentUser,
  userPosts: store.user.posts
})

export default connect(mapStateToProps, null)(UserPostGridView);
