import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Payment from '../Screens/ShoppingCart/Payment';
import CheckoutContainer from '../containers/CheckoutContainer';
import ConfirmContainer from '../containers/ConfirmContainer';
const Tab = createMaterialTopTabNavigator();

const CheckoutNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
      }}>
      <Tab.Screen name="shipping" component={CheckoutContainer} />
      <Tab.Screen name="payment" component={Payment} />
      <Tab.Screen name="confirm" component={ConfirmContainer} />
    </Tab.Navigator>
  );
};

export default CheckoutNavigation;
