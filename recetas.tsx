import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';  // Importa RootStackParamList
import RecipeCard from './RecipeCard';
import PUERTO from './config';

// Define y exporta RecetasProps
export type RecetasProps = NativeStackScreenProps<RootStackParamList, 'Recetas'>;

interface Receta {
  Id_Receta: number;
  Nombre: string;
  Calorias: string;
  Tiempo: string;
  Imagen_receta: string;
  Activo: number;
  Id_Usuario_Alta: number;
  Porciones: string;
}

// Componente principal de Recetas
const Recetas = ({ navigation }: RecetasProps) => {
  const [recipes, setRecipes] = useState<Receta[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Estados para agregar recetas
  const [nombre, setNombre] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [procedimiento, setProcedimiento] = useState('');
  const [porciones, setPorciones] = useState('');
  const [tipo, setTipo] = useState('Postre');

  // Obtener recetas
  const datosReceta = async () => {
    setLoading(true);
    try {
      const currentUser = localStorage.getItem('currentUser');
      if (!currentUser) {
        Alert.alert('Aviso', 'No hay un usuario logueado actualmente.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${PUERTO}/recetaGeneral`);
      if (response.data) {
        const userId = parseInt(currentUser, 10);
        const recData = response.data.filter((receta: Receta) =>
          receta.Activo > 0 && (receta.Id_Usuario_Alta === userId || receta.Id_Usuario_Alta === 1)
        );
        setRecipes(recData);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la lista de recetas.');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar receta
  const eliminarReceta = async (id: number) => {
    try {
      await axios.delete(`${PUERTO}/recetaGeneral/${id}`);
      Alert.alert('Éxito', 'Receta eliminada exitosamente.');
      datosReceta();
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la receta.');
    }
  };

  // Guardar nueva receta
  const guardarReceta = async () => {
    if (!nombre || !ingredientes || !procedimiento || !porciones) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      const currentUser = localStorage.getItem('currentUser');
      if (!currentUser) {
        Alert.alert('Aviso', 'No hay un usuario logueado.');
        return;
      }

      await axios.post(`${PUERTO}/recetaGeneral`, {
        Nombre: nombre,
        Ingredientes: ingredientes,
        Procedimiento: procedimiento,
        Porciones: porciones,
        Tipo: tipo,
        Id_Usuario_Alta: parseInt(currentUser, 10),
      });
      Alert.alert('Éxito', 'Receta agregada exitosamente.');
      setNombre('');
      setIngredientes('');
      setProcedimiento('');
      setPorciones('');
      datosReceta();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la receta.');
    }
  };

  useEffect(() => {
    datosReceta();
  }, []);

  const renderRecipe = ({ item }: { item: Receta }) => (
    <RecipeCard
      id={item.Id_Receta}
      title={item.Nombre}
      portions={item.Porciones}
      calories={item.Calorias}
      time={item.Tiempo}
      image={item.Imagen_receta}
      onEdit={() => navigation.navigate('EditarReceta', { id: item.Id_Receta })}
      onDelete={() => eliminarReceta(item.Id_Receta)}
    />
  );

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#00b96b" />
        <Text>Cargando recetas...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre, calorías o tiempo"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={recipes.filter(recipe =>
          recipe.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        keyExtractor={item => item.Id_Receta.toString()}
        renderItem={renderRecipe}
      />
      
      {/* Formulario para agregar recetas */}
      <Text style={styles.sectionTitle}>Agregar Nueva Receta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la receta"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Ingredientes"
        value={ingredientes}
        onChangeText={setIngredientes}
        multiline
      />
      <TextInput
        style={styles.textArea}
        placeholder="Procedimiento"
        value={procedimiento}
        onChangeText={setProcedimiento}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Porciones"
        value={porciones}
        onChangeText={setPorciones}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.addButton} onPress={guardarReceta}>
        <Text style={styles.addButtonText}>Guardar Receta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#CAE2B5',
  },
  searchInput: {
    height: 40,
    borderColor: '#00b96b',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#FFF',
    height: 100,
  },
  addButton: {
    backgroundColor: '#00b96b',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#556B2F',
  },
});

export default Recetas;
