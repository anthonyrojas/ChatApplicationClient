import RNFS from 'react-native-fs';
import '../shim';
import crypto from 'crypto';
import {randomBytes} from 'react-native-randombytes';
import { EMPTY_STR } from './config';
import RSAKey from 'react-native-rsa';
//export const encryptor = (message, keyPath)=>{
exports.encryptor = (message, keyPath)=>{
    var aesIV = randomBytes(16);
    var aesKey = randomBytes(32);
    var hmacArray = randomBytes(32);
    const returnVal = {
        plainText: message,
        enc: message
    };
    const str = RNFS.readFile(keyPath, 'utf8').then(publicKey => {
        var aes = crypto.createCipheriv('aes-256-cbc', aesKey, aesIV);
        var cipherText = aes.update(new Buffer(message), 'utf8', 'hex') + aes.final('hex');
        var hmac = crypto.createHmac('sha256', hmacArray);
        hmac.update(cipherText);
        var concatKeys = Buffer.concat([aesIV, aesKey, hmacArray]);
        var rsaCipherText = crypto.publicEncrypt(publicKey, concatKeys).toString('hex');
        //var rsaCipherText = crypto.publicEncrypt(publicKey, concatKeys, CRYPTO.constants.RSA_PKCS1_OAEP_PADDING).toString('hex');
        const returnObj = {
            rsa: rsaCipherText,
            aes: cipherText,
            hmac: hmac.digest('hex')
        };
        returnVal.enc = JSON.stringify(returnObj);
    }).catch(fileErr =>{
        console.log(fileErr.toString());
        console.log('Could not encrypt message');
        returnVal.enc = message;
    });
    return returnVal.enc;
}
//export const decryptor = (jsonObj, key) =>{
exports.decryptor = (jsonObj, key)=>{
    var rsaCipherText = jsonObj['rsa'];
    var aesCipherText = jsonObj['aes'];
    var hmacTag = jsonObj['hmac'];
    RNFS.readFile(key, 'utf8').then(privateKey => {
        var rsaCipher = crypto.privateDecrypt({key: privateKey, padding: CRYPTO.constants.RSA_PKCS1_OAEP_PADDING}, new Buffer(rsaCipherText, 'hex'));
        var ivKey = rsaCipher.slice(0,16);
        var aesKey = rsaCipher.slice(16, 48);
        var hmacKey = rsaCipher.slice(48,80);
        var hmac = crypto.createHmac('sha256', hmacKey);
        hmac.update(aesCipherText);
        if(!Buffer.from(hmacTag, 'hex').equals(hmac.digest())){
            return "HMAC verfication failure!";
        }else{
            var aes = crypto.createDecipheriv('aes-256-cbc', aesKey, ivKey);
            rsaCipher = aes.update(Buffer.from(jsonObj['aes'], 'hex'), null, 'utf8');
            var message = rsaCipher + aes.final('utf8');
            return message;
        }
    }).catch(fileErr => {
        console.log('Could not encrypt message');
        return jsonObj;
    });
}