import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Keyboard,
  ActivityIndicator,
  Text,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import url from '../../common/baseUrl';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import images from '../../res/images/index';
import SwipeItem from './SwipeItem';
import Icon from 'react-native-vector-icons/FontAwesome';

const Product = props => {
  const [token, setToken] = useState();
  const [productList, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [focus, setFocus] = useState(false);
  const [searchText, setText] = useState('');
  const [indexScroll, setIndexScroll] = useState(0);
const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('token')
        .then(token => {
          setToken(token);
        })
        .catch(error => console.log(error));

      getProduct();
    }, []),
  );

  const getProduct = () => {
    axios
      .get(`${url}products/getProductList`)
      .then(res => {
        if (res.data.success == true) {
          setList(res.data.productList);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log('Fetch api error');
      });
  };

  const searchProduct = text => {
    axios
      .get(`${url}products/searchProduct?search=${text}`)
      .then(res => {
        if (res.data.success == true) {
          setList(res.data.productList);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log('Fetch api error');
      });
  };

  const deleteProduct = id => {
    axios
      .delete(`${url}products/deleteProduct/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        if (res.data.success == true) {
          getProduct();
        }
      })
      .catch(error => {
        console.log('Fetch api error');
      });
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate('orders')}}
            style={styles.view}>
              <Icon name="shopping-bag" color={'#fff'} size={Sizes.s30} />
              <Text style={styles.text}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate('addProduct',{item: null})}}
            style={styles.view}>
              <Icon name="plus" color={'#fff'} size={Sizes.s30} />
              <Text style={styles.text}>Product</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate('category')}}
            
            style={styles.view}>
              <Icon name="plus" color={'#fff'} size={Sizes.s30} />
              <Text style={styles.text}>Category</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchBar}>
            <View style={styles.searchView}>
              <Image
                resizeMode="contain"
                source={images.ic_search}
                style={styles.searchImage}
              />
              <TextInput
                placeholder="Search"
                onChangeText={text => {
                  setText(text);
                  if (text) {
                    searchProduct(text);
                  }
                }}
                onFocus={() => {
                  setFocus(true);
                }}
                style={styles.cancelImage}
                value={searchText}
              />
            </View>
            {focus ? (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setFocus(false);
                  setText('');
                  Keyboard.dismiss();
                  getProduct();
                }}>
                <Image
                  source={images.ic_close}
                  style={{width: Sizes.s25, height: Sizes.s25}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : null}
          </View>

          <SwipeItem
            data={productList}
            onSetIndexScroll={value => setIndexScroll(value)}
            indexScroll={indexScroll}
            onPressDel={id => {
              
              deleteProduct(id);
            }}
            onPress={(item)=>{
              navigation.navigate('addProduct',{item})
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    borderRadius: Sizes.s20,
    backgroundColor: '#a9a9a9',
    marginHorizontal: Sizes.s30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchImage: {
    width: Sizes.s30,
    height: Sizes.s30,
    marginHorizontal: Sizes.s15,
  },
  cancelImage: {
    paddingVertical: Sizes.s15,
    width: '80%',
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    padding: Sizes.s20,
    marginRight: Sizes.s10,
  },
  text: {color: '#fff', fontWeight: '700', marginLeft: Sizes.s10},
  view: {
    flexDirection: 'row',
    padding: Sizes.s20,
    backgroundColor: '#ff6600',
    borderRadius: Sizes.s20,
  },
  loading: {justifyContent: 'center', alignItems: 'center', flex: 1},
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: Sizes.s20,
  },
});

export default Product;
