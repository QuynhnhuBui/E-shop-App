import React, {useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native';
import {Sizes} from '@dungdang/react-native-basic';
import images from '../../res/images/index';
import Banner from './Banner';
import CategoryFilter from './CategoryFilter';
import ListItem from './ListItem';
import CardItem from './CardItem';
const data = require('../../data/products.json');
const categories = require('../../data/categories.json');

const ProductList = props => {
  const [productList, setList] = useState([]);
  const [focus, setFocus] = useState(false);
  const [searchText, setText] = useState('');
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState('-1');
  const [initialState, setInitialState] = useState([]);
  const navigation = useNavigation();
  const loadData = () => {};
  const loadMore = () => {};
  return (
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

          <View>
            <CategoryFilter
              categories={categories}
              categoryFilter={() => {}}
              active={active}
              setActive={setActive}
            />
          </View>
        </View>
      )}

      {focus ? (
        <FlatList
          data={data}
          renderItem={({item, index}) => <ListItem {...item} />}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          key={'grid'}
          numColumns={2}
          data={data}
          renderItem={({item, index}) => (
            <CardItem
              {...item}
              marginRight={
                index === data.length - 1 && data.length % 2 != 0
                  ? Sizes.s50
                  : null
              }
              onPress={() => {
                navigation.navigate('detail');
              }}
              onPressAdd={() => {
                props.addToCart(item);
              }}
            />
          )}
        />
      )}

      {/* <View>
         <Text>No results found</Text>
       </View> */}
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
