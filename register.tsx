import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Login = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes implementar la lógica de inicio de sesión
    console.log('Correo:', email);
    console.log('Contraseña:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre/Correo"
        placeholderTextColor="#40632F"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#40632F"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>

      <Image
        source={require('./assets/agua.png')} // Reemplaza con la ruta de tu ícono
        style={styles.logo}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF', // Color de fondo
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#40632F', // Color del texto del título
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#d4e4d3', // Color del borde
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#eaf5e9', // Color de fondo de los inputs
    color: '#40632F', // Color del texto
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#a8d5a3', // Color del botón
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#40632F', // Color del texto del botón
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 20,
  },
});
