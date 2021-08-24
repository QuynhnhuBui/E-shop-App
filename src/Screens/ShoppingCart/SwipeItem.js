import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';

var screen = Dimensions.get('window');

export const SwipeItem = props => {
  const scrollRef = useRef();
  const index = props.index;
  const indexScroll = props.indexScroll;
  const setIndexScroll = props.setIndexScroll;
  useEffect(() => {
    if (index !== indexScroll) {
      scrollRef.current.scrollTo({y: 0, animated: true});
    }
  }, [indexScroll]);
  const {name, price, image} = props;
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
        onScrollBeginDrag={() => setIndexScroll(index)}>
        <View
          onPress={() => {
            setIndexScroll('');
          }}
          style={styles.container}>
          <View style={styles.swipe}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={{uri: image ? image : null}}
            />
            <View style={styles.text}>
              <Text>{name}</Text>
              <Text>{price}$</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.leftAction}
          onPress={() => {
            setIndexScroll('');
          }}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default SwipeItem;
const styles = StyleSheet.create({
  leftAction: {
    width: Sizes.s200,
    //height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Sizes.s20,
    backgroundColor: '#E8E8E8',
    marginBottom: Sizes.s15,
    marginTop: Sizes.s15,
    marginRight: Sizes.s30,
  },
  container: {
    flex: 1,
    marginHorizontal: Sizes.s30,
    width: Dimensions.get('screen').width - Sizes.s60,
    backgroundColor: '#fff',
    borderRadius: Sizes.s20,
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: Sizes.s2,
  },
  image: {
    width: Sizes.s160,
    height: Sizes.s160,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Sizes.s15,
    alignItems: 'center',
    flex: 1,
  },
  swipe: {
    flexDirection: 'row',
    paddingHorizontal: Sizes.s20,
  },
});
