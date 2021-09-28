import React from 'react';
import { StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import { Badge } from 'react-native-elements';
import { connect } from 'react-redux';

function HighlistsView({currentUser}) {
    return (
        <ScrollView
        horizontal={true}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
                <Text style={{fontFamily: 'montserrat-regular', fontSize: 10, fontWeight: 'bold'}}>Highlists</Text>
                {/* <Badge value="+" status="primary" containerStyle={{ position: 'absolute', bottom: 2, right: 2 }} /> */}
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{height: 60, width: 60, justifyContent: 'center', alignItems: 'center', borderWidth: 2,
        borderColor: '#111',
        borderRadius: 60,
        overflow: 'hidden', marginHorizontal: 5}}>
                    <Image resizeMode='cover' source={require('../images/outline_add_black_48dp.png')} style={{height: 30, width: 30}} />
                </View>
                <Text style={{fontFamily: 'montserrat-regular', fontSize: 10, fontWeight: 'bold'}}>New Highlists</Text>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 5,
        paddingRight: 25,
        flex: 1,
    },
    imageContainer: {
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 60,
        overflow: 'hidden',
        marginHorizontal: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
    image: {
        width: 60,
        height: 60,
    }
});

const mapStateToProps = (store) => ({
    currentUser: store.user.currentUser,
});

export default connect(mapStateToProps, null)(HighlistsView);
