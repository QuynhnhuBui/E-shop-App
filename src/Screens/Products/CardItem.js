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
      <TouchableOpacity 
      style={{...styles.card, marginRight: marginRight}}
      onPress={props.onPress}
      >
        <View>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{uri: image ? image : null}}
          />
          <View style={{padding: Sizes.s20, alignItems: 'center'}}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>${price}</Text>
            {/* {countInStock > 0 ? (
              <TouchableOpacity 
              onPress={()=>{
                props.onPressAdd()
              }}
              style={styles.addButton}>
                <Text style={{color:'#fff', fontWeight:'700'}}>Add</Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text>Out of Stock</Text>
              </View>
            )} */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    addButton: {
      backgroundColor: '#ff6600',
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
      elevation: Sizes.s7
    },
    name: {
      fontWeight: '700',
      paddingVertical: Sizes.s10,
    },
    price: {
      color: '#ff6600',
      fontWeight: '700',
      paddingVertical: Sizes.s10,
    },
    image: {
      width: Sizes.s100,
      height: Sizes.s100,
      alignSelf: 'center',
    },

  });
  CardItem.defaultProps= {
    onPress: ()=>{},
    onPressAdd :()=>{}
  }
  // export default connect(null, mapDispatchToProps)(CardItem);
  export default CardItem