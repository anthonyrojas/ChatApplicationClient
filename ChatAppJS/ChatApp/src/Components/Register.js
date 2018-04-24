import React,{Component} from 'react';
import {View, Text, TextInput, StyleSheet, Button, KeyboardAvoidingView, Image, Keyboard, Alert, Modal, ActivityIndicator} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';
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
    registerUser,
    togglePasswordShow
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
    },
    checkboxViewStyle:{
        margin: 10,
        alignItems: 'center'
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
    onCheckboxClick(){
        this.props.togglePasswordShow(!this.props.showPassword);
        Keyboard.dismiss();
    }
    onRegisterSubmit(){
        Keyboard.dismiss();
        const {firstName, lastName, phone, email, password, confirmPassword} = this.props;
        this.props.registerUser({firstName, lastName, phone, email, password, confirmPassword});
    }
    componentDidUpdate(){
        if(this.props.registerSuccessful){
            Alert.alert(
                `Congratulations, ${this.props.firstName}!`,
                `You have signed up successfully! Below is your account info:\n ${this.props.firstName} ${this.props.lastName} \n Phone: ${this.props.phone} \n Password: ${this.props.password}`,
                [
                    {text: 'Login', onPress:()=>{
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                              NavigationActions.navigate({routeName: 'Login'})
                            ]
                        });
                        this.props.navigation.dispatch(resetAction);
                    }} 
                ]
            )
        }
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
                <Modal
                visible={this.props.loadingRegister}
                transparent={true}
                onRequestClose={()=>{}}>
                    <View style={styles.modalContainerStyle}>
                        <View style={styles.modalViewStyle}>
                            <Text>Signing up... please wait</Text>
                            <ActivityIndicator
                                size='large'
                                color='#00FF00'
                            />
                        </View>
                    </View>
                </Modal>
                <TextInput 
                    placeholder="First Name"
                    underlineColorAndroid="transparent"
                    onChangeText={this.onFirstNameChanged.bind(this)}
                    style={styles.inputItem}
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                />
                <TextInput
                    placeholder="Last Name"
                    underlineColorAndroid="transparent"
                    style={styles.inputItem}
                    onChangeText={this.onLastNameChanged.bind(this)}
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                />
                <TextInput
                    placeholder="Phone Number"
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                    style={styles.inputItem}
                    onChangeText={this.onPhoneChanged.bind(this)}
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                />
                <TextInput
                    placeholder="Email"
                    underlineColorAndroid="transparent"
                    style={styles.inputItem}
                    onChangeText={this.onEmailChanged.bind(this)}
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                />
                <TextInput
                    placeholder="Password"
                    underlineColorAndroid="transparent"
                    secureTextEntry={!this.props.showPassword}
                    style={styles.inputItem}
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
    loadingRegister: state.register.loadingRegister,
    userId: state.register.userId,
    registerError: state.register.registerError,
    registerSuccessful: state.register.registerSuccessful,
    showPassword: state.register.showPassword
});

export default connect(mapStateToProps, 
{
    firstNameChanged,
    lastNameChanged,
    emailChanged,
    phoneChanged,
    passwordChanged,
    registerFail,
    registerSuccess,
    registerUser,
    togglePasswordShow
})(Register);