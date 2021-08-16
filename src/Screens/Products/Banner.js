import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  Keyboard,
  ScrollView

} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import images from '../../res/images/index';
import Swiper from 'react-native-swiper'
import { withSpring } from 'react-native-reanimated';
const Banner = ()=>{
 const [bannerData, setBanner] = useState([])
 useEffect(()=>{
    setBanner(['https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg', 
    'https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg',
'https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg'])

    return ()=>{
        setBanner([])
    }
 },[])

 return(
     <ScrollView >
         <View style={styles.container}> 
         <View style={styles.swiper}>

             <Swiper
             showsButtons={false}
             autoplay={true}
             autoplayTimeout={2}
             >
                 {bannerData.map((item)=>{
                     return(
                         <Image
                         key={item}
                         resizeMode='contain'
                         source={{uri: item}}
                         style={styles.imageBanner}
                         />
                     )
                 })}
             </Swiper>
             {/* <View style={{height: 20}}></View> */}
         </View>
     </View>
     </ScrollView>
     
 )
}
const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        flex: 1,
      height:  height / 3
    },
    swiper: {
      width: width,
      alignItems: "center",
      marginTop: Sizes.s20,
    },
    imageBanner: {
      height: width / 2,
      width: width - Sizes.s80,
      borderRadius: Sizes.s20,
      marginHorizontal: Sizes.s40,
    },
  });
export default Banner