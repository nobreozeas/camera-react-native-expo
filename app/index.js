import { router } from 'expo-router';
import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoComponent from '../components/LogoComponent';
export default function Screen() {

    const handleLogin = () => {
        router.replace('about');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <LogoComponent />
            </View>

            <View >
                
                <TouchableOpacity style={styles.button} onPress={handleLogin} >
                        <Text style={styles.textButton}>
                            Entrar
                        </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'green',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        width: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    textButton: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    }

});