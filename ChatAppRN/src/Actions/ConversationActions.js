import axios from 'axios';
import React from 'react';
import RNFS from 'react-native-fs';
import {AsyncStorage} from 'react-native';
import {host, EMPTY_STR, filePathDir} from '../config';
import {
    OPEN_CONVERSATION,
    FETCH_MESSAGES,
    FETCH_MESSAGES_FAIL,
    FETCH_MESSAGES_SUCCESS,
    SEND_MESSAGE,
    SEND_MESSAGE_FAIL,
    SEND_MESSAGE_SUCCESS,
    MESSAGE_CONTENT_CHANGED
} from './types';
import {encryptor, decryptor} from '../CryptoFunctions';
import {randomBytes} from 'react-native-randombytes';
export const messageContentChanged = (text)=>{
    return{
        type: MESSAGE_CONTENT_CHANGED,
        payload: text
    }
}

export const fetchMessagesFail = (dispatch, data)=>{
    dispatch({
        type: FETCH_MESSAGES_FAIL,
        payload: data
    });
}

export const fetchMessagesSuccess = (dispatch, data)=>{
    dispatch({
        type: FETCH_MESSAGES_SUCCESS,
        payload: data
    });
}

export const fetchMessages = ({conversationID}) =>{
    return (dispatch)=>{
        dispatch({
            type: FETCH_MESSAGES,
            payload: true
        });
        AsyncStorage.getItem('@CryptoChat:myID')
        .then(myId => {
            AsyncStorage.getItem('@CryptoChat:authToken').then(tokenData => {
                //successfully fetched token from AsyncStorage
                const config = {
                    headers: {
                        authorization: tokenData
                    }
                };
                axios.get(host + `/api/chat/${conversationID}/messages`, config).then(msgRes => {
                    if(msgRes){
                        //the message was sent by someone else
                        const keyPath = `${filePathDir}/MyKey/private.pem`;
                        let encMessages = msgRes.data.messages;
                        let messages = [];
                        RNFS.readFile(keyPath, 'utf8').then(privateKey=>{
                            encMessages.foreach(encMsg=>{
                                if(encMsg.sender._id === myId){
                                    var jsonObj = JSON.parse(encMsg.senderContent);
                                    var rsaCipherText = jsonObj['rsa'];
                                    var aesCipherText = jsonObj['aes'];
                                    var hmacTag = jsonObj['hmac'];
                                    var rsaCipher = crypto.privateDecrypt({key: privateKey, padding: CRYPTO.constants.RSA_PKCS1_OAEP_PADDING}, new Buffer(rsaCipherText, 'hex'));
                                    var ivKey = rsaCipher.slice(0,16);
                                    var aesKey = rsaCipher.slice(16, 48);
                                    var hmacKey = rsaCipher.slice(48,80);
                                    var hmac = crypto.createHmac('sha256', hmacKey);
                                    hmac.update(aesCipherText);
                                    if(!Buffer.from(hmacTag, 'hex').equals(hmac.digest())){
                                        fetchMessagesFail(dispatch, true);
                                    }else{
                                        var aes = crypto.createDecipheriv('aes-256-cbc', aesKey, ivKey);
                                        rsaCipher = aes.update(Buffer.from(jsonObj['aes'], 'hex'), null, 'utf8');
                                        var message = rsaCipher + aes.final('utf8');
                                        var messageObj = {
                                            content: message,
                                            phone: encMsg.sender.phone,
                                            name: encMsg.sender.firstName + ' ' + encMsg.sender.lastName,
                                            id: encMsg._id,
                                            created: encMsg.created
                                        }
                                        messages.push(messageObj);
                                    }
                                }else{
                                    var jsonObj = JSON.parse(encMsg.content);
                                    var rsaCipherText = jsonObj['rsa'];
                                    var aesCipherText = jsonObj['aes'];
                                    var hmacTag = jsonObj['hmac'];
                                    var rsaCipher = crypto.privateDecrypt({key: privateKey, padding: CRYPTO.constants.RSA_PKCS1_OAEP_PADDING}, new Buffer(rsaCipherText, 'hex'));
                                    var ivKey = rsaCipher.slice(0,16);
                                    var aesKey = rsaCipher.slice(16, 48);
                                    var hmacKey = rsaCipher.slice(48,80);
                                    var hmac = crypto.createHmac('sha256', hmacKey);
                                    hmac.update(aesCipherText);
                                    if(!Buffer.from(hmacTag, 'hex').equals(hmac.digest())){
                                        fetchMessagesFail(dispatch, true);
                                    }else{
                                        var aes = crypto.createDecipheriv('aes-256-cbc', aesKey, ivKey);
                                        rsaCipher = aes.update(Buffer.from(jsonObj['aes'], 'hex'), null, 'utf8');
                                        var message = rsaCipher + aes.final('utf8');
                                        var messageObj = {
                                            content: message,
                                            phone: encMsg.sender.phone,
                                            name: encMsg.sender.firstName + ' ' + encMsg.sender.lastName,
                                            id: encMsg._id,
                                            created: encMsg.created
                                        }
                                        messages.push(messageObj);
                                    }
                                }
                            });
                            //messages done decrypting
                            fetchMessagesSuccess(dispatch, messages);
                        }).catch(fileErr=>{
                            fetchMessagesFail(dispatch, true);
                        });
                    }else{
                        //no messages
                        fetchMessagesSuccess(dispatch, []);
                    }
                }).catch(msgErr => {
                    fetchMessagesFail(dispatch, true);
                });
            }).catch(tokenErr => {
                //handle error: unable to fetch token from AsyncStorage
                fetchMessagesFail(dispatch, true);
            });
        }).catch(idErr => {
            //unable to fetch my user id from database
            fetchMessagesFail(dispatch, true);
        });
    }
};

