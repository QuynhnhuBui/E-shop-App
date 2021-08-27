import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import CartContainer from '../containers/CartContainer'
import CheckoutNavigation from './CheckoutNavigation'

const Stack = createStackNavigator()

const ProductNavigation = () => {
    return (
        <Stack.Navigator >
          <Stack.Screen
            name="cart"
            options={({route}) => ({
              title: 'Cart',
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
              headerBackTitle: ' ',
              headerTitleAlign: 'center',
            })}
            component={CartContainer}></Stack.Screen>
            <Stack.Screen
            name="checkout"
            options={({route}) => ({
              title: 'Checkout',
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
              headerBackTitle: ' ',
              headerTitleAlign: 'center',
            })}
            component={CheckoutNavigation}></Stack.Screen>
           
        </Stack.Navigator>
    );
  }

export default ProductNavigation