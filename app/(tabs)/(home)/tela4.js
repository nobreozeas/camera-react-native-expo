import { Link } from "expo-router";
import React from "react";

import { View, Text, Button } from "react-native";

export default function Tela3() {
    return (
        <View>
            <Text>Tela3</Text>
            <Link href="/tela3">Tela 3</Link>
        </View>
    );
}