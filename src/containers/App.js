import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ProductList from '../Screens/Products/ProductLists';

export const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="productList"
          options={({route}) => ({
            title: '',
            headerTitleStyle: {
              // ...Fonts.Title,
              fontWeight: 'bold',
              // color: Colors.DarkBlue,
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
           
            headerTitleAlign: 'center',
          })}
          component={ProductList}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
