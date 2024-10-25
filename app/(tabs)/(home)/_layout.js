import { Stack } from 'expo-router';
import React from 'react';


export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen name="tela3" />
            <Stack.Screen name="tela4" />
        </Stack>
    );
}