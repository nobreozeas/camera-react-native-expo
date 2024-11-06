import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import api from '../../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen() {
    const [products, setProducts] = useState([]);




    useEffect(() => {

        async function loadProducts() {
            const url = "https://api-produtos-6p7n.onrender.com/products";
            const response = await fetch(url);


            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                alert('Erro ao buscar produtos');
            }
        }



        loadProducts();
    }, []);

    return (
        <SafeAreaView>
            <View>
                <Text>Produtos IMagens</Text>
            </View>

            <View>
                {
                    products.map(product => (

                        <View key={product.id} className="border border-gray-300 rounded p-2 mb-2">
                            <Text>{product.nome}</Text>
                            <Text>{product.preco}</Text>
                            <Text>{product.descricao}</Text>
                            <Text>{product.Category.nome}</Text>
                            <Text>{product.Location.nome}</Text>
                            <Image source={{ uri: `https://api-produtos-6p7n.onrender.com/${product.image}` }} style={{ width: 100, height: 100 }} />
                        </View>
                    ))
                }
            </View>

            

           
        </SafeAreaView>
    );
}



