import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

interface IImage {
  localUri: string
}

export default function TabThreeScreen() {
  const [selectedImage, setSelectedImage] = React.useState<IImage | null>(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission ot access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled == true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  }

  let openSharedDialogAsync = async() => {
    if (!(await Sharing.isAvailableAsync())) {
       alert(`Uh oh, sharing isn't available on your platform`);
       return;
    }

    if (selectedImage) {
       await Sharing.shareAsync(selectedImage.localUri);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: "https://i.imgur.com/TkIrScD.png"}} style={styles.logo}></Image>
      <Text style={styles.instructions}>To 22223share a photo from your phone with a friend, just press the button below!</Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}
        >
          <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
      {selectedImage && <Image 
        source={{ uri: selectedImage.localUri }}
        style={styles.thumbnail}
        ></Image>}
      { <TouchableOpacity
       onPress={openSharedDialogAsync} style={styles.button}
      >
        <Text style={styles.buttonText}>Share this photo</Text>
      </TouchableOpacity> }
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  logo: {
    width: 305,
    height: 195,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "#ccc",
    padding: 20,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 200,
    height: 200,
    resizeMode: "contain"
  }
});
