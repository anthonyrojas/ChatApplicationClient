import RNFS from 'react-native-fs';
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from 'constants';
const crypto = require('./crypto');
exports.encryptor = (message, keyPath)=>{
    var aesIV = crypto.randomBytes(16);
    var aesKey = crypto.randomBytes(32);
    var hmacArray = crypto.randomBytes(32);
    var publicKey = RNFS.readFile(keyPath, 'utf8');
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
}

exports.decryptor = (jsonObj, key)=>{
    var rsaCipherText = jsonObj['rsa'];
    var aesCipherText = jsonObj['aes'];
    var hmacTag = jsonObj['hmac'];
    var privateKey = RNFS.readFile(key, 'utf8');
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
}