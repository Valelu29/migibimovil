import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Image, TextInput, ScrollView } from 'react-native';
import { Button, Provider } from '@ant-design/react-native';
import { Calendar } from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

export default function Plan() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('option1');
  const [items, setItems] = useState([
    { label: 'Opción 1', value: 'option1' },
    { label: 'Opción 2', value: 'option2' },
    { label: 'Opción 3', value: 'option3' },
  ]);
  const [porciones, setPorciones] = useState('');  // Estado para el valor de las porciones

  // Estados para controlar si cada botón ha sido presionado
  const [selectedButtons, setSelectedButtons] = useState({
    faltante: false,
    caducar: false,
    desayuno: false,
    comida: false,
    cena: false,
  });

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTintColor: '#40632F',
    });
  }, [navigation]);

  const markedDates = selectedDate
    ? {
        [selectedDate]: { selected: true, selectedColor: '#CEDFAD' },
      }
    : {};

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Función para manejar el cambio de imagen al presionar un botón
  const handlePress = (button: keyof typeof selectedButtons) => {
    setSelectedButtons((prevState) => ({
      ...prevState,
      [button]: !prevState[button], // Cambia el estado de la imagen (presionado o no)
    }));
  };

  return (
    <Provider>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.dragIndicator} />

              {/* Botón de Cerrar */}
              <Pressable style={styles.closeButtonContainer} onPress={toggleModal}>
                <Image
                  source={require('./img/AbajoF.png')} // Ruta de la imagen
                  style={styles.closeButtonImage}
                />
              </Pressable>

              {/* Selector de Fecha y Botón */}
              <View style={styles.dateSelectorContainer}>
                <Text style={styles.dateText}>Fecha</Text>
                <Text style={styles.selectedDateText}>
                  {selectedDate ? selectedDate : 'No seleccionada'}
                </Text>
                <Button type="primary" onPress={() => setShowCalendar(true)} style={styles.selectButton}>
                  Seleccionar
                </Button>
              </View>

              {/* Calendario */}
              {showCalendar && (
                <Calendar
                  onDayPress={onDayPress}
                  markedDates={markedDates}
                  theme={{
                    selectedDayBackgroundColor: '#3E7E1E',
                    todayTextColor: '#CEDFAD',
                    dayTextColor: '#3E7E1E',
                    arrowColor: '#3E7E1E',
                    monthTextColor: '#3E7E1E',
                    textSectionTitleColor: '#9FAF7D',
                  }}
                />
              )}

              {/* Dropdown Selector */}
              <View style={styles.selectContainer}>
                <View style={styles.dropdownWrapper}>
                  <Text style={styles.modalText}>Seleccionar Opción</Text>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    containerStyle={styles.dropdownContainer}
                    style={styles.dropdownStyle}
                  />
                </View>
              </View>

              {/* Input para las porciones */}
              <View style={styles.porcionesContainer}>
                <Text style={styles.modalText}>Porciones</Text>
                <TextInput
                  style={styles.input}
                  value={porciones}
                  onChangeText={setPorciones}
                  keyboardType="numeric"
                  placeholder="Porciones"
                />
              </View>
            </View>
          </View>
        </Modal>

        {/* Botones Horizontales */}
        <View style={styles.botonesIn}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            <Pressable style={styles.button} onPress={() => handlePress('faltante')}>
              <Image
                source={selectedButtons.faltante ? require('./img/biFal2.png') : require('./img/biFal.png')}
                style={styles.imgbi}
              />
              <Text style={styles.textbi} >Faltante</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => handlePress('caducar')}>
              <Image
                source={selectedButtons.caducar ? require('./img/biCa2.png') : require('./img/biCa.png')}
                style={styles.imgbi}
              />
              <Text style={styles.textbi}>Caducar</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => handlePress('desayuno')}>
              <Image
                source={selectedButtons.desayuno ? require('./img/biDes2.png') : require('./img/biDes.png')}
                style={styles.imgbi}
              />
              <Text style={styles.textbi}>Desayuno</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => handlePress('comida')}>
              <Image
                source={selectedButtons.comida ? require('./img/biCom2.png') : require('./img/biCom.png')}
                style={styles.imgbi}
              />
              <Text style={styles.textbi}>Comida</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => handlePress('cena')}>
              <Image
                source={selectedButtons.cena ? require('./img/biCe2.png') : require('./img/biCe.png')}
                style={styles.imgbi}
              />
              <Text style={styles.textbi}>Cena</Text>
            </Pressable>
          </ScrollView>
        </View>

        <View>
          <Pressable>
              <Image  
                source={require('./img/bComp.png')}
              />
          </Pressable>
          <Pressable>
              <Image  
                source={require('./img/bDesc.png')}
              />
          </Pressable>
          <Pressable>
              <Image  
                source={require('./img/bV2.png')}
              />
          </Pressable>
        </View>

        <Pressable style={styles.bottomBar} onPress={toggleModal}>
          <Image source={require('./img/MasIcon.png')} />
        </Pressable>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    height: '80%',
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  selectedDateText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    marginRight: 10,
  },
  dateSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    top: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  selectButton: {
    marginLeft: 10,
  },
  bottomBar: {
    backgroundColor: '#CEDFAC',
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomBarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  calendarContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 10,
    width: '100%',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 25,
    width: 30,
    height: 30,
  },
  closeButtonImage: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  selectContainer: {
    marginTop: 20,
    justifyContent: 'flex-start',
    width: '100%',
  },
  dropdownWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  dropdownContainer: {
    width: '50%',
  },
  dropdownStyle: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  porcionesContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  input: {
    width: '60%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
  },
  botonesIn: {
    marginTop: 20,
    width: '100%',
    bottom: 210,
    position: 'relative',
  },
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  imgbi: {
    width: 66,
    height: 66,
  },
  textbi: {
    fontFamily: 'Jomhuria',
    fontSize: 25,
    color: '#6B8762',
  }
});
