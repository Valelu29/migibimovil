import React, { useLayoutEffect } from 'react';
import { Button, Icon, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { RouteProp, useNavigation } from '@react-navigation/native';

type OmgScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Omg'>;

type Props = {
  navigation: OmgScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'Omg'>;
};

export default function Omg({ navigation, route }: Props) {
  const nav = useNavigation<OmgScreenNavigationProp>();

  // Cambiar el color de la flecha al montar el componente
  useLayoutEffect(() => {
    nav.setOptions({
      headerTintColor: '#40632F', // Color de la flecha
    });
  }, [nav]);

  return (
    <WingBlank>
      <WhiteSpace />
      <Button onPress={() => navigation.navigate('Plan')}>Ir a Plan</Button>
      <WhiteSpace />

      <Button type="primary" onPress={() => navigation.navigate('Plan')}>
        primary (Ir a Plan)
      </Button>

      <Button activeStyle={false} onPress={() => navigation.navigate('Perfil')} >ir a picker</Button>
      <WhiteSpace />
      <Button activeStyle={{ backgroundColor: 'red' }}>
        custom feedback style
      </Button>
      <WhiteSpace />

      <WingBlank
          style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
          }}>
          <Button type="ghost">ghost</Button>
          <Button type="ghost" disabled>
              ghost disabled
          </Button>
      </WingBlank>

      <WhiteSpace />

      <Button type="warning" onPress={() => navigation.navigate('Reg')} >warning</Button>
      <WhiteSpace />

      <Button loading>loading button</Button>
      <WhiteSpace />

      <Button activeStyle={{ backgroundColor: 'red' }}>
        custom feedback style
      </Button>
      <WhiteSpace />

      <WingBlank
          style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
          }}
      >
          <Button type="ghost">ghost</Button>
          <Button type="ghost" size="small">
            ghost
          </Button>
      </WingBlank>
      <WhiteSpace />

      <Button type="primary">
        <Icon name="login" />
      </Button>

      {/* Botones para iniciar sesión y registrarse */}
      <WhiteSpace />
      <Button type="primary" onPress={() => navigation.navigate('Login')}>Iniciar sesión</Button>
      <WhiteSpace />
      <Button type="primary" onPress={() => navigation.navigate('Register')}>Registrarse</Button>
    </WingBlank>
  );
}
