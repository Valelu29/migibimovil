import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
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
// Tipado correcto del componente
const Recetas = ({ navigation }: RecetasProps) => {
  const [recipes, setRecipes] = useState<Receta[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

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

  const eliminarReceta = async (id: number) => {
    try {
      await axios.delete(`${PUERTO}/recetaGeneral/${id}`);
      Alert.alert('Éxito', 'Receta eliminada exitosamente.');
      datosReceta();
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la receta.');
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
    <View style={styles.container}>
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AgregarReceta')}
      >
        <Text style={styles.addButtonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
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
});

export default Recetas;
