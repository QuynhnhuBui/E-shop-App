import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/User/Login';
import Profile from '../Screens/User/Profile';
import Register from '../Screens/User/Register';
const Stack = createStackNavigator();

const UserNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        options={({route}) => ({
          title: 'User',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#ffffff',
            shadowColor: 'transparent',
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
              width: 0,
            },
            elevation: 0,
          },
          headerBackTitle: ' ',
          headerTitleAlign: 'center',
        })}
        component={Login}></Stack.Screen>
      <Stack.Screen
        name="register"
        options={({route}) => ({
          title: 'Cart',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#ffffff',
            shadowColor: 'transparent',
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
              width: 0,
            },
            elevation: 0,
          },
          headerBackTitle: ' ',
          headerTitleAlign: 'center',
        })}
        component={Register}></Stack.Screen>
      <Stack.Screen
        name="profile"
        options={({route}) => ({
          title: 'Cart',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#ffffff',
            shadowColor: 'transparent',
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
              width: 0,
            },
            elevation: 0,
          },
          headerBackTitle: ' ',
          headerTitleAlign: 'center',
        })}
        component={Profile}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default UserNavigation;
