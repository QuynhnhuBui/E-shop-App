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
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView >
      <View style={{marginHorizontal: Sizes.s30}}>
        <Image
          style={{
            backgroundColor: 'red',
            width: Sizes.s340,
            height: Sizes.s340,
            alignSelf: 'center',
          }}
        />
        <View style={{marginVertical: Sizes.s30}}>
          <Text style={{fontSize: Sizes.s50, paddingVertical: Sizes.s10}}>
            {'item.name'}
          </Text>
          <Text style={{fontSize: Sizes.s30, paddingVertical: Sizes.s10}}>
            {'item.brand'}
          </Text>
        </View>

       
      </View>
    </ScrollView>
    <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
           marginHorizontal: Sizes.s30,
           backgroundColor:'yellow',
           alignItems:'center'
          }}>
          <Text
            style={{
              fontSize: Sizes.s40,
              paddingVertical: Sizes.s20,
              color: '#EB5757',
              fontWeight: '700',
            }}>
            {'item.price'}
          </Text>
          <TouchableOpacity 
          onPress={()=>{}}
          style={{backgroundColor:'red'}}>
            <Text style={{color:'#fff',  fontWeight:'700', padding: Sizes.s30, textAlignVertical:'center', fontSize: Sizes.s30}}>Add</Text>
          </TouchableOpacity>
        </View>
    </View>
    
  );
};
const styles = StyleSheet.create({});
export default ProductDetail;
