import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const openCamera= () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        console.log('response', JSON.stringify(response));
       return  response.assets[0].uri;
      }
    });
  };
  export default openCamera;