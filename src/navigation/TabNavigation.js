import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProductNavigation from './ProductNavigation';
import CartNavigation from './CartNavigation';
import CartIcon from '../Screens/ShoppingCart/CartIcon';
import UserNavigation from './UserNavigation';
import AdminNavigation from './AdminNavigation';
import AuthGlobal from '../redux/store/authGlobal';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const context = useContext(AuthGlobal);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        tabBarActiveTintColor: '#ff6600',
      }}>
      <Tab.Screen
        name="Home"
        component={ProductNavigation}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={30} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigation}
        options={{
          tabBarIcon: ({color}) => (
            <View>
              <Icon name="shopping-cart" color={color} size={30} />
              <CartIcon />
            </View>
          ),
          headerShown: false,
        }}
      />
      {context.stateUserData.user.isAdmin && (
        <Tab.Screen
          name="Admin"
          component={AdminNavigation}
          options={{
            tabBarIcon: ({color}) => (
              <View>
                <Icon name="cog" color={color} size={30} />
              </View>
            ),
            headerShown: false,
          }}
        />
      )}

      <Tab.Screen
        name="User"
        component={UserNavigation}
        options={{
          tabBarIcon: ({color}) => (
            <View>
              <Icon name="user" color={color} size={30} />
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
