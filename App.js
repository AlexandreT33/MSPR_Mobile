import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Authentification from './src/authentification';
import Home from './src/home'

export default function App() {
    
    const [isUserConnected, setIsUserConnected] = useState(false);
    const [userUUID, setUserUUID] = useState(null);

    useEffect(() => {
        if (userUUID != null) {
            setIsUserConnected(true);
        }
    }, [userUUID]);

    return (
        <View style={styles.container}>
            {isUserConnected ? <Home userUUID={userUUID} /> : <Authentification setIsUserConnected={setIsUserConnected} setUserUUID={setUserUUID} />}

            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
});