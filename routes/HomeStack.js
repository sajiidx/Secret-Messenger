import React, {useState, useEffect} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/Home';
import NotificaitonsScreen from '../screens/Notifications';
import TrendingScreen from '../screens/Trending';
import MenuScreen from '../screens/Menu';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowers,
  fetchUserFollowing,
} from '../redux/actions';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return (null);
}

function HomeStack(props) {
  const initialRouteName = 'Home';
  useEffect(() => {
    props.fetchUser();
    props.fetchUserPosts();
    props.fetchUserFollowers();
    props.fetchUserFollowing();
  }, []);
  
  return (
      <Tab.Navigator barStyle={{
        backgroundColor: '#0b032d',
      }}
      activeColor={"#f33227"}
      initialRouteName={initialRouteName}>
        <Tab.Screen name="Home" component={HomeScreen}
          options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
              )
          }} />
        <Tab.Screen name="Trending" component={TrendingScreen}
          options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="fire" color={color} size={26} />
              ),
          }} />
        <Tab.Screen name="AddContainer" component={EmptyScreen}
          listeners={({ navigation }) => ({
              tabPress: event => {
                  event.preventDefault();
                  navigation.navigate("Add")
              }
          })}
          options={{
            tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="plus-box" color={color} size={26} />
              ),
          }} />
        <Tab.Screen name="Notifications" component={NotificaitonsScreen}
          options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="bell" color={color} size={26} />
              ),
          }} />
        <Tab.Screen name="Menu" component={MenuScreen}
          options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="menu" color={color} size={26} />
              ),
          }} />
      </Tab.Navigator>
  );
}

const mapStateToProps = (store) => ({
    currentUser: store.user.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({
  fetchUser,
  fetchUserPosts,
  fetchUserFollowers,
  fetchUserFollowing
}, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(HomeStack);