import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, Image } from "react-native";
import CameraViewComponent from "./components/CameraViewComponent";

export default function App() {

  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [photos, setPhotos] = useState([]);

  const openCamera = async () => {
    // Open the camera
    setIsCameraVisible(true);

  };

  const addPhoto = (photo) => {
    setPhotos((prevPhotos) => [...prevPhotos, photo]);

  };



  return (
    <View style={styles.container}>
      <Text style={styles.message}>Camera App</Text>
      {!isCameraVisible &&
        <Button title="Open Camera" onPress={openCamera} />
      }
      {isCameraVisible && <CameraViewComponent setIsCameraVisible={setIsCameraVisible} addPhoto={addPhoto} />}

      <View>
        <View>
          {photos.map((photo, index) => (
            <View>
              <Image key={index} source={{ uri: photo.uri }} style={{ width: 100, height: 100 }} />
              <Button title="Delete" onPress={
                () => {
                  const newPhotos = photos.filter((p, i) => i !== index);
                  setPhotos(newPhotos);
                }
              }></Button>
            </View>
            


          ))}
        </View>
      </View>


      <View>
        <Button
          title="Delete Photos"
          onPress={() => setPhotos([])}
        />
      </View>





    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
});

