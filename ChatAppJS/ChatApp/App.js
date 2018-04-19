import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Provider} from 'react-redux';
import {Routes} from './src/Routes';
import reducers from './src/Reducers';
import store from './store';
import Login from './src/Components/Login';
import Register from './src/Components/Register';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends Component{
  render(){
    return(
      <Provider store={store}>
        <Routes />
      </Provider>
    );   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 5,
  },
});

export default App;

/*type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <LinearGradient colors={['#48C01C', '#1AFF00', '#00FF5E']} style={styles.container}>
      <View>
        <Text style={styles.welcome}>
          Welcome to Krypto Chat!
        </Text>
        <Register />
      </View>
      </LinearGradient>
    );
  }
}*/