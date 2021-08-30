import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import CartContainer from '../containers/CartContainer'
import CheckoutNavigation from './CheckoutNavigation'
 import Product from '../Screens/AdminPanel/Product'
import Categories from '../Screens/AdminPanel/Categories'
import AddProduct from '../Screens/AdminPanel/AddProduct'
const Stack = createStackNavigator()

const AdminNavigation = () => {
    return (
        <Stack.Navigator >
          <Stack.Screen
            name="product"
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
            component={Product}></Stack.Screen>
            <Stack.Screen
            name="category"
            options={({route}) => ({
              title: 'Checkout',
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
            component={Categories}></Stack.Screen>
             <Stack.Screen
            name="addProduct"
            options={({route}) => ({
              title: 'Add Product',
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
            component={AddProduct}></Stack.Screen>
           
        </Stack.Navigator>
    );
  }

export default AdminNavigation