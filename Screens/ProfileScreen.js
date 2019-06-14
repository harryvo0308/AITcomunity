import React from 'react';
import { AppRegistry, Image, Alert, ImageBackground, SafeAreaView, AsyncStorage, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Screens/constants/styles';
import User from '../User';
import firebase from 'firebase';

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile'
    }

    state = {
        name: User.name
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    //Log out function
    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    //Change name function
    changeName = async () => {
        if (this.state.name.lengt < 3) {
            Alert.alert('Error', 'Name should be logger');
        }
        else {
            if (User.name !== this.state.name) {
                firebase.database().ref('users').child(User.phone).set({ name: this.state.name });
                User.name = this.state.name;
                Alert.alert('Success', 'Name changed !!');
            }
        }


    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground style={{
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                    source={require('../images/bg2.png')}
                >

                    <Image
                        style={{ width: 96, height: 96, marginBottom: 15 }}
                        source={require('../images/boy.png')}
                    />


                    <TextInput
                        style={styles.input2}
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                    />
                    <Text>
                        {User.phone}
                    </Text>

                    <TouchableOpacity onPress={this.changeName}>
                        <Text style={styles.btnText}> Change Name </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._logOut}>
                        <Text style={styles.btnText}> Logout </Text>
                    </TouchableOpacity>

                </ImageBackground>
            </SafeAreaView>
        )
    }
}