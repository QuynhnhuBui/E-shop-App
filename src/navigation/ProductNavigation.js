import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import ProductList from "../Screens/Products/ProductLists";

const Stack = createStackNavigator()

const ProductNavigation = () => {
    return (
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
            <Stack.Screen
            name="detail"
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
    );
  }

export default ProductNavigation