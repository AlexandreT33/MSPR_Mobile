import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function Home(props) {

    return (
        <View style={styles.container}>
            <Text>COUCOU {props.userUUID}</Text>
        </View>
    );
}
