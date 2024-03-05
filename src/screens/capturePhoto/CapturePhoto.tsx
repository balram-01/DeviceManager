import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import colors from '../../theme/colors';
import { saveCandidatePicture, getStoredPicture } from '../../services/sqlite/db';

const CircularPhotoWithCameraButton: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  // Fetch picture URI from the database upon component mount
  useEffect(() => {
    getStoredPicture()
      .then(pictureUri => {
        if (pictureUri) {
          console.log(pictureUri)
          setImage(pictureUri);
        }
      })
      .catch(error => {
        console.error('Error fetching stored picture URI:', error);
      });
  }, []);

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
        
        // Save the image URI to the database
        // Assuming you have a candidate ID, you can pass it here
        saveCandidatePicture(imageUri)
          .then(() => {
            console.log('Image URI saved to database successfully');
          })
          .catch(error => {
            console.error('Error saving image URI to database: ', error);
          });
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image}  />
        ) : (
          <View style={styles.noPhotoContainer}>
            <Text style={styles.noPhotoText}>No photo selected</Text>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.cameraButton} onPress={handleCameraLaunch}>
        <Text style={styles.buttonText}>Capture Photo</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  noPhotoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noPhotoText: {
    color: 'gray',
    textAlign: 'center',
  },
  cameraButton: {
    backgroundColor: colors.primary,
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
