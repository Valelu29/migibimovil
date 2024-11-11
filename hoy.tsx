import React, { useState, useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';

const EjemploCalendarioPersonalizado = () => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false); // Estado para mostrar/ocultar el calendario
  const navigation = useNavigation();

  // Configuración de la barra de navegación
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTintColor: '#40632F',
    });
  }, [navigation]);

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false); // Ocultar el calendario al seleccionar una fecha
  };

  // Si selectedDate está definido, lo usamos; de lo contrario, pasamos un objeto vacío.
  const markedDates = selectedDate ? {
    [selectedDate]: { selected: true, selectedColor: '#CEDFAD' }, // Selección con color #3E7E1E
  } : {};

  return (
    <View style={styles.container}>
      <Button title="Seleccionar Fecha" onPress={() => setShowCalendar(true)} />
      
      {showCalendar && (
        <Calendar
          onDayPress={onDayPress}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: '#3E7E1E', // Color de selección
            todayTextColor: '#CEDFAD', // Color de la fecha de hoy
            dayTextColor: '#3E7E1E', // Color de los días del calendario
            arrowColor: '#3E7E1E', // Color de las flechas de navegación
            monthTextColor: '#3E7E1E', // Color del mes en la cabecera
            textSectionTitleColor: '#9FAF7D', // Color del título de la sección
          }}
        />
      )}

      {selectedDate && <Text>Fecha seleccionada: {selectedDate}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EjemploCalendarioPersonalizado;
