import React, { useState } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router, Stack } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Screen() {
  const [selectedImage, setSelectedImage] = useState(null);

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

  const sucesso = () => {
    router.navigate('produtos');
  }

  return (
   

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen options={{
        title: 'Inicio',
        //alinhar o titulo ao centro
        headerTitleAlign: 'center',
        headerRight: () => <Button onPress={sucesso} title="Add" />
      }} />

      
      {
        selectedImage ? (
          <>
          <Image source={{uri: selectedImage}} style={{ width: 200, height: 200, borderRadius: 100 }} />
      <TouchableOpacity style={{ width:50, height:50, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 100, position: 'absolute', right: 120, bottom: 300 }} onPress={removeImage}>
        <AntDesign name="close" size={30} color="white" />
      </TouchableOpacity>
      </>
        ): (
          <>
            <Image source={require('../assets/images/user.png')} style={{ width: 200, height: 200, borderRadius: 100 }} />
      <TouchableOpacity style={{ width:50, height:50, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', borderRadius: 100, position: 'absolute', right: 120, bottom: 300 }} onPress={pickImage}>
        <AntDesign name="plus" size={30} color="white" />
      </TouchableOpacity>
          
          </>
      //     <Image source={} style={{ width: 200, height: 200, borderRadius: 100 }} />
      // <TouchableOpacity style={{ width:50, height:50, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', borderRadius: 100, position: 'absolute', right: 120, bottom: 300 }}>
      //   <AntDesign name="plus" size={30} color="white" />
      // </TouchableOpacity>
        )
      }
      
    </View>
  );
}

