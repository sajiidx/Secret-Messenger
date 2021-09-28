import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserPostGridView from '../components/UserPostGridView';
import UserTaggedInPostGridView from '../components/UserTaggedInPostGridView';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Tab = createMaterialTopTabNavigator();

function UserPostStack(props) {
  return (
      <Tab.Navigator initialRouteName={{posts: props.posts}}>
        <Tab.Screen name="UserPostGridView" component={UserPostGridView}
          options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="grid" size={24} color="black" />
              ),
          }} />
        <Tab.Screen name="UserTaggedInPostGridView" component={UserTaggedInPostGridView}
          options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="fire" color={color} size={26} />
              ),
          }} />
      </Tab.Navigator>
  );
}

const mapStateToProps = (store) => ({
    currentUser: store.user.currentUser
})
export default connect(mapStateToProps, null)(UserPostStack);