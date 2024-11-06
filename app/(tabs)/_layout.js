import { Tabs } from 'expo-router';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import '../../global.css';

export default function TabLayout() {
    return (
        
            <Tabs
            screenOptions={{
                
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            }}
        > 
        <Tabs.Screen
                name="teste"
                options={{
                    title: 'teste',
                    tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="(home)"
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
                   
                }}
            />
            <Tabs.Screen
                name="produtos"
                options={{
                    title: 'Produtos',
                    tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
                }}
            />

           

          


         


         


        </Tabs>
     

    );
}