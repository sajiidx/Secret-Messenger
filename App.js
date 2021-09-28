import React, {Component, useState} from 'react';
import { StyleSheet, SafeAreaView, View, Text, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import Home from './routes/HomeStack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
console.reportErrorsAsExceptions = false;

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddScreen from './screens/Add';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import SaveScreen from './screens/Save';
import SaveProfilePic from './screens/SaveProfilePic';
import UploadProfilePic from './screens/UploadProfilePic';
import Account from './screens/Account';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

const Stack = createStackNavigator()

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

const getFonts = () => {
  return Font.loadAsync({
    'montserrat-light': require('./assets/fonts/montserrat/Montserrat-Light.ttf'),
    'montserrat-bold': require('./assets/fonts/montserrat/Montserrat-Bold.ttf'),
    'montserrat-regular': require('./assets/fonts/montserrat/Montserrat-Regular.ttf'),
    'helvetic-neue-medium' : require('./assets/fonts/Helvetica-Neue-Font/Helvetica-Neue-LTW0697BlkCnObl/Helvetica-Neue-LTW0697BlkCnObl.ttf')
  });
};

import firebase from 'firebase';
import Followers from './screens/Followers';
import Following from './screens/Following';
import Post from './screens/Post';
import PostsView from './screens/PostsView';

const firebaseConfig = {
  apiKey: "AIzaSyCXpY1zRvqAvuKZXrq1QWYM4XoM7Uml5fg",
  authDomain: "instagram-dev-22ccf.firebaseapp.com",
  projectId: "instagram-dev-22ccf",
  storageBucket: "instagram-dev-22ccf.appspot.com",
  messagingSenderId: "899475314203",
  appId: "1:899475314203:web:c7017753a908c9efbd4abe",
  measurementId: "G-5YX71N1VVT"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      fontsLoaded: false,
      loaded: false,
      loggedIn: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    })
  }

  render(){
    const { loggedIn, loaded, fontsLoaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }
    if(Platform.OS == 'android' && fontsLoaded){
      if(!loggedIn){
        return (
          <Provider store={store}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignUpScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </Provider>
        )
      }
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeStack">
              <Stack.Screen name="HomeStack" component={Home} />
              <Stack.Screen name="Add" component={AddScreen}/>
              <Stack.Screen name="Save" component={SaveScreen}/>
              <Stack.Screen name="UploadProfilePic" component={UploadProfilePic}/>
              <Stack.Screen name="SaveProfilePic" component={SaveProfilePic} />
              <Stack.Screen name="Followers" component={Followers} />
              <Stack.Screen name="Following" component={Following}/>
              <Stack.Screen name="Post" component={Post}/>
              <Stack.Screen name="PostsView" component={PostsView}/>
              <Stack.Screen name="Account" component={Account}/>
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    }
    if(Platform.OS == 'web' && fontsLoaded){
      return (
        <Provider store={store}>
          <Home />
        </Provider>
      )
    }
    else{
      return (
        <AppLoading
          startAsync={getFonts}
          onFinish={() => this.setState({fontsLoaded: true})}
          onError={(error)=> console.warn(error)}
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'montserrat-bold',
  }
});
