import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import Swiper from 'react-native-swiper';

const Banner = () => {
  const [bannerData, setBanner] = useState([]);
  useEffect(() => {
    setBanner([
      'https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg',
      'https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg',
      'https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg',
    ]);

    return () => {
      setBanner([]);
    };
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.swiper}>
        <Swiper showsButtons={false} autoplay={true} autoplayTimeout={2}>
          {bannerData.map(item => {
            return (
              <Image
                key={item}
                resizeMode="contain"
                source={{uri: item}}
                style={styles.imageBanner}
              />
            );
          })}
        </Swiper>
      </View>
    </ScrollView>
  );
};
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  swiper: {
    width: width,
    alignItems: 'center',
    marginTop: Sizes.s20,
    height: height / 3,
  },
  imageBanner: {
    height: width / 2,
    width: width - Sizes.s80,
    borderRadius: Sizes.s20,
    marginHorizontal: Sizes.s40,
  },
});
export default Banner;
