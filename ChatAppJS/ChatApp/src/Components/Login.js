import React, {Component} from 'react';
import {Platform, Text, View, TextInput, StyleSheet, Button} from 'react-native';
import {CheckBox} from 'react-native-elements'; 
import axios from 'axios';
import data from '../config';
const styles=StyleSheet.create({
  inputView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputItem:{
    fontSize: 16,
    margin: 10,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
    backgroundColor: 'white',
    textAlign: 'center',
    width: 250
  },
  checkboxStyle:{
    margin: 30,
    justifyContent: 'center',
    width: 150
  },
});

class Login extends Component{
  state = {
    phone: '',
    password: '',
    revealPassword: false
  }
  handlePhoneInput = (event)=>{
    this.setState({phone: event.target.value});
  }
  handlePasswordInput = (event)=>{
    this.setState({password: event.target.value});
  }
  toggleShowPassword = ()=>{
    this.setState({revealPassword: !this.state.revealPassword});
  }
  handleLoginButtonPress = (event)=>{
  }
  handleRegisterButtonPress= (event)=>{

  }
  render(){
    return(
      <View style={styles.inputView}>
        <TextInput
          placeholder='Enter phone number'
          onChangeText={()=>this.handlePhoneInput}
          style={styles.inputItem}
          keyboardType='numeric'
          underlineColorAndroid='transparent'
        />
        <TextInput
          placeholder='Enter password'
          secureTextEntry={!this.state.revealPassword}
          onChangeText={()=>this.handlePasswordInput}
          style={styles.inputItem}
          underlineColorAndroid='transparent'
        />
        <CheckBox
          title='Show Password'
          checked={this.state.revealPassword}
          onPress={this.toggleShowPassword}
          center={true}
          containerStyle={styles.checkboxStyle}
        />
        <Button
          title='Login'
          color='#00CDFF'
          onPress={this.handleLoginButtonPress}
        />
        <View style={{marginTop: 30}}>
          <Button
            title='Register'
            color='#3A3A3A'
            onPress={this.handleRegisterButtonPress}
          />
        </View>
      </View>
    );
  };
}
export default Login;
