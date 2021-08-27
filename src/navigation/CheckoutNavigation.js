import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Confirm from '../Screens/ShoppingCart/Confirm'
import Payment from '../Screens/ShoppingCart/Payment'
import Shipping from '../Screens/ShoppingCart/Shipping'


const Tab = createMaterialTopTabNavigator();

const CheckoutNavigation = () =>{
    return(
        <Tab.Navigator>
            <Tab.Screen name="Shipping" component={Shipping} />
            <Tab.Screen name="Payment" component={Payment} />
            <Tab.Screen name="Confirm" component={Confirm} />
        </Tab.Navigator>
    );
}

export default CheckoutNavigation