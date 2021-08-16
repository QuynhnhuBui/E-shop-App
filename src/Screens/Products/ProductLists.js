import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  Keyboard
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import images from '../../res/images/index';
import Banner from './Banner'
const data = require('../../data/products.json');

const ProductList = () => {
  const [productList, setList] = useState([]);
  const [focus, setFocus] = useState(false);
  const [searchText, setText] = useState('')
  const loadData = () => {};
  const loadMore = () => {};
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          borderRadius: Sizes.s20,
          backgroundColor: '#a9a9a9',
          marginHorizontal: Sizes.s30,
          flexDirection: 'row',
          alignItems: 'center',
        }}>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            resizeMode="contain"
            source={images.ic_search}
            style={{
              width: Sizes.s30,
              height: Sizes.s30,
              marginHorizontal: Sizes.s15,
            }}
          />
          <TextInput
            placeholder="Search"
            onChangeText={text => {
              if (text.trim()){
                setText(text)
              }
            }}
            onFocus={() => {
              setFocus(true);
            }}
           
            style={{paddingVertical: Sizes.s15, width: '80%'}}
            value={searchText}
          />
        </View>
        {focus ? (
          <TouchableOpacity
            style={{padding: Sizes.s20, marginRight: Sizes.s10}}
            onPress={()=>{
              setFocus(false)
              setText('')
              Keyboard.dismiss()
            }}
            >
            <Image
              source={images.ic_close}
              style={{width: Sizes.s25, height: Sizes.s25}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <Banner/>
      {focus ? (
        <FlatList
          data={data}
          renderItem={({item, index}) => <ListItem {...item} />}
        />
      ) : (
        <FlatList
          key={'grid'}
          numColumns={2}
          data={data}
          renderItem={({item, index}) => (
            <ProductCard
              {...item}
              marginRight={
                index === data.length - 1 && data.length % 2 != 0
                  ? Sizes.s50
                  : null
              }
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

const ProductCard = props => {
  const {name, image, price, countInStock, marginRight} = props;
  return (
    <TouchableOpacity style={{...style.card, marginRight: marginRight}}>
      <View>
        <Image
          style={style.image}
          resizeMode="contain"
          source={{uri: image ? image : null}}
        />
        <View style={{padding: Sizes.s20, alignItems: 'center'}}>
          <Text style={style.name}>{name}</Text>
          <Text style={style.price}>${price}</Text>
          {countInStock > 0 ? (
            <TouchableOpacity style={style.addButton}>
              <Text>Add</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Text>Out of Stock</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
const ListItem = props => {
  const {name, image, price, countInStock} = props;
  return (
    <TouchableOpacity
      style={{borderBottomWidth: 1, borderBottomColor: '#dcdcdc'}}>
      <View style={{flexDirection: 'row', padding: Sizes.s20}}>
        <Image
          style={{...style.image, marginRight: Sizes.s30}}
          resizeMode="contain"
          source={{uri: image ? image : null}}
        />
        <View>
          <Text style={style.name}>{name}</Text>
          <Text style={style.price}>${price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  addButton: {
    backgroundColor: '#8fbc8f',
    padding: Sizes.s20,
    marginHorizontal: Sizes.s100,
    alignItems: 'center',
  },
  outOfStockView: {
    backgroundColor: '#a9a9a9',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: Sizes.s10,
    margin: Sizes.s20,
    width: '100%',
    flex: 0.5,
    alignContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.5 * Sizes.s5},
    shadowOpacity: 0.4,
    shadowRadius: 0.8 * Sizes.s5,
  },
  name: {
    fontWeight: '700',
    paddingVertical: Sizes.s10,
  },
  price: {
    color: '#ffd700',
    fontWeight: '700',
    paddingVertical: Sizes.s10,
  },
  image: {
    width: Sizes.s100,
    height: Sizes.s100,
    alignSelf: 'center',
  },
});
