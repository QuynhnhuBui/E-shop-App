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
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import images from '../../res/images/index';
import Banner from './Banner';
import CategoryFilter from './CategoryFilter';
import ListItem from './ListItem';
import CardItem from './CardItem';
import axios from 'axios';
import url from '../../common/baseUrl';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const ProductList = props => {
  const [productList, setList] = useState([]);
  const [focus, setFocus] = useState(false);
  const [searchText, setText] = useState('');
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState('-1');
  const [initialState, setInitialState] = useState([]);
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getProductList();
      getCategoryList();
    }, []),
  );
  const getProductList = () => {
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

  const getCategoryList = () => {
    axios
      .get(`${url}categories/getListCategory`)
      .then(res => {
        if (res.data.success == true) {
          setCategory(res.data.categoryList);
        }
      })
      .catch(error => {
        console.log('Fetch api error');
      });
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex:1}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.container}>
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
                  if (text) {
                    setText(text);
                  }
                }}
                onFocus={() => {
                  setFocus(true);
                }}
                style={styles.cancelImage}
              />
            </View>
            {focus ? (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setFocus(false);
                  setText('');
                  Keyboard.dismiss();
                }}>
                <Image
                  source={images.ic_close}
                  style={{width: Sizes.s25, height: Sizes.s25}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : null}
          </View>
          {!focus && (
            <View>
              <Banner />
              {category && (
                <View>
                  <CategoryFilter
                    categories={category}
                    categoryFilter={() => {}}
                    active={active}
                    setActive={setActive}
                  />
                </View>
              )}
            </View>
          )}

          {focus ? (
            <FlatList
              data={productList}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => <ListItem 
              onPress={() => {
                navigation.navigate('detail', {id: item.id});
              }}
              {...item} />}
            />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              key={'grid'}
              numColumns={2}
              data={productList}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <CardItem
                  {...item}
                  marginRight={
                    index === productList.length - 1 &&
                    productList.length % 2 != 0
                      ? Sizes.s50
                      : null
                  }
                  onPress={() => {
                    navigation.navigate('detail', {id: item.id});
                  }}
                  // onPressAdd={() => {
                  //   props.addToCart(item);
                  // }}
                />
              )}
            />
          )}

          {/* <View>
         <Text>No results found</Text>
       </View> */}
        </View>
      )}
    </View>
  );
};

export default ProductList;

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
});
