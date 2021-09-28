import * as actions from '../constants/index';
import firebase from 'firebase';
require('firebase/firestore');

export function clearData() {
    return ((dispatch) => {
        dispatch({type: actions.CLEAR_DATA});
    });
}
export function signUp(values){
    console.log('Values: ', values);
    const { name, username, email, password }  = values;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
        firebase.firestore().collection("user")
        .doc(firebase.auth().currentUser.uid)
        .set({
            name, username, email,
            isPublic: false,
            bio: '',
            numberOfPosts: 0,
            numberOfFollowers: 0,
            numberOfFollowing: 0,
        })
        .then((result)=> {
            firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .set({
                exists: true
            });
        })
        console.log(result);
    })
    .catch((error) => {
        console.log("Error: " + error);
    });
}
export function login(values){
    const { email, password }  = values;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
}
export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("user")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: actions.CURRENT_USER_DATA_LOADED,
                        currentUser: {
                            uid: firebase.auth().currentUser.uid,
                            ...snapshot.data()
                        }
                    });
                }
                else {
                    console.log('Customer does not exist');
                }
            });
    });
}
export function fetchUserPosts(id = null) {
    return ((dispatch) => {
        if(!id){
            id = firebase.auth().currentUser.uid;
        }
        firebase.firestore()
            .collection("posts")
            .doc(id)
            .collection("userPosts")
            .orderBy("creation", 'desc')
            .get()
            .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    dispatch({ type: actions.USER_POSTS_STATE_CHANGE, posts });
            }).catch(error => console.error(error));
    });
}
export function fetchUserFollowers() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("user")
            .doc(firebase.auth().currentUser.uid)
            .collection("followers")
            .get()
            .then((snapshot) => {
                let followers = snapshot.docs.map(doc => {
                    const id = doc.id;
                    const data = doc.data();
                    return { id, ...data }
                });
                dispatch({ type: actions.USER_FOLLOWERS_STATE_CHANGE, followers });
                for(let i = 0; i < followers.length; i++){
                    dispatch(fetchUsersData(followers[i].id, true, 'followers'));
                }
            }).catch(error => console.error(error));
    });
}
export function fetchUsersData(uid, getPosts, type) {
    return ((dispatch, getState) => {
        firebase.firestore()
            .collection("user")
            .doc(uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    let userData = snapshot.data();
                    userData.uid = snapshot.id;
                    firebase.firestore()
                        .collection("user")
                        .doc(uid)
                        .collection("followers")
                        .get()
                        .then((snap) => {
                            let followers = snap.docs.map(doc => {
                                const id = doc.id;
                                const data = doc.data();
                                return { id, ...data }
                            })
                            userData.followers = followers;
                            firebase.firestore()
                                .collection("user")
                                .doc(uid)
                                .collection("following")
                                .get()
                                .then((snaps) => {
                                    let following = snaps.docs.map(doc => {
                                        const id = doc.id;
                                        const data = doc.data();
                                        return { id, ...data }
                                    })
                                    userData.following = following;
                                    if(type == 'followers')
                                        dispatch({ type: actions.USER_FOLLOWERS_LOAD_DATA, userData});
                                    else if(type=='following')
                                        dispatch({ type: actions.USER_FOLLOWING_LOAD_DATA, userData});
                                    console.log(userData)
                                });
                        });
                }
                else {
                    console.log('does not exist')
                }
            })
    })
}

export function fetchUserFollowing() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("user")
            .doc(firebase.auth().currentUser.uid)
            .collection("following")
            .get()
            .then((snapshot) => {
                let following = snapshot.docs.map(doc => {
                    const id = doc.id;
                    const data = doc.data();
                    return { id, ...data }
                })
                dispatch({ type: actions.USER_FOLLOWING_STATE_CHANGE, following });
                for(let i = 0; i < following.length; i++){
                    dispatch(fetchUsersData(following[i].id, true, 'following'));
                }
            }).catch(error => console.error(error));
    });
}