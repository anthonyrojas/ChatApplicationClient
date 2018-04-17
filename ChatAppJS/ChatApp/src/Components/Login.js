import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet, Button, KeyboardAvoidingView, Image} from 'react-native';
import {CheckBox} from 'react-native-elements'; 
import {connect} from 'react-redux';
import {host} from '../config';
import {
  loginFail,
  loginPasswordChanged,
  loginPhoneChanged,
  loginSuccess,
  loginUser,
  loginShowPassword
} from '../Actions';

const styles = StyleSheet.create({
  inputItem:{
      fontSize: 16,
      marginHorizontal: 20,
      marginVertical: 10,
      borderRadius: 5,
      color: 'black',
      backgroundColor: 'white',
      textAlign: 'center',
      padding: 5,
  },
  loginViewStyle:{
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: '#00FF55'
  },
  buttonViewStyle:{
      margin: 15,
      alignItems: 'center'
  },
  checkboxViewStyle:{
    margin: 10,
    alignItems: 'center'
  },
  errorTextStyle:{
      fontWeight: 'bold',
      color: 'red',
      alignSelf: 'center'
  },
  titleTextStyle:{
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 20,
      color:'#000000', 
      alignSelf: 'center'
  }
});

class Login extends Component{
  onPhoneChanged(text){
    this.props.loginPhoneChanged(text);
  }
  onPasswordChanged(text){
    this.props.loginPasswordChanged(text);
  }

  onCheckboxClick(){
    this.props.loginShowPassword(!this.props.showPassword);
  }
  onLoginClick(){
    const {phone, password} = this.props;
    this.props.loginUser({phone, password});
  }
  render(){
    const {phone, password, loggedIn, loggingIn, loginErrorMsg, authToken} = this.props;
    return(
      <KeyboardAvoidingView style={styles.loginViewStyle}>
        <Text style={styles.titleTextStyle}>Gato Chat</Text>
        <Image
          source={require('../Assets/cat.png')} 
          style={{height: 80, width: 80, alignSelf: 'center', margin: 15}}
        />
        <Text style={styles.errorTextStyle}>
          {this.props.loginErrorMsg}                 
        </Text>
        <TextInput
          placeholder="Phone"
          underlineColorAndroid="transparent"
          style={styles.inputItem}
          keyboardType="numeric"
          onChangeText={this.onPhoneChanged.bind(this)}
        />
        <TextInput
          placeholder="Password"
          underlineColorAndroid="transparent"
          style={styles.inputItem}
          secureTextEntry={!this.props.showPassword}
          onChangeText={this.onPasswordChanged.bind(this)}
        />
        <View style={styles.checkboxViewStyle}>
          <CheckBox
            center
            title="Show Password"
            checked={this.props.showPassword}
            onPress={this.onCheckboxClick.bind(this)}
          />
        </View>
        <View style={styles.buttonViewStyle}>
          <Button
            title="Login"
            color="#009AFF"
            onPress={this.onLoginClick.bind(this)}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }

}
const mapStateToProps = state =>({
  phone: state.login.phone,
  password: state.login.password,
  loggedIn: state.login.loggedIn,
  loggingIn: state.login.loggingIn,
  loginErrorMsg: state.login.loginErrorMsg,
  authToken: state.login.authToken,
  showPassword: state.login.showPassword
});
export default connect(mapStateToProps,{
  loginFail,
  loginPasswordChanged,
  loginPhoneChanged,
  loginSuccess,
  loginUser,
  loginShowPassword
})(Login);
