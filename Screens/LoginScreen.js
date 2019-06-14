import React from 'react';
import { AppRegistry, ImageBackground, Image, Text, Alert, AsyncStorage, TouchableOpacity, TextInput, View } from 'react-native';
import firebase from 'firebase';
import User from '../User';
import styles from '../Screens/constants/styles';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  state = {
    phone: '',
    name: ''
  }
  handleChange = key => val => {
    this.setState({ [key]: val })
  }


  submitForm = async () => {
    if (this.state.phone.length < 10) {
      Alert.alert('Error', 'Wrong phone number')

    } else if (this.state.name.length < 3) {
      Alert.alert('Error', 'Wrong Name')

    } else {
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      //Upload user to server // phone is user ID
      firebase.database().ref('users/' + User.phone).set({ name: this.state.name });
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return (

      <View style={styles.container}>
        <ImageBackground style={{
          width: '100%', 
          height: '100%', 
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }} 
        source={require('../images/bg.png')} 
        >

          <Image
            style={{ width: 86, height: 45, marginBottom: 25 }}
            source={require('../images/AITLOGO.png')}
          />

          <Text style={styles.Appname}> AIT Community </Text>

          <TextInput
            placeholder="Phone number"
            keyboardType="number-pad"
            style={styles.input}
            value={this.state.phone}
            onChangeText={this.handleChange('phone')}
          />

          <TextInput
            placeholder="Name"
            style={styles.input}
            value={this.state.name}
            onChangeText={this.handleChange('name')}
          />

          <TouchableOpacity onPress={this.submitForm}>
            <Text style={styles.btnText}>Enter</Text>
          </TouchableOpacity>

        </ImageBackground>
      </View>

    );
  }
}