export const openConversation = ({conversationID})=>{
    return (dispatch)=>{
        dispatch({
            type: OPEN_CONVERSATION,
            payload: true,
        });
        AsyncStorage.getItem('@CryptoChat:authToken').then(tokenData => {
            const config = {
                headers: {
                    authorization: tokenData
                }
            };
            //get the keys for this conversation
            axios.get(host + '/api/chat/keys/' + conversationID, config).then(keysRes => {
                if(keysRes){
                    let userArr = keysRes.data.users;
                    //check if keys exist in the local file system
                    userArr.forEach(user => {
                        let keyFileName = filePathDir + '/' + user._id.toString() + '.pem';
                        RNFS.exists(keyFileName).then(exists => {
                            if(exists){
                                //the key already exists in the local file system, do nothing
                            }else{
                                //the key does not exist and needs to be written in
                                RNFS.writeFile(keyFileName, user.publicKey, 'utf8').then(successWrite => {
                                    //console.log('Public key saved successfully');
                                    //key written successfully
                                }).catch(writeErr => {
                                    //error saving keys
                                    fetchMessagesFail(dispatch, true);
                                });
                            }
                        }).catch(existsErr =>{
                            console.log('Could not check if a file exists');
                        });
                    });
                }else{
                    console.log('There are no keys');
                }
            }).catch(keyErr => {
                //error obtaining key from server
                console.log('Could not obtain public keys');
            })
        }).catch(tokenErr => {
            //error readint the auth token from Async Storage (the DB)
            fetchMessagesFail(dispatch, true);
        });
    }
}

export const sendMessageFail = (dispatch, data)=>{
    dispatch({
        type: SEND_MESSAGE_FAIL,
        payload: data
    });
}

export const sendMessageSuccess = (dispatch, data)=>{
    dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: data
    });
}

//send single one-to-one message, group message will have different action
export const sendMessage = ({conversationID, content})=>{
    return(dispatch)=>{
        dispatch({
            type: SEND_MESSAGE,
            payload: true
        });
        AsyncStorage.getItem('@CryptoChat:authToken').then(token=>{
            const config = {
                headers: {
                    authorization: token
                }
            };
            axios.get(`${host}/api/chat/keys/${conversationID}`, config).then(users =>{
                const receiver = users.data.users[0]._id;
                RNFS.readFile(`${filePathDir}/${receiver}.pem`).then(userKey=>{
                    var aesIV = randomBytes(16);
                    var aesKey = randomBytes(32);
                    var hmacArray = randomBytes(32);
                    var myAesIV = randomBytes(16);
                    var myAesKey = randomBytes(32);
                    var myHmacArray = randomBytes(32);

                    var aes = crypto.createCipheriv('aes-256-cbc', aesKey, aesIV);
                    var cipherText = aes.update(new Buffer(message), 'utf8', 'hex') + aes.final('hex');
                    var hmac = crypto.createHmac('sha256', hmacArray);
                    hmac.update(cipherText);
                    var concatKeys = Buffer.concat([aesIV, aesKey, hmacArray]);
                    var rsaCipherText = crypto.publicEncrypt(userKey, concatKeys).toString('hex');
                    RNFS.readFile(`${filePathDir}/MyKey/public.pem`).then(myKey=>{
                        var myAes = crypto.createCipheriv('aes-256-cbc', myAesKey, myAesIV);
                        var myCipherText = myAes.update(new Buffer(message), 'utf8', 'hex') + myAes.final('hex');
                        var myHmac = crypto.createHmac('sha256', myHmacArray);
                        hmac.update(cipherText);
                        var concatKeys = Buffer.concat([myAesIV, myAesKey, myHmacArray]);
                        var myRsaCipherText = crypto.publicEncrypt(myKey, concatKeys).toString('hex');
                        var encryptedMsg = rsaCipherText;
                        var myMsg = myRsaCipherText;
                        var data = {
                            content: encryptedMsg,
                            senderContent: myMsg
                        };
                        axios.post(`${host}/api/chat/${conversationID}/message`, data, config)
                        .then(msgSent =>{
                            sendMessageSuccess(dispatch, true);
                            //refresh the messages
                        }).catch(msgErr =>{
                            //unable to send the message
                            sendMessageFail(dispatch, true);
                        });
                    }).catch(fileErr=>{
                        sendMessageFail(dispatch, true);
                    });
                }).catch(fileErr=>{
                    sendMessageFail(dispatch, true);
                });
                /*var encryptedMsg = encryptor(content, `${filePathDir}/${receiver}.pem`);
                var myMsg = encryptor(content, `${filePathDir}/MyKey/public.pem`);
                var data = {
                    content: encryptedMsg,
                    senderContent: myMsg
                }
                //console.log(`Encrypted message: ${encryptedMsg}`);
                axios.post(`${host}/api/chat/${conversationID}/message`, data, config)
                .then(msgSent =>{
                    sendMessageSuccess(dispatch, true);
                    //refresh the messages
                }).catch(msgErr =>{
                    //unable to send the message
                    sendMessageFail(dispatch, true);
                });*/
            }).catch(userErr=>{
                //unable to get the keys and ids from the server
                console.log(userErr.toString());//remove
                sendMessageFail(dispatch, true);
            });
        }).catch(tokenErr => {
            sendMessageFail(dispatch, true);
        });
    }
}