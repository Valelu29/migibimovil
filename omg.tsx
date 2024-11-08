// omg.tsx
import React from 'react';
import { Button, Icon, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { RouteProp } from '@react-navigation/native';

type OmgScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Omg'>;

type Props = {
  navigation: OmgScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'Omg'>;
};

export default function Omg({ navigation, route }: Props) {
  return (
    <WingBlank>
      <WhiteSpace />
      <Button onPress={() => navigation.navigate('Plan')}>Ir a Plan</Button>
      <WhiteSpace />

      <Button type="primary" onPress={() => navigation.navigate('Plan')}>
    primary (Ir a Plan)
</Button>

<Button activeStyle={false}>无点击反馈</Button>
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

      {/* Resto de botones */}
      <Button type="warning">warning</Button>
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
    </WingBlank>
  );
}
