import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';

const ListItem = props => {
  const {name, image, price, countInStock} = props;
  return (
    <TouchableOpacity
      style={styles.button}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{uri: image ? image : null}}
        />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    marginRight: Sizes.s30
  },
  button:{
    borderBottomWidth: 1, borderBottomColor: '#dcdcdc'
  },
  container:{
    flexDirection: 'row', padding: Sizes.s20
  }
});

export default ListItem;
