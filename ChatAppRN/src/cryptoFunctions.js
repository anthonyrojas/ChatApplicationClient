import RNFS from 'react-native-fs';
//const crypto = require('./crypto');
import crypto from './crypto-in';

export const encryptor = (message, keyPath)=>{
//exports.encryptor = (message, keyPath)=>{
    console.log('Starting the encryption');//remove
    var aesIV = crypto.randomBytes(16);
    var aesKey = crypto.randomBytes(32);
    var hmacArray = crypto.randomBytes(32);
    RNFS.readFile(keyPath, 'utf8').then(publicKey => {
        var aes = crypto.createCipheriv('aes-256-cbc', aesKey, aesIV);
        var cipherText = aes.update(new Buffer(message), 'utf8', 'hex') + aes.final('hex');
        var hmac = crypto.createHmac('sha256', hmacArray);
        hmac.update(cipherText);
        var concatKeys = Buffer.concat([aesIV, aesKey, hmacArray]);
        var rsaCipherText = crypto.publicEncrypt(publicKey, concatKeys, crypto.constants.RSA_PKCS1_OAEP_PADDING);
        return{
            rsa: rsaCipherText,
            aes: cipherText,
            hmac: hmac.digest('hex')
        };
    }).catch(fileErr =>{
        console.log('Could not encrypt message');
        return message;
    });
}
export const decryptor = (jsonObj, key) =>{
//exports.decryptor = (jsonObj, key)=>{
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