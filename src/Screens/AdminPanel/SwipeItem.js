import {NoItem} from '../message/custom';
// import {Colors, Images, Sizes, Strings} from '../../res';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {elevationShadowStyle} from '../message/custom/Functions';
import React, {Component, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
var screen = Dimensions.get('window');
import {Sizes} from '@dungdang/react-native-basic';

const SwipeItem = props => {
  const [indexScroll, setIndexScroll] = useState('');

  const renderItem = ({item, index}) => {
      console.log(444, index)
    return (
      <ItemList
        {...props}
        item={item}
        index={index}
        indexScroll={indexScroll}
        setIndexScroll={value => setIndexScroll(value)}
      />
    );
  };
  return (
    <View style={{flex: 1,}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={props.data}
        // onRefresh={() => props.onRefresh()}
        refreshing={false}
        onEndReached={props.onLoadMore}
        onEndReachedThreshold={0.1}
        renderItem={renderItem}
        onScroll={() => setIndexScroll('')}
        removeClippedSubviews={true}
       
      />
    </View>
  );
};

export const ItemList = props => {
  const scrollRef = useRef();
  const index = props.index; 
  const setIndexScroll = props.setIndexScroll;
  const item = props.item;
  const indexScroll = props.indexScroll; 

  useEffect(() => {
    if (index !== indexScroll) {
        scrollRef.current.scrollTo({  y: 0, animated: true });
    }
  }, [indexScroll]);

  return (
    <View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        snapToInterval={screen.width}
        scrollEventThrottle={16}
        snapToAlignment={'center'}
        pagingEnabled
        ref={scrollRef}
        onScrollBeginDrag={() => setIndexScroll(index)}
        >
        <TouchableOpacity
          onPress={() => {
            setIndexScroll('');
          }}
          style={{
            flex: 1,
            marginHorizontal: Sizes.s30,
            flexDirection: 'column',
            width: Dimensions.get('screen').width - Sizes.s60,
            marginVertical: Sizes.s15,
            backgroundColor: '#fff',
            borderRadius: Sizes.s20,
            paddingHorizontal: Sizes.s30,
            paddingVertical: Sizes.s30,
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 0.5 * Sizes.s5},
            shadowOpacity: 0.4,
            shadowRadius: 0.8 * Sizes.s5,
            elevation: Sizes.s7,
          }}>
              <View style={{flexDirection:'row', }}>
              <Image
          style={styles.image}
          resizeMode="contain"
          source={{uri: item.image ? item.image : null}}
          // source={{uri: 'http://nhu-eshop-server.herokuapp.com/public/images/iphone11-green.jpg-1630351810858.jpeg'}}
        />
        <View>
          <Text
              style={{
                fontSize: Sizes.h30,
                fontWeight: '500',
              }}>
              {`Name: ${item.name}`}
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: Sizes.h30,
                fontWeight: '500',
                fontStyle: 'italic',
              }}>
              {`Brand: ${item.brand}`}
            </Text>
            <Text
              style={{
              
                fontSize: Sizes.h30,
                fontWeight: '500',
              }}>
              {`Price: ${item.price}`}
            </Text>
            <Text
              style={{
              
                fontSize: Sizes.h30,
                fontWeight: '500',
              }}>
              {`Category: ${item.category.name}`}
            </Text>
          </View>
              </View>
          
            
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.leftAction}
          onPress={() => {
            setIndexScroll('');
           
            
          }}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.leftAction}
          onPress={() => {
            setIndexScroll('');
            props.onPressDel(item.id)
          }}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default SwipeItem;
const styles = StyleSheet.create({
  title: {
    fontSize: Sizes.h36,
    fontFamily: 'SanFranciscoText-Medium',
    color: '#0070D1',
    marginBottom: Sizes.h24,
    flex: 1,
    height: '100%',
  },

  name: {
    fontSize: Sizes.h32,
    fontFamily: 'SanFranciscoText-SemiBold',
  },
  icon: {
    width: Sizes.h48,
    height: Sizes.h48,
  },
  leftAction: {
    width: Sizes.s120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Sizes.s20,
    backgroundColor: '#E8E8E8',
    marginBottom: Sizes.s15,
    marginTop: Sizes.s15,
    marginRight: Sizes.s20,
  },
  image: {
    width: Sizes.s140,
    height: Sizes.s140,
    alignSelf: 'center',
    marginRight: Sizes.s30,
  },
});
