import React, {Component} from 'react';
import ActionButton from 'react-native-action-button';
import {View, Text, StyleSheet, AsyncStorage, FlatList, ScrollView, Modal, ActivityIndicator} from 'react-native';
import RNFS from 'react-native-fs';
import {List, ListItem, Icon, Button} from 'react-native-elements';
import {NavigationActions, StackNavigator} from 'react-navigation'
import {connect} from 'react-redux';
import {fetchConversationList,
    fetchConversationListSuccess,
    fetchConversationListFail,
    toggleFetchConversationsPolling
} from '../Actions'
import { EMPTY_STR } from '../config';

const styles = StyleSheet.create({
    listViewStyle:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    listItemContainerStyle:{
        backgroundColor: '#2D4246'
    }
});

const getToken = async ()=> {
    try{
        const token = await AsyncStorage.getItem('@ChatApp:authToken', (err, item)=>{
            return item;
        });
    }catch(error){
        return 'error';
    }
}

const crypto = require('../crypto');

class Conversations extends Component{
    componentWillMount(){
        if(this.props.conversationsPolling){
            this.props.fetchConversationList();
        }
    }
    componentDidMount(){
        // TODO: find a better way to poll the server until I am ready to use socket io
        if(this.props.conversationsPolling){
            setInterval(()=>{this.props.fetchConversationList()}, 30000);
        }
    }
    showErrorText(){
        if(this.props.converationListError === EMPTY_STR){
            return(
                <Text>
                    {this.props.converationListError}
                </Text>
            );
        }else{
            return null
        }
    }
    navigateToCreateConversation(){
        this.props.toggleFetchConversationsPolling(false);
        this.props.navigation.navigate('CreateConversation');
    }
    render(){
        return(
            <View style={{flex: 1, flexDirection: 'column', alignContent: 'stretch', alignItems: 'stretch'}}>
                {this.showErrorText()}
                <FlatList 
                    data={this.props.conversationList}
                    key='myConvos' 
                    keyExtractor={(item, i)=> item._id}
                    renderItem={({item})=>
                        <ListItem
                            key={item._id}
                            title={item.title}
                            containerStyle={styles.listItemContainerStyle}
                            titleStyle={{color: 'white', fontWeight: 'bold'}}
                            roundAvatar
                            avatar={require('../Assets/blank-profile.png')}
                            chevronColor='white'
                            chevron
                        />
                    }
                />

                <ActionButton key='createConvoButtonBtn' buttonColor='#FF9A00'>
                    <ActionButton.Item
                        buttonColor='#009AFF'
                        title='New Conversation'
                        onPress={this.navigateToCreateConversation.bind(this)}
                    >
                        <Icon name="edit"/>
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }
}

const mapStateToProps = state =>({
    conversationList: state.conversations.conversationList,
    conversationListLoading: state.conversations.conversationListLoading,
    conversationListError: state.conversations.converationListError,
    conversationsPolling: state.conversations.conversationsPolling
});

export default connect(mapStateToProps,{
    fetchConversationList,
    fetchConversationListSuccess,
    fetchConversationListFail,
    toggleFetchConversationsPolling
})(Conversations);