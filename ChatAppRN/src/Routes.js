import {Component, React} from 'react';
import {StackNavigator} from 'react-navigation';
import {Platform} from 'react-native';
import Login from './Components/Login';
import Register from './Components/Register';
import Conversations from './Components/Conversations';
import CreateConversation from './Components/CreateConversation';
import Conversation from './Components/Conversation';

export const ChatStack = StackNavigator({
    Conversations: {
        screen: Conversations,
        navigationOptions: {
            headerTitle: 'Crypto Chat',
            headerMode: 'float',
            headerStyle:{
                backgroundColor: '#00FF55'
            },
            headerTitleStyle:{
                color: 'black',
                fontWeight: 'bold',
                fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica'
            }
        }
    },
    CreateConversation:{
        screen: CreateConversation,
        navigationOptions: {
            headerTitle: 'Start A Conversation...',
            headerMode: 'float',
            headerStyle:{
                backgroundColor: '#00FF55'
            },
            headerTitleStyle:{
                color: 'black',
                fontWeight: 'bold',
                fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica'
            }
        }
    },
    Conversation:{
        screen: Conversation,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.names}`,
            headerMode: 'float',
            headerStyle:{
                backgroundColor: '#00FF55'
            },
            headerTitleStyle:{
                color: 'black',
                fontWeight: 'bold',
                fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Helvetica'
            }
        })
    }
});

export const Routes = StackNavigator({
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    Conversations: {
        screen: ChatStack
    }
},{headerMode: 'none', title: 'Crypto Chat'});