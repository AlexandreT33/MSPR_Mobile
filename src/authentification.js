import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';

const Authentification = () => {
    const [picked, setPicked] = useState(false);
    const [isIncription, setIsInscription] = useState(false);
    const [isConnexion, setIsConnexion] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles}>
            {picked ? null :
                <View style={styles}>
                    <Button
                        title="Connexion"
                        color="#f194ff"
                        onPress={() => {setPicked(true); setIsConnexion(true); setIsInscription(false)}}
                    />
                    <Button
                        title="Inscription"
                        color="#f194ff"
                        onPress={() => {setPicked(true); setIsConnexion(false); setIsInscription(true)}}
                    />
                </View>
            }
            {isIncription === true ? 
                <View style={styles}>
                    <Button
                        style={styles.back_button}
                        title="Retour"
                        onPress={() => {setPicked(false); setIsConnexion(false); setIsInscription(false)}}
                    />
                    <Text style={styles.text}>Inscription</Text>
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
                        onPress={() => {}}
                    />
                </View>
            : null }
            {isConnexion === true ? 
                <View style={styles}>
                    <Text>Connexion</Text>
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