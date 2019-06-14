import React from 'react';
import { createStackNavigator,createSwitchNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import AuthLoadingScreen from './Screens/AuthLoadingScreen';
import ChatScreen from './Screens/ChatScreen';
import ProfileScreen from './Screens/ProfileScreen';

//React navigation //Authentication flows
const AppStack = createStackNavigator({ Home: HomeScreen, Chat: ChatScreen, 
  Profile: ProfileScreen  });
const AuthStack = createStackNavigator({ Login: LoginScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));