import { AppRegistry } from 'react-native';
import App from './App';
import {YellowBox, Platform} from 'react-native';
if(Platform.OS === 'android'){
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
}
AppRegistry.registerComponent('ChatAppRN', () => App);
