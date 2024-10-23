import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export default function LogoComponent() {
    return (
        <View>
            <Image style={styles.logo} source={require("../assets/images/logo.png")} />
            <Text style={styles.tituloLogo}>Voto Certo</Text>
        </View>
        

    );
}

const styles = StyleSheet.create({
    logo: {
        width: 300,
        height: 300,
    },
    tituloLogo: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'green',
    }
});