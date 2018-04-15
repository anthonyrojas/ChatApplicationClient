import React,{Component} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {connect} from 'react-redux';
import {
    firstNameChanged,
    lastNameChanged,
    emailChanged,
    phoneChanged,
    passwordChanged,
    confirmPasswordChanged,
    registerFail,
    registerSuccess,
    registerUser
} from '../Actions';
const styles = StyleSheet.create({
    inputItem:{
        fontSize: 16,
        margin: 10,        
        borderRadius: 5,
        color: 'black',
        backgroundColor: 'white',
        textAlign: 'center',
        padding: 5,
    },
    registerViewStyle:{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'column'
    }
});
class Register extends Component{
    onFirstNameChanged(text){
        this.props.firstNameChanged(text);
    }
    onLastNameChanged(text){
        this.props.lastNameChanged(text);
    }
    onEmailChanged(text){
        this.props.emailChanged(text);
    }
    onPhoneChanged(text){
        this.props.phoneChanged(text);
    }
    onPasswordChanged(text){
        this.props.passwordChanged(text);
    }
    onConfirmPasswordChanged(text){
        this.props.confirmPasswordChanged(text);
    }
    onRegisterSubmit(){
        const {firstName, lastName, phone, email, password, confirmPassword} = this.props;
        this.props.registerUser({firstName, lastName, phone, email, password, confirmPassword});
    }
    render(){
        const {firstName, lastName, phone, email, password, confirmPassword, registerError, userId} = this.props;
        return(
            <View>
                <TextInput 
                    placeholder="First Name"
                    underlineColorAndroid="transparent"
                    onChangeText={this.onFirstNameChanged.bind(this)}
                    style={{backgroundColor: 'white'}}
                />
                <TextInput
                placeholder="Last Name"
                underlineColorAndroid="transparent"
                />
                <TextInput
                placeholder="Phone Number"
                underlineColorAndroid="transparent"
                keyboardType="numeric"
                />
                <TextInput
                placeholder="Email"
                underlineColorAndroid="transparent"
                />
                <TextInput
                placeholder="Password"
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                />
                <TextInput
                placeholder="Confirm Password"
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                />
                <Button
                title="Register"
                color="#3A3A3A"
                onPress={this.onRegisterSubmit.bind(this)}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    firstName: state.register.firstName,
    lastName: state.register.lastName,
    phone: state.register.phone,
    email: state.register.email,
    password: state.register.password,
    confirmPassword: state.register.confirmPassword,
    loadingRegister: state.register.loadingRegister,
    userId: state.register.userId,
    registerError: state.register.registerError
});

export default connect(mapStateToProps, 
{
    firstNameChanged,
    lastNameChanged,
    emailChanged,
    phoneChanged,
    passwordChanged,
    confirmPasswordChanged,
    registerFail,
    registerSuccess,
    registerUser
})(Register);