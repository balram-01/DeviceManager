import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import openCamera from './camera';
import colors from '../../theme/colors';

const CircularPhotoWithCameraButton: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
       setImage(imageUri);
        console.log(imageUri);
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text>No photo selected</Text>
        )}
      </View>
      <TouchableOpacity style={styles.cameraButton} onPress={handleCameraLaunch}>
        <Text style={styles.buttonText}>Launch Camera</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  photoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'gray',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  cameraButton: {
    backgroundColor:colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CircularPhotoWithCameraButton;
