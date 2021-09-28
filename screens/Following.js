import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, Button, Image, FlatList, TouchableOpacity} from 'react-native';

export default function Following(props) {
    const [followingData, setFollowingData] = useState(props.route.params.followingData);
    return (
        <View style={styles.container}>
            <FlatList
                data={followingData}
                keyExtractor={(item) => item.uid}
                renderItem={({item}) => (
                    <View style={styles.followerContainer}>
                        <TouchableOpacity style={styles.readOnlyContainer}
                        onPress={()=> props.navigation.navigate('Account', {userData: item})}>
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
