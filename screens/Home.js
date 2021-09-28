import React from 'react';
import { View, StyleSheet, Text, FlatList} from 'react-native';
import StoriesView from '../components/StoriesView';
import ProductView from './ProductView';

export default function Home() {
    return (
        <View style={{flex: 1}}>
            <FlatList style={styles.container}
                ListHeaderComponent={StoriesView}
                data={[{key: '1'},{key: '2'},{key: '3'}]}
                renderItem={(item)=> <ProductView />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        paddingVertical: 10,
    },
    headerText: {
        color: '#161527'
    },
    post: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 300,
        borderColor: '#ddd',
        borderRadius: 1,
        borderWidth: 1,
        marginVertical: 10,
    },
});
