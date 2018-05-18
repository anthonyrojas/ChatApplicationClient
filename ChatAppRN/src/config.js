import RNFS from 'react-native-fs';
import {Platform} from 'react-native';
let hostVal = '';
//for dev purposes only
//android localhost
if(Platform.OS === 'android'){
    hostVal = 'http://10.0.2.2:3000';    
}else{
    hostVal = 'http://localhost:3000';
}
export const host = hostVal;
//export const host = 'http://10.0.2.2:3000';
//ios localhost
//export const host = 'http://localhost:3000';
export const EMPTY_STR = '';
export const filePathDir = RNFS.ExternalDirectoryPath;