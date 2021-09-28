import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, Button, Image, FlatList, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserPostStack from '../routes/UserPostStack';
import HighlistsView from '../components/HighlistsView';

import {
  fetchUserPosts,
  fetchUserFollowers,
  fetchUserFollowing,
} from '../redux/actions';

function Account(props) {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(props.route.params.userData);
    const [followersData, setFollowersData] = useState([]);
    const [followingData, setFollowingData] = useState([]);

    useEffect(() => {
        firebase.firestore()
        .collection("posts")
        .doc(user.uid)
        .collection("userPosts")
        .orderBy("creation", 'desc')
        .get()
        .then((snapshot) => {
            let userPosts = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            });
            setPosts(userPosts);
        })
        .catch((error)=> {
            console.log("Error Occured While Fetching User's Posts");
        });

        firebase.firestore()
        .collection("user")
        .where("username", "in", user.followers.map((data) => data.username))
        .get()
        .then((snapshot) => {
            let followers = snapshot.docs.map(doc => {
                const data = doc.data();
                const uid = doc.id;
                return { uid, ...data}
            });
            setFollowersData(followers);
            console.log('FollowersData', followersData);
        })
        .catch((error)=> {
            console.log("Error Occured While Fetching User's Followers");
        });

        firebase.firestore()
        .collection("user")
        .where("username", "in", user.following.map((data) => data.username))
        .get()
        .then((snapshot) => {
            let following = snapshot.docs.map(doc => {
                const data = doc.data();
                const uid = doc.id;
                return { uid, ...data }
            });
            setFollowingData(following);
            console.log('FollowingData', followingData);
        })
        .catch((error)=> {
            console.log("Error Occured While Fetching User's Followers");
        });
    }, []);

    if(!user){
        return(
            <View>
                <Text>Page Error 404</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.profileView}>
                {
                    (user)?(
                        <View style={styles.imageContainer}>
                            <Image resizeMode='cover' source={{uri: user.downloadURL}} style={styles.image} />
                        </View>
                    ):(
                        <View style={styles.imageContainer}>
                            <Image resizeMode='cover' source={require('../images/profileImage.jpg')} style={styles.image} />
                        </View>
                    )
                }
                <View style={styles.userStat}>
                    <Text style={styles.statsNumber}>{posts.length}</Text>
                    <Text style={styles.statsText}>Posts</Text>
                </View>
                <TouchableOpacity onPress={()=> props.navigation.navigate('Followers', {followersData})}>
                    <View style={styles.userStat}>
                        <Text style={styles.statsNumber}>{user.numberOfFollowers}</Text>
                        <Text style={styles.statsText}>Followers</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> props.navigation.navigate('Following', {followingData})}>
                    <View style={styles.userStat}>
                        <Text style={styles.statsNumber}>{user.numberOfFollowing}</Text>
                        <Text style={styles.statsText}>Following</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{paddingLeft: 15, marginBottom: 15}}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.bio}>{user.bio}</Text>
            </View>
            <View style={styles.profileActions}>
                <View style={{flex: 1, marginLeft: 5, marginRight: 10}}>
                    <Button title='Message' color={'#0b032d'}/>
                </View>
                <View style={{flex: 1, marginLeft: 10, marginRight: 5}}>
                    <Button
                    title="Following"
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
});
const mapDispatchProps = (dispatch) => bindActionCreators({
  fetchUserPosts,
}, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(Account);
