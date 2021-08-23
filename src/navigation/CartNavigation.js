import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import ProductList from "../Screens/Products/ProductLists";
import ProductDetail from '../Screens/Products/ProductDetail'
import CartContainer from '../containers/CartContainer'
import ProductContainer from '../containers/ProductContainer'
const Stack = createStackNavigator()

const ProductNavigation = () => {
    return (
        <Stack.Navigator >
          <Stack.Screen
            name="cart"
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
            component={CartContainer}></Stack.Screen>
           
        </Stack.Navigator>
    );
  }

export default ProductNavigation