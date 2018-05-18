import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet, KeyboardAvoidingView, Image, ActivityIndicator, Modal, Keyboard, Platform} from 'react-native';
import {CheckBox, Button} from 'react-native-elements'; 
import {connect} from 'react-redux';
import {host, EMPTY_STR} from '../config';
import {NavigationActions} from 'react-navigation';
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
      fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica',
      fontWeight: 'bold',
      fontSize: 20,
      color:'#000000', 
      alignSelf: 'center'
  },
  modalContainerStyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalViewStyle:{
    padding: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
    Keyboard.dismiss();
    const {phone, password} = this.props;
    this.props.loginUser({phone, password});
  }
  onNavRegisterClick(){
    Keyboard.dismiss();
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Register'})
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }
  componentDidUpdate(){
    const loggedIn = this.props.loggedIn;
    if(loggedIn || this.props.authToken !== EMPTY_STR){
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'Conversations'})
        ]
      });
      this.props.navigation.dispatch(resetAction);
    }
  }
  render(){
    const {phone, password, loggedIn, loggingIn, loginErrorMsg, authToken} = this.props;
    return(
      <KeyboardAvoidingView style={styles.loginViewStyle}>
        <Text style={styles.titleTextStyle}>Crypto Chat</Text>
        <Image
          source={require('../Assets/cat.png')} 
          style={{height: 80, width: 80, alignSelf: 'center', margin: 15}}
        />
        <Modal
          visible={this.props.loggingIn}
          transparent={true}
          onRequestClose={()=>{}}
        >
          <View style={styles.modalContainerStyle}>
          <View style={styles.modalViewStyle}>
              <Text>Signing In...</Text>
              <ActivityIndicator
                size='large'
                color='#00FF00'
              />
          </View>
          </View>
        </Modal>
        <Text style={styles.errorTextStyle}>
          {this.props.loginErrorMsg}                 
        </Text>
        <TextInput
          placeholder="Phone"
          underlineColorAndroid="transparent"
          style={styles.inputItem}
          keyboardType="numeric"
          onChangeText={this.onPhoneChanged.bind(this)}
          onSubmitEditing={()=>{Keyboard.dismiss()}}
          editable={!this.props.loggingIn}
        />
        <TextInput
          placeholder="Password"
          underlineColorAndroid="transparent"
          style={styles.inputItem}
          editable={!this.props.loggingIn}
          secureTextEntry={!this.props.showPassword}
          onChangeText={this.onPasswordChanged.bind(this)}
          onSubmitEditing={()=>{Keyboard.dismiss()}}
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
            color="white"
            backgroundColor="#009AFF"
            onPress={this.onLoginClick.bind(this)}
            editable={this.props.loggingIn}
          />
        </View>
        <View style={styles.buttonViewStyle}>
          <Button
            title="Register"
            color="white"
            backgroundColor="#FF9933"
            onPress={this.onNavRegisterClick.bind(this)}
            editable={this.props.loggingIn}
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
