import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';
import {ListItem} from 'react-native-elements';

const message = (props)=>(
    <ListItem
        title={props.name}
        rightTitle={props.created}
        subtitle={props.content}
    />
);

export default message;