import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PUERTO from './config';
import PorCaducar from './PorCaducar';
import ProductModal from './ProductoRefriModal';
import ModalEd from './AlimentoEditar';
import { TextInput, View, ActivityIndicator, Alert, Button, Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';

interface CardData {
  id: number;
  ingrediente: string;
  cantidad: number;
  abreviatura: string;
  image: string;
  fecha: string;
  diasRestantes: string | number;
  caducidadPasada: boolean | null;
  Tipo: string;
  Activo: number;
  Id_Usuario_Alta: number;
}

export default function Inicio() {
  const [alimentosPerecederos, setAlimentosPerecederos] = useState<CardData[]>([]);
  const [alimentosNoPerecederos, setAlimentosNoPerecederos] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [edAlimento, setEdAlimento] = useState<number | null>(null);

  const mostrarAlerta = (titulo: string, mensaje: string) => {
    Alert.alert(titulo, mensaje);
  };

  const agregarAlimento = async () => {
    setLoading(true);
    try {
      const currentUser = await AsyncStorage.getItem("currentUser");
      if (!currentUser) {
        mostrarAlerta("Aviso", "No hay un usuario logueado actualmente.");
        return;
      }
      // Lógica adicional de agregar alimento
    } catch (error) {
      console.error("Error al agregar alimento:", error);
      mostrarAlerta("Error", "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarAlimento = async (id: number) => {
    try {
      const response = await axios.put(`${PUERTO}/alimentoInactivo/${id}`, { id });
      if (response.status === 200) {
        mostrarAlerta("Éxito", "Alimento eliminado exitosamente.");
        datosAlimento();
      } else {
        mostrarAlerta("Error", "No se pudo eliminar el alimento.");
      }
    } catch (error) {
      console.error("Error al eliminar alimento:", error);
      mostrarAlerta("Error", "Ocurrió un error al intentar eliminar el alimento.");
    }
  };

  const datosAlimento = async () => {
    setLoading(true);
    try {
      const currentUser = await AsyncStorage.getItem("currentUser");
      if (!currentUser) {
        mostrarAlerta("Aviso", "No hay un usuario logueado actualmente.");
        return;
      }

      const userId = parseInt(currentUser, 10);
      if (isNaN(userId)) {
        mostrarAlerta("Error", "ID de usuario inválido.");
        return;
      }

      const response = await axios.get(`${PUERTO}/alimento`);
      const { Perecedero, NoPerecedero } = response.data;

      setAlimentosPerecederos(Perecedero || []);
      setAlimentosNoPerecederos(NoPerecedero || []);
      mostrarAlerta("Éxito", "Alimentos obtenidos exitosamente");
    } catch (error) {
      console.error("Error al obtener alimentos:", error);
      mostrarAlerta("Error", "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    datosAlimento();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const filteredAlimentos = [...alimentosPerecederos, ...alimentosNoPerecederos].filter((alimento) => {
    const nombre = alimento.ingrediente.toLowerCase();
    const tipo = alimento.Tipo.toLowerCase();
    const cantidad = alimento.cantidad.toString();
    return (
      (nombre.includes(searchTerm) || tipo.includes(searchTerm) || cantidad.includes(searchTerm)) &&
      alimento.cantidad > 0 && alimento.Activo > 0
    );
  });

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar ingrediente"
          value={searchTerm}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
        <Button title="Agregar" color="#f4511e" onPress={() => setIsModalOpen(true)} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={styles.centered} />
      ) : (
        <View>
          <PorCaducar />
          {filteredAlimentos.map((alimento, index) => (
            <Card key={index} style={styles.card}>
              <View style={styles.cardContent}>
                <Text>{alimento.ingrediente}</Text>
                <Text>{alimento.fecha}</Text>
              </View>
            </Card>
          ))}

          <ProductModal visible={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <ModalEd visible={edAlimento !== null} onClose={() => setEdAlimento(null)} alimentoId={edAlimento} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    borderRadius: 8,
  },
  card: {
    marginBottom: 16,
  },
  cardContent: {
    padding: 16,
  },
  centered: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});