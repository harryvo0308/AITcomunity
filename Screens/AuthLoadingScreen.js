import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View, } from 'react-native';
import firebase from 'firebase';
import User from '../User';



export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyCJA0BvvgKHTNPi0ikHOOXrcX4xOXFQL4k",
      authDomain: "chatting-88e57.firebaseapp.com",
      databaseURL: "https://chatting-88e57.firebaseio.com",
      projectId: "chatting-88e57",
      storageBucket: "chatting-88e57.appspot.com",
      messagingSenderId: "898931603834",
    };
    // Initialize Firebase
    firebase.initializeApp(config);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('userPhone');
    this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}