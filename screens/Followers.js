import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Image, FlatList, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function Followers(props) {
    const [followersData, setFollowersData] = useState([]);
    console.log(props);
    useEffect(() => {
        setFollowersData(props.route.params.followersData);
    }, [props.route.params.followersData]);
    return (
        <View style={styles.container}>
            <FlatList
                data={followersData}
                keyExtractor={(item) => item.uid}
                renderItem={({item}) => (
                    <View style={styles.followerContainer}>
                        <TouchableOpacity style={styles.readOnlyContainer}
                        onPress={()=> {
                                if(props.currentUser.uid != item.uid){
                                    props.navigation.navigate('Account', {userData: item});
                                }else{
                                    props.navigation.navigate('Menu');
                                }
                            }
                        }>
                            <View style={styles.imageContainer}>
                                <Image source={{uri: item.downloadURL}} style={styles.image} />
                            </View>
                            <View style={styles.userDetailsContainer}>
                                <Text style={styles.username}>{item.username}</Text>
                                <Text style={styles.name}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.actionsContainer}>
                            <Button title='following' />
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefefe',
    },
    followerContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fefefe',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10
    },
    readOnlyContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer: {
        borderRadius: 100,
        overflow: 'hidden',
    },
    image: {
        width: 60,
        height: 60,
    },
    userDetailsContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    username: {
        fontFamily: 'montserrat-regular',
        fontWeight: 'bold',
    },
    name: {
        color: '#666',
    }
});
const mapStateToProps = (store) => ({
  currentUser: store.user.currentUser,
});
export default connect(mapStateToProps, null)(Followers);
