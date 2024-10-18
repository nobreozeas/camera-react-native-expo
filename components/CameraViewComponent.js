import { CameraView, CameraType, useCameraPermissions, } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useRef } from 'react';


export default function CameraViewComponent({ setIsCameraVisible, addPhoto }) {

   

   

    const [facing, setFacing] = useState('back');
    const cameraRef = useRef(null);
    const [permission, requestPermission] = useCameraPermissions();

    

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            console.log('photo', photo);
            setIsCameraVisible(false);
            addPhoto(photo);

        }
    }

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }


    return (
        <View style={styles.container}>
            
                <CameraView style={styles.camera} ref={cameraRef} >
                   <View style={styles.viewBtnCaptura}>
                   <TouchableOpacity style={styles.btnPicture} onPress={takePicture}>
                        <Text style={styles.text}>Take Picture</Text>
                    </TouchableOpacity>

                  
                    <TouchableOpacity style={styles.btnPicture} onPress={() => setIsCameraVisible(false) }>
                        <Text style={styles.text}>Close Camera</Text>
                    </TouchableOpacity>

                   </View>
                </CameraView>
    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },

    btnPicture: {

        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
    },
    viewBtnCaptura: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 20,
    },
});

