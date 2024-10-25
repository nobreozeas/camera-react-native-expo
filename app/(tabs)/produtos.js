import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';
// import TextInput from "../components/TextInput";


export default function Produtos() {


    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [preco, setPreco] = useState(0);
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [local, setLocal] = useState('');
    const [descricao, setDescricao] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);


    useEffect(() => {
        async function loadCategories() {
            const response = await api.get('/categories');
            setCategories(response.data);
        }

        async function loadLocations() {
            const response = await api.get('/locations');
            setLocations(response.data);

        }

     


        loadCategories();
        loadLocations();




    }
        , []);



    const handleInputChange = (text) => {
        // deixar o usuario colocar apenas numeros e ponto
        const numericValue = text.replace(/[^0-9.]/g, '');


        setPreco(numericValue); // Atualiza o valor somente com números
    };

    const pickImage = async () => {
        // Solicita permissão para acessar a galeria
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permissão para acessar a galeria é necessária!");
            return;
        }

        // Abre o seletor de imagem
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
    }

    const cadastrar = async () => {
        const data = new FormData();
        data.append('nome', nome);
        data.append('preco', preco);
        data.append('descricao', descricao);
        data.append('usuario', 'Osvaldo');
        data.append('categoriaId', categoria);
        data.append('localId', local);
        data.append('image', {
            uri: selectedImage,
            type: 'image/jpeg',
            name: 'image.jpg',
        });


        const url = "http://172.19.6.35:3000/products";

        const response = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 201) {
            alert('Produto cadastrado com sucesso!');
        } else {
            alert('Erro ao cadastrar o produto!');
        }
    }



    return (

        <SafeAreaView style={styles.container}>
        
        <View >
           

            <Text className="mb-2">Nome</Text>
            <TextInput
                className="border border-gray-300 rounded h-11 mb-4"
                onChangeText={setNome}
                value={nome}
            ></TextInput>

            <Text className="mb-2">Preço</Text>
            <TextInput value={preco}
                onChangeText={handleInputChange}
                keyboardType="numeric" // Aceita apenas teclado numérico
                placeholder="Digite um valor numérico" className="border border-gray-300 rounded h-11 mb-4"></TextInput>


            <View className="mb-4">
                <Text className="mb-2">Local</Text>
                <View style={styles.pickerContainer} className="border border-gray-300">
                    <Picker
                        selectedValue={local}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setLocal(itemValue)}
                    >
                        <Picker.Item label="Selecione um local..." value="" />
                        {locations.map(location => (
                            <Picker.Item key={location.id} label={location.nome} value={location.id} />
                        ))}
                    </Picker>
                </View>
            </View>

            <Text className="mb-2">Descrição</Text>
            <TextInput
                className="border border-gray-300 rounded h-11 mb-4"
                onChangeText={setDescricao}
                value={descricao}
            ></TextInput>

            <View>
                <Text className="mb-2">Categorias</Text>
                <View style={styles.pickerContainer} className="border border-gray-300">
                    <Picker
                        selectedValue={categoria}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setCategoria(itemValue)}
                    >
                        <Picker.Item label="Selecione uma categoria..." value="" />
                        {categories.map(category => (
                            <Picker.Item key={category.id} label={category.nome} value={category.id} />
                        ))}
                    </Picker>
                </View>
            </View>

            <View style={styles.boxImage}>

                <View className="flex flex-row justify-center">
                    <TouchableOpacity onPress={pickImage} className="bg-blue-700 p-3 mt-4 rounded">
                        <Text className="text-white">Selecionar imagem</Text>
                    </TouchableOpacity>
                </View>

                <View className="my-3">

                    {
                        selectedImage && (
                            <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100, marginHorizontal: 6 }} />
                        )
                    }
                </View>
            </View>


            <View>
                <TouchableOpacity className="bg-blue-700 p-3 mt-4 rounded flex items-center" onPress={cadastrar}>
                    <Text className="text-white">Cadastrar</Text>
                </TouchableOpacity>
            </View>


        </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    pickerContainer: {
        borderRadius: 5,
        padding: 0,

        height: 40, // Ajusta a altura do container para o Picker
        justifyContent: 'center', // Centraliza o conteúdo verticalmente
    },
    picker: {
        height: 40, // Define uma altura mínima
        paddingVertical: 0, // Remove qualquer padding extra que cause desalinhamento
    },
    boxImage: {
        width: '100%',
        minHeight: 200,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 20,
    },
});