// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Omg from './omg';
import Plan from './plan';
import Perfil from './perfil';
import Reg from './Reg';
import Hoy from './hoy';
import Recetas, { RecetasProps } from './recetas';  // Importa RecetasProps correctamente
import Refri from './refri';
import Login from './login';
import Register from './register';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Omg">
        <Stack.Screen name="Omg" component={Omg} />
        <Stack.Screen name="Plan" component={Plan} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Reg" component={Reg} />
        <Stack.Screen name="Hoy" component={Hoy} />
        <Stack.Screen name="Recetas" component={Recetas as React.ComponentType<RecetasProps>} />
        <Stack.Screen name="Refri" component={Refri} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
