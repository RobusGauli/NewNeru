/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';


import AnimatedEditText from '../components/AnimatedEditText'
import Button from '../components/Button'

import Config from '../utils/Config'

export default class Login extends Component {

  static navigationOptions = {
      title: 'Login'
  }

  constructor() {
    super()
    this.username = '9779851102208'
    this.password = '111111'
    
  }

  

  _onLoginPressed = (text) => {

    if (!this.username && !this.password) {
            alert('Please enter user Name and password')
            return
        }
        if (!this.username) {
            
            alert('Please enter the username')
        } else if (!this.password) {
            alert('Please enter the password')
        } else{
            payload = {
                username: this.username,
                password: this.password
            }
        fetch(Config.baseUrl + Config.loginUri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)

            
        })
        .then((response) => response.json())
        
        
        
        .then((jsonResponse) => {
            
            if (!jsonResponse.data && jsonResponse.code === 404) {
                //here is the problem of being unsucssedfull
                alert(jsonResponse.message)
                
            }else if (jsonResponse.data && jsonResponse.code === 0) {
                //alert(JSON.stringify(jsonResponse.data))
                this._handlePress(jsonResponse.data)
                //this.handleTabPress(jsonResponse.data)
            }
            
            }).catch((error) =>
                console.log(error)
            )}
    
  }

  
  _handlePress = (data) => {
    let accountsUrl =  Config.baseUrl + Config.customersUri + '/' + data.username + '/accounts'
    //console.log(data.authKey)
    fetch(accountsUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'AUTH-SECURITY-TOKEN': data.authKey
      }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      console.log(jsonResponse)
      const { navigate } = this.props.navigation;

      navigate('Tabs', {
          credentials : data,
          accounts : jsonResponse.data
      })

    })
  }


  render() {
    return (
      <View style={styles.container}
      >
        <Text style={styles.neru}>
          NERU
        </Text>
        <AnimatedEditText 
          placeholder={'Username'} 
          onChangeText={() => alert('yea')}
          value={this.username}
            
          />
        <AnimatedEditText 
          placeholder={'Password'} 
          onChangeText={() => alert('yea')}
          isPassword={true}
          iconName={'md-lock'}
          value={this.password}
           
          />
        <Button text={'Login'} 
          buttonStyle={{
          backgroundColor : 'rgba(0, 170, 255, 0.6)',
          marginTop: 20
            }}
          onPress={() => this._onLoginPressed('LOGIN')}
        />
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(144,164,174 ,0.05)',
    paddingTop: 70
  },
  neru: {
    fontSize: 50,
    fontWeight: '400',
    marginBottom: 10,
    color: 'blue',
    
  }
  
});
