import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Image, KeyboardAvoidingView, Keyboard, Modal, ActivityIndicator, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import {
    createConversationAttempt,
    createConversationPhoneChanged,
    createConversationFail,
    createConversationSuccess
}from '../Actions';

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#BBEBFC',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
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
    },
    errorTextStyle:{
        fontWeight: 'bold',
        color: 'red',
        alignSelf: 'center'
    }
});

class CreateConversation extends Component{
    onPhoneChanged(text){
        this.props.createConversationPhoneChanged(text);
    }
    onCreateConversationPress(){
        Keyboard.dismiss();
        const phone = this.props.phone;
        this.props.createConversationAttempt({phone});
    }
    componentDidUpdate(){
        if(this.props.creatingConversationSuccess){
            Alert.alert('Success!', 'New conversation started!');
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({routeName: 'Conversations'})
                ]
            });
            this.props.navigation.dispatch(resetAction);
        }
    }
    showErrorText(){
        if(this.props.creatingConversationFailed){
            return(
                <Text style={styles.errorTextStyle}>{this.props.creatingConversationError}</Text>
            );
        }else{
            return null;
        }
    }
    render(){
        return(
            <KeyboardAvoidingView style={styles.containerStyle}>
                <Modal
                    visible={this.props.creatingConversation}
                    transparent={true}
                    onRequestClose={()=>{}}
                >
                    <View style={styles.modalContainerStyle}>
                        <View style={styles.modalViewStyle}>
                            <Text>Creating conversation...</Text>
                            <ActivityIndicator
                                size='large'
                                color='#00FF00'
                            />
                        </View>
                    </View>
                </Modal>
                <Image 
                    source={require('../Assets/chatbubble.png')}
                    style={{height: 80, width: 80, alignSelf: 'center', margin: 15}}
                />
                {this.showErrorText()}
                <TextInput style={styles.inputItem} 
                    placeholder="Phone"
                    underlineColorAndroid='transparent'
                    keyboardType='numeric'
                    editable={!this.props.creatingConversation}
                    onChangeText={this.onPhoneChanged.bind(this)}
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                />
                <Button
                    title='Create Conversation'
                    backgroundColor='#00BCFF'
                    onPress={this.onCreateConversationPress.bind(this)}
                />
                <View style={{paddingHorizontal: 15}}>
                <Text>Enter the phone number of the person you would like to start a conversation with. Include the area code and country code, for example a US number would be: 13231234567</Text>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
const mapStateToProps = state=>({
    phone: state.createConversations.conversationPhone,
    creatingConversation: state.createConversations.creatingConversation,
    creatingConversationError: state.createConversations.creatingConversationError,
    creatingConversationFailed: state.createConversations.creatingConversationFailed,
    creatingConversationSuccess: state.createConversations.creatingConversationSuccessful
});

export default connect(mapStateToProps,{
    createConversationAttempt,
    createConversationPhoneChanged,
    createConversationFail,
    createConversationSuccess
})(CreateConversation);