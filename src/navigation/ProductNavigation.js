import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import ProductList from "../Screens/Products/ProductLists";
import ProductDetail from '../Screens/Products/ProductDetail'

import ProductContainer from '../containers/ProductContainer'
const Stack = createStackNavigator()

const ProductNavigation = () => {
    return (
        <Stack.Navigator >
          <Stack.Screen
            name="productList"
            options={({route}) => ({
              title: 'Product',
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
            component={ProductList}></Stack.Screen>
            <Stack.Screen
            name="detail"
            options={({route}) => ({
              title: 'Detail',
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
            component={ProductContainer}></Stack.Screen>
        </Stack.Navigator>
    );
  }

export default ProductNavigation