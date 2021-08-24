import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';

const ProductDetail = props => {
  return (
    <View style={styles.container}>
      <ScrollView >
      <View style={{marginHorizontal: Sizes.s30}}>
        <Image
          style={styles.image}
        />
        <View style={styles.text}>
          <Text style={styles.name}>
            {'item.name'}
          </Text>
          <Text style={styles.brand}>
            {'item.brand'}
          </Text>
        </View>

       
      </View>
    </ScrollView>
    <View
          style={styles.bottomContainer}>
          <Text
            style={styles.price}>
            {'item.price'}
          </Text>
          <TouchableOpacity 
          // disabled={countInStock>0 ? true : false}
          onPress={()=>{}}
          style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
    </View>
    
  );
};
const styles = StyleSheet.create({
  container:{
    flex: 1, backgroundColor: '#fff'
  },
  image:{
    backgroundColor: 'red',
    width: Sizes.s340,
    height: Sizes.s340,
    alignSelf: 'center',
  },
  text:{
    marginVertical: Sizes.s30
  },
  name:{
    fontSize: Sizes.s50, paddingVertical: Sizes.s10
  },
  brand:{
    fontSize: Sizes.s50, paddingVertical: Sizes.s10
  },
  price:{
    fontSize: Sizes.s40,
    paddingVertical: Sizes.s20,
    color: '#EB5757',
    fontWeight: '700',
  },
  addButton:{backgroundColor:'red'},
  addButtonText:{color:'#fff',  fontWeight:'700', padding: Sizes.s30, textAlignVertical:'center', fontSize: Sizes.s30},
  bottomContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
   marginHorizontal: Sizes.s30,
   backgroundColor:'yellow',
   alignItems:'center'
  }
});
export default ProductDetail;
