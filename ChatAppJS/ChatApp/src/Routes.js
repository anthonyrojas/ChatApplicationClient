import {NativeRouter, Route, Link} from 'react-router-native';
import {Component, React} from 'react';
import {StackNavigator} from 'react-navigation';
import Login from './Components/Login';
import Register from './Components/Register';

const Routes = StackNavigator({
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    }
},{headerMode: 'none'});

export default Routes;