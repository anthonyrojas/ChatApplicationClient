import React,{Component} from 'react';
import {View, Text, TextInput, StyleSheet, Button, KeyboardAvoidingView, Image} from 'react-native';
import {CheckBox} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
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
        marginHorizontal: 20,
        marginVertical: 10,
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
        flexDirection: 'column',
        backgroundColor: '#00FF55'
    },
    buttonViewStyle:{
        margin: 15,
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
        color:'#000000', 
        alignSelf: 'center'
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
            <KeyboardAvoidingView style={styles.registerViewStyle}>
                <Image
                    source={require('../Assets/poop.png')} 
                    style={{height: 80, width: 80, alignSelf: 'center'}}
                />
                <Text style={styles.titleTextStyle}>
                    Thank you for your interest in joining!
                </Text>
                <Text style={styles.errorTextStyle}>
                    {this.props.registerError}                 
                </Text>
                <TextInput 
                    placeholder="First Name"
                    underlineColorAndroid="transparent"
                    onChangeText={this.onFirstNameChanged.bind(this)}
                    style={styles.inputItem}
                />
                <TextInput
                    placeholder="Last Name"
                    underlineColorAndroid="transparent"
                    style={styles.inputItem}
                    onChangeText={this.onLastNameChanged.bind(this)}
                />
                <TextInput
                    placeholder="Phone Number"
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                    style={styles.inputItem}
                    onChangeText={this.onPhoneChanged.bind(this)}
                />
                <TextInput
                    placeholder="Email"
                    underlineColorAndroid="transparent"
                    style={styles.inputItem}
                    onChangeText={this.onEmailChanged.bind(this)}
                />
                <TextInput
                    placeholder="Password"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    style={styles.inputItem}
                    onChangeText={this.onPasswordChanged.bind(this)}
                />
                <TextInput
                    placeholder="Confirm Password"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    style={styles.inputItem}
                    onChangeText={this.onConfirmPasswordChanged.bind(this)}
                />
                <View style={styles.buttonViewStyle}>
                    <Button
                        title="Register"
                        color="#3A3A3A"
                        onPress={this.onRegisterSubmit.bind(this)}
                    />
                </View>
            </KeyboardAvoidingView>
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