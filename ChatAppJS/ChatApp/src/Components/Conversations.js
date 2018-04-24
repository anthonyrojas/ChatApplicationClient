import React, {Component} from 'react';
import ActionButton from 'react-native-action-button';
import {View, Text, StyleSheet, AsyncStorage, FlatList, ScrollView, Modal, ActivityIndicator} from 'react-native';
import RNFS from 'react-native-fs';
import {List, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {fetchConversationList,
    fetchConversationListSuccess,
    fetchConversationListFail} from '../Actions'

const styles = {
    containerViewStyle:{
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
        listViewStyle:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'stretch'
        }
    }
}

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
    async componentWillMount(){
        this.props.fetchConversationList();
    }
    componentDidMount(){
        this.props.fetchConversationList();
    }
    render(){
        return(
            <List style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
                <Modal
                    visible={this.props.conversationListLoading}
                    transparent={true}
                    onRequestClose={()=>{}}
                >
                    <View style={styles.modalContainerStyle}>
                        <View style={styles.modalViewStyle}>
                            <Text>Fetching conversations...</Text>
                            <ActivityIndicator
                                size='large'
                                color='#00FF00'
                            />
                        </View>
                    </View>
                </Modal>
                <FlatList
                    data={this.props.conversationList}
                    renderItem={({item})=>{
                        <ListItem
                            roundAvatar
                            avatar={{uri: 'https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png'}}
                            title='Conversation'
                        />
                    }}
                />
            </List>
        );
    }
}

const mapStateToProps = state =>({
    conversationList: state.conversations.conversationList,
    conversationListLoading: state.conversations.conversationListLoading,
    conversationListError: state.conversations.converationListError
});

export default connect(mapStateToProps,{
    fetchConversationList,
    fetchConversationListSuccess,
    fetchConversationListFail
})(Conversations);