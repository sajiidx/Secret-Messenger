import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, Button, Image, FlatList, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import Post from './Post';

function PostsView(props) {
    return (
        <View style={styles.container}>
                <FlatList
                    data={props.userPosts}
                    keyExtractor={(item) => item.id}
                    renderItem={({item})=>(
                        <Post item={item} user={props.currentUser} />
                    )}
                    initialScrollIndex={props.userPosts.indexOf(props.route.params.item)}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
});

const mapStateToProps = (store) => ({
  currentUser: store.user.currentUser,
  userPosts: store.user.posts
})

export default connect(mapStateToProps, null)(PostsView);
