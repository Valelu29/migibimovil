import React from 'react';
import { useFonts } from 'expo-font';
import { Button, Provider, Toast } from '@ant-design/react-native';
import Omg from './omg';

export default function App() {
  const [fontsLoaded] = useFonts({
    antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <Provider>
      <Omg />
      <Button onPress={() => Toast.info('Este es un mensaje de prueba')}>Empezar</Button>
    </Provider>
  );
}
