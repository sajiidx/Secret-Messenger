import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, Button, Image, FlatList, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserPostStack from '../routes/UserPostStack';
import HighlistsView from '../components/HighlistsView';

function Menu({currentUser, userPosts, navigation, followersData, followingData}) {
    const [posts, setPosts] = useState(userPosts);
    if(!currentUser){
        return(
            <View>

            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.profileView}>
                {
                    (currentUser)?(
                        <View style={styles.imageContainer}>
                            <Image resizeMode='cover' source={{uri: currentUser.downloadURL}} style={styles.image} />
                        </View>
                    ):(
                        <View style={styles.imageContainer}>
                            <Image resizeMode='cover' source={require('../images/profileImage.jpg')} style={styles.image} />
                        </View>
                    )
                }
                <View style={styles.userStat}>
                    <Text style={styles.statsNumber}>{userPosts.length}</Text>
                    <Text style={styles.statsText}>Posts</Text>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate('Followers', {followersData})}>
                    <View style={styles.userStat}>
                        <Text style={styles.statsNumber}>{currentUser.numberOfFollowers}</Text>
                        <Text style={styles.statsText}>Followers</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Following', {followingData})}>
                    <View style={styles.userStat}>
                        <Text style={styles.statsNumber}>{currentUser.numberOfFollowing}</Text>
                        <Text style={styles.statsText}>Following</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{paddingLeft: 15, marginBottom: 15}}>
                <Text style={styles.name}>{currentUser.name}</Text>
                <Text style={styles.bio}>{currentUser.bio}</Text>
            </View>
            <View style={styles.profileActions}>
                <View style={{flex: 1, marginLeft: 5, marginRight: 10}}>
                    <Button title='Logout' color={'#0b032d'} onPress={() => {
                        firebase.auth()
                        .signOut()
                        .then(() => console.log('User signed out!'));
                    }} />
                </View>
                <View style={{flex: 3, marginLeft: 10, marginRight: 5}}>
                    <Button
                    title="Change Profile Pic"
                    onPress={()=> navigation.navigate("UploadProfilePic")}
                    color={'#0b032d'} />
                </View>
            </View>
            <View style={{height: 100, padding: 10, paddingBottom: 2}}>
                <HighlistsView />
            </View>
            <UserPostStack />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefefe',
    },
    headerText: {
        color: '#161527',
        fontFamily: 'montserrat-light',
        fontSize: 18,
    },
    imageContainer: {
        borderRadius: 100,
        overflow: 'hidden',
    },
    image: {
        width: 85,
        height: 85,
    },
    profileView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
    userStat: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    statsText: {
        color: '#161527',
        fontFamily: 'montserrat-regular',
        fontSize: 14,
    },
    statsNumber: {
        color: '#161527',
        fontFamily: 'montserrat-regular',
        fontSize: 18,
        fontWeight: 'bold'
    },
    name: {
        color: '#161527',
        fontFamily: 'montserrat-regular',
        fontSize: 14,
        fontWeight: 'bold'
    },
    bio: {
        color: '#161527',
        fontFamily: 'montserrat-regular',
        fontSize: 14,
    },
    profileActions: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    galleryContainer: {
        flex: 1,
        marginTop: 10,
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
  userPosts: store.user.posts,
  followersData: store.user.followersData,
  followingData: store.user.followingData,
})

export default connect(mapStateToProps, null)(Menu);
