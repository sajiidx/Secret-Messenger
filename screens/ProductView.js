import React, {Component} from 'react';
import { render } from 'react-dom';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default class ProductView extends Component{
    constructor(props){
        super(props);
        this.state = {
            image: require('../images/profileImage.jpg')
        };
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.sellerImageContainer}>
                        <Image resizeMode='contain' source={this.state.image} style={styles.sellerImage} />
                    </View>
                    <View style={styles.sellerPostHeader}>
                        <View style={styles.sellerDetailsContainer}>
                            <Text style={{fontFamily: 'montserrat-bold'}}>_sajidazeem</Text>
                            <Text style={styles.location}>Under the sky</Text>
                        </View>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={styles.imageContainer}>
                    <Image resizeMode='contain' source={this.state.image} style={styles.image} />
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.postActions}>
                        <TouchableOpacity style={{marginHorizontal: 5}}>
                            <FontAwesome5 name="heart" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal: 5}}>
                            <FontAwesome5 name="comment" size={24} color="black"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal: 5}}>
                            <Feather name="send" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <FontAwesome5 name="bookmark" size={24} color="black" />
                    </TouchableOpacity>
                    
                </View>
                <View style={{marginHorizontal: 10}}>
                    <Text style={{fontFamily: 'helvetic-neue-medium', fontSize: 12}}>105,553 likes</Text>
                    <Text style={{fontFamily: 'montserrat-bold'}}>_sajidazeem</Text>
                    
                    <Text style={styles.description}>In literary theory, a text is any object that can be "read", whether this object is a work of literature, a street sign, an arrangement of buildings on a city block, or styles of clothing. It is a coherent set of signs that transmits some kind of informative message.</Text>
                </View>                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 5,
        paddingVertical: 10,
        backgroundColor: '#fafafa'
    },
    image: {
        width: 400,
        height: 400,

    },
    sellerImage: {
        width: 40,
        height: 40,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    sellerImageContainer: {
        borderWidth: 1,
        borderColor: '#fafafa',
        borderRadius: 40,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sellerDetailsContainer: {
        marginLeft: 10,
    },
    location: {
        fontFamily: 'montserrat-light',
        fontSize: 10,
    },
    imageContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa'
    },
    productName: {
        fontFamily: 'montserrat-bold',
        fontSize: 20,
        marginTop: 5,
        textTransform: 'uppercase'
    },
    description: {
        fontFamily: 'montserrat-light',
        marginVertical: 5
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 10,
    },
    postActions: {
        display: 'flex',
        flexDirection: 'row',
    },
    sellerPostHeader: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
