import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import url from '../../common/baseUrl';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Item from './Item';

const Orders = props => {
  const [token, setToken] = useState('');
  const [orders, setList] = useState();
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('token')
        .then(token => {
          setToken(token);
          getOrderList(token);
        })
        .catch(error => console.log(error));
    }, []),
  );

  const getOrderList = token => {
    axios
      .get(`${url}orders/getOrderList`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.data.success == true) {
          setList(res.data.orderList);
        }
      })
      .catch(error => {
        console.log('Fetch api error', error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {orders && (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <Item
              item={item}
              token={token}
              navigation= {navigation}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Sizes.s20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemView: {
    backgroundColor: '#ffffff',
    borderRadius: Sizes.s10,
    margin: Sizes.s20,
    alignContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.5 * Sizes.s5},
    shadowOpacity: 0.4,
    shadowRadius: 0.8 * Sizes.s5,
    elevation: Sizes.s7,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: Sizes.s30,
  },
});

export default Orders;
