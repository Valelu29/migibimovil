import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { TextInput, Button, View, StyleSheet, Text, ScrollView, Image, Alert } from 'react-native';

const PUERTO = 'http://localhost:3000'; // Asegúrate de tener la URL correcta

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
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const datosAlimento = async () => {
    try {
      const currentUser = '1'; // Cambia esto por la forma en que gestionas el usuario
      if (!currentUser) {
        Alert.alert('No hay un usuario logueado actualmente.');
        setLoading(false);
        return;
      }

      const userId = parseInt(currentUser, 10);
      if (isNaN(userId)) {
        Alert.alert('ID de usuario inválido.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${PUERTO}/alimento`);
      const { Perecedero, NoPerecedero } = response.data;

      const mapAlimentos = (alimento: any, caducidad: boolean) => {
        const fechaCaducidad = alimento.Fecha_Caducidad ? new Date(alimento.Fecha_Caducidad) : null;
        const caducidadPasada = fechaCaducidad && fechaCaducidad < new Date();
        const diasRestantes = fechaCaducidad instanceof Date
          ? Math.max(
              0,
              Math.ceil(
                (fechaCaducidad.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              )
            )
          : 'No definida';
        const fecha = fechaCaducidad ? fechaCaducidad.toLocaleDateString() : 'Fecha no disponible';

        return {
          id: alimento.id || ' ',
          ingrediente: alimento.Nombre || ' ',
          cantidad: alimento.Cantidad || 1,
          abreviatura: alimento.Unidad || ' ',
          image: alimento.Imagen ? `${PUERTO}${alimento.Imagen}` : '/imagenes/defIng.png',
          fecha: caducidadPasada ? fecha : `${diasRestantes} días`,
          diasRestantes,
          caducidadPasada,
          Tipo: alimento.Tipo_Alimento,
          Activo: alimento.Activo,
          Id_Usuario_Alta: alimento.Id_Usuario_Alta,
        };
      };

      setAlimentosPerecederos(Perecedero.filter((a: any) => a.Id_Usuario_Alta === userId).map((a: any) => mapAlimentos(a, true)));
      setAlimentosNoPerecederos(NoPerecedero.filter((a: any) => a.Id_Usuario_Alta === userId).map((a: any) => mapAlimentos(a, false)));

      Alert.alert('Alimentos obtenidos exitosamente');
    } catch (error) {
      console.error('Error al obtener alimentos', error);
      Alert.alert('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    datosAlimento();
  }, []);

  const handleSearch = (value: string) => setSearchTerm(value.toLowerCase());

  const filteredAlimentos = useMemo(() => {
    return [...alimentosPerecederos, ...alimentosNoPerecederos].filter((alimento) => {
      const nombre = alimento.ingrediente.toLowerCase();
      const tipo = alimento.Tipo.toLowerCase();
      const cantidad = alimento.cantidad.toString();
      return (
        (nombre.includes(searchTerm) || tipo.includes(searchTerm) || cantidad.includes(searchTerm)) &&
        alimento.cantidad > 0 && alimento.Activo > 0
      );
    });
  }, [alimentosPerecederos, alimentosNoPerecederos, searchTerm]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar ingrediente"
          onChangeText={(value) => handleSearch(value)}
        />
        <Button
          title="Agregar"
          onPress={() => setIsModalOpen(true)}
        />
      </View>

      {loading ? (
        <Text style={{ marginTop: 50, textAlign: 'center' }}>Cargando...</Text>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {filteredAlimentos.map((card) => (
            <View
              key={card.id}
              style={{
                borderWidth: 1,
                borderColor: '#3E7E1E',
                borderRadius: 10,
                marginBottom: 16,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: card.image }}
                style={{ width: '100%', height: 200 }}
                resizeMode="cover"
              />
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, color: '#86A071', fontWeight: 'bold' }}>
                  {card.ingrediente}
                </Text>
                <Text>{`${card.cantidad} ${card.abreviatura}`}</Text>
                <Text style={{ marginTop: 10, color: card.caducidadPasada ? '#FF4D4F' : '#86A071' }}>
                  {card.fecha}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#86A071',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#CAE2B5',
  },
});
