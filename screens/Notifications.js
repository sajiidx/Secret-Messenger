import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Notifications() {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Notifications</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#161527'
    }
});

