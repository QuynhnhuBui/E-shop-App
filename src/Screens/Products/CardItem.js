import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';

const CardItem = props => {
    const {name, image, price, countInStock, marginRight} = props;
    return (
      <TouchableOpacity style={{...styles.card, marginRight: marginRight}}>
        <View>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{uri: image ? image : null}}
          />
          <View style={{padding: Sizes.s20, alignItems: 'center'}}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>${price}</Text>
            {countInStock > 0 ? (
              <TouchableOpacity style={styles.addButton}>
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
  const styles = StyleSheet.create({
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
  export default CardItem