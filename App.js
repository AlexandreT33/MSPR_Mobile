import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import QR_Scanner from './src/tools/qr_scanner'
import Authentification from './src/authentification';

export default function App() {
    const [showQrScanner, setshowQrScanner] = useState(false);
    const [apiKey, setApiKey] = useState(null);
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (apiKey != null) {
            console.log("Api key : " + apiKey);
            setshowQrScanner(false);
            alert(`l'api key ${apiKey} est bien remonté`);
        }
    }, [apiKey]);

    return (
        <View style={styles.container}>
            {page === 0 ? <Authentification setPage={setPage} /> : null}

            
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
/*
{showQrScanner === true ? <QR_Scanner setApiKey={setApiKey}/> : <Text></Text>}

<Button
title="QrScanner"
color="#f194ff"
onPress={() => {setshowQrScanner(!showQrScanner)}}
/>
*/