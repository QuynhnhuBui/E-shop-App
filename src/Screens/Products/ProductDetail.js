import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import url from '../../common/baseUrl';
import Toast from 'react-native-simple-toast';

const ProductDetail = props => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const id = props.route.params.id;
  useFocusEffect(
    useCallback(() => {
      getProductDetail(id);
    }, []),
  );
  const getProductDetail = id => {
    axios
      .get(`${url}products/getProduct/${id}`)
      .then(res => {
        if (res.data.success == true) {
          setProduct(res.data.product);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log('Fetch api error');
      });
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView>
            <View style={{marginHorizontal: Sizes.s30}}>
              <Image
                source={{uri: product.image ? product.image : null}}
                style={styles.image}
                resizeMode="contain"
              />
              <View style={styles.text}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.brand}>{product.brand}</Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottomContainer}>
            <Text style={styles.price}>${product.price}</Text>
            <TouchableOpacity
              disabled={product.countInStock > 0 ? false : true}
              onPress={() => {
                props.addToCart(product.id);
                Toast.showWithGravity('Added to cart', Toast.SHORT, Toast.TOP);
              }}
              style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: Sizes.s340,
    height: Sizes.s340,
    alignSelf: 'center',
  },
  text: {
    marginVertical: Sizes.s30,
  },
  name: {
    fontSize: Sizes.s50,
    paddingVertical: Sizes.s10,
  },
  brand: {
    fontSize: Sizes.s40,
    paddingVertical: Sizes.s10,
  },
  price: {
    fontSize: Sizes.s40,
    paddingVertical: Sizes.s20,
    color: '#EB5757',
    fontWeight: '700',
  },
  addButton: {backgroundColor: '#ff6600'},
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    padding: Sizes.s30,
    textAlignVertical: 'center',
    fontSize: Sizes.s30,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Sizes.s30,
    alignItems: 'center',
  },
});
export default ProductDetail;
