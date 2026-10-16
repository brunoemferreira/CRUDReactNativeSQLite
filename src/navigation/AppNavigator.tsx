import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

import { HomeScreen } from '../presentation/screens/HomeScreen';
import { RegisterUserScreen } from '../presentation/screens/RegisterUserScreen';
import { UpdateUserScreen } from '../presentation/screens/UpdateUserScreen';
import { ViewUserScreen } from '../presentation/screens/ViewUserScreen';
import { ViewAllUserScreen } from '../presentation/screens/ViewAllUserScreen';
import { DeleteUserScreen } from '../presentation/screens/DeleteUserScreen';
import { AboutScreen } from '../presentation/screens/AboutScreen';
import { theme } from '../presentation/theme';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primaryDark,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
          cardStyle: {
            backgroundColor: theme.colors.background,
          },
        }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Controle de Usuários',
            headerStyle: {
              backgroundColor: '#1E1B4B',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterUserScreen}
          options={{
            title: 'Cadastrar Usuário',
            headerStyle: {
              backgroundColor: '#4F46E5',
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateUserScreen}
          options={{
            title: 'Atualizar Usuário',
            headerStyle: {
              backgroundColor: '#0284C7',
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewUserScreen}
          options={{
            title: 'Consultar Usuário',
            headerStyle: {
              backgroundColor: '#D97706',
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAllUserScreen}
          options={{
            title: 'Todos os Usuários',
            headerStyle: {
              backgroundColor: '#7C3AED',
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeleteUserScreen}
          options={{
            title: 'Excluir Usuário',
            headerStyle: {
              backgroundColor: '#EF4444',
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            title: 'Sobre o Aplicativo',
            headerStyle: {
              backgroundColor: '#0D9488',
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
