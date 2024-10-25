import { Link } from "expo-router";
import React from "react";

import { View, Text, Button } from "react-native";

export default function Tela3() {
    return (
        <View>
            <Text>Tela3</Text>
            <Link href="/tela4">Tela 4</Link>

            <View>
                <Link href="/modal" >
                    Open modal
                </Link>
            </View>
        </View>
    );
}