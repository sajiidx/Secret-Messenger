import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function UserTaggedInPostGridView() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>When People tag you in photos and vidoes, they will appear here.</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fefefe',
    },
    text: {
        color: '#666'
    }
});
