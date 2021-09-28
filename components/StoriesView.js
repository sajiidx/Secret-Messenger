import React from 'react';
import { StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import { Badge } from 'react-native-elements';
import { connect } from 'react-redux';

function StoriesView({currentUser}) {
    return (
        <ScrollView
        horizontal={true}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
            <View>
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
                <Badge value="+" status="primary" containerStyle={{ position: 'absolute', bottom: 2, right: 2 }} />
            </View>
            <View style={styles.imageContainer}>
                <Image resizeMode='cover' source={require('../images/profileImage.jpg')} style={styles.image} />
            </View>
            <View style={styles.imageContainer}>
                <Image resizeMode='cover' source={require('../images/profileImage.jpg')} style={styles.image} />
            </View>
            <View style={styles.imageContainer}>
                <Image resizeMode='cover' source={require('../images/profileImage.jpg')} style={styles.image} />
            </View>
            <View style={styles.imageContainer}>
                <Image resizeMode='cover' source={require('../images/profileImage.jpg')} style={styles.image} />
            </View>
            <View style={styles.imageContainer}>
                <Image resizeMode='cover' source={require('../images/profileImage.jpg')} style={styles.image} />
            </View>
            <View style={styles.imageContainer}>
                <Image resizeMode='cover' source={require('../images/profileImage.jpg')} style={styles.image} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        paddingRight: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    imageContainer: {
        borderWidth: 3,
        borderColor: '#ddd',
        borderRadius: 60,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
    },
    image: {
        width: 60,
        height: 60,
    }
});

const mapStateToProps = (store) => ({
    currentUser: store.user.currentUser,
});

export default connect(mapStateToProps, null)(StoriesView);
