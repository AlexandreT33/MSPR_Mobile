import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Alert } from 'react-native';

import {sendInscription, sendConnexion, verifyEmail, checkIfExist} from './routes/routes'

import QR_Scanner from './tools/qr_scanner'

const Authentification = (props) => {
    //Pages
    const [isMain, setIsMain] = useState(true);
    const [isIncription, setIsInscription] = useState(false);
    const [isConnexion, setIsConnexion] = useState(false);
    const [isVerification, setIsVerification] = useState(false);

    //Variables
    const [showQrScanner, setshowQrScanner] = useState(false);
    const [scannedData, setscannedData] = useState(null);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Utils functions
    function changePageTo(page){
        switch(page){
            case "main":
                setIsMain(true); setIsConnexion(false); setIsInscription(false); setIsVerification(false);
                break;
            case "inscription":
                setIsMain(false); setIsConnexion(false); setIsInscription(true); setIsVerification(false);
                break;
            case "connexion":
                setIsMain(false); setIsConnexion(true); setIsInscription(false); setIsVerification(false);
                break;
            case "verification":
                setIsMain(false); setIsConnexion(false); setIsInscription(false); setIsVerification(true);
                break;
            default:
                setIsMain(true); setIsConnexion(false); setIsInscription(false); setIsVerification(false);
                break;
        }
    }

    useEffect(() => {
        if (scannedData != null) {
            verifyEmail(scannedData)
            setshowQrScanner(false);
            Alert.alert('Succès', "Email validé, veuillez vous connecter pour finalier l'inscription", [{text: 'Ok', style: 'cancel',}]);
            changePageTo("main")
        }
    }, [scannedData]);

    async function validateInscription() {
        var re = /\S+@\S+\.\S+/;
        if (username !== "" && email !== "" && password !== "") {
            if (re.test(email) === true) {
                    try {
                        await sendInscription(username, email, password);
                    } catch (error) {
                        console.log(error);
                    } finally {
                        changePageTo("verification");
                    }
            } else { Alert.alert('Erreur', 'Email invalide', [{text: 'Ok', style: 'cancel',}]); }
        } else { Alert.alert('Erreur', 'Il manque des informations', [{text: 'Ok', style: 'cancel',}]); }
    }

    async function validateConnexion() {
        var re = /\S+@\S+\.\S+/;
        if (email !== "" && password !== "") {
            if (re.test(email) === true) {
                try {
                    await sendConnexion(email, password, props.setUserUUID);
                } catch (error) {
                    console.log(error);
                }
            } else { Alert.alert('Erreur', 'Email invalide', [{text: 'Ok', style: 'cancel',}]); }
        } else { Alert.alert('Erreur', 'Il manque des informations', [{text: 'Ok', style: 'cancel',}]); }
    }

    return (
        <View style={styles}>
            {isMain === true ? 
                <View style={styles}>
                    <Button
                        title="Connexion"
                        color="#f194ff"
                        onPress={() => {changePageTo("connexion")}}
                    />
                    <Button
                        title="Inscription"
                        color="#f194ff"
                        onPress={() => {changePageTo("inscription")}}
                    />
                </View>
                : null
            }
            {isIncription === true ? 
                <View style={styles}>
                    <Button
                        style={styles.back_button}
                        title="Retour"
                        onPress={() => {changePageTo("main")}}
                    />
                    <Text style={styles.text}>Inscription</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUsername}
                        value={username}
                        keyboardType="default"
                        placeholder="Nom d'utilisateur"
                        placeholderTextColor="#000000"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        keyboardType="email-address"
                        placeholder="Adresse email"
                        placeholderTextColor="#000000"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        keyboardType="default"
                        secureTextEntry={true}
                        placeholder="Mot de passe"
                        placeholderTextColor="#000000"
                    />
                    <Button
                        title="Valider"
                        color="#f194ff"
                        onPress={() => {validateInscription()}}
                    />
                </View>
            : null }
            {isConnexion === true ? 
                <View style={styles}>
                    <Button
                        style={styles.back_button}
                        title="Retour"
                        onPress={() => {changePageTo("main")}}
                    />
                    <Text style={styles.text}>Connexion</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        keyboardType="email-address"
                        placeholder="Adresse email"
                        placeholderTextColor="#000000"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        keyboardType="default"
                        secureTextEntry={true}
                        placeholder="Mot de passe"
                        placeholderTextColor="#000000"
                    />
                    <Button
                        title="Valider"
                        color="#f194ff"
                        onPress={() => {validateConnexion()}}
                    />
                </View>
            : null }
            {isVerification === true ? 
                <View style={StyleSheet.scanner}>
                    {showQrScanner === true ? <QR_Scanner setscannedData={setscannedData}/> : <Text>Un QR code vous à été envoyé pour valider l'adresse email</Text>}
                    <Button
                    title="Scanner"
                    color="#f194ff"
                    onPress={() => {setshowQrScanner(!showQrScanner)}}
                    />
                </View>
            : null }
        </View>
    ) 
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    scanner: {
        position: 'relative',
        height: '200%',
        width: '200%',
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    text: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    back_button : {
        position: 'relative',
        backgroundColor: '#f194f2'
    },
});

export default Authentification