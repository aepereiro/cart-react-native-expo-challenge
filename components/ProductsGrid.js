import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { API_URL } from '@env';

import IMAGES from '../assets';

const { width } = Dimensions.get('window');
const ProductsGrid = ({ products }) => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    products.forEach(product => {
      if (product.skus && product.skus.length > 0) {
        fetchPrice(product.skus[0].code, product.id);
      }
    });
  }, [products]);

  const fetchPrice = async (sku, productId) => {
    try {
      const response = await fetch(`${API_URL}/api/stock-price/${sku}`);
      const data = await response.json();
      setPrices(prevPrices => ({
        ...prevPrices,
        [productId]: (data.price / 100).toFixed(2)
      }));
    } catch (error) {
      console.error('Failed to fetch price for SKU:', sku, error);
      setPrices(prevPrices => ({
        ...prevPrices,
        [productId]: 'N/A'
      }));
    }
  };

  const getDefaultImage = () => {
    return IMAGES['defaultImg'];
  };

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <View style={styles.productItem}>
          {/* <Link push href={`/detail/${item.id}`}> */}
          <Text style={styles.title}>{item.brand}</Text>
          <Image
            source={IMAGES[item.image] || getDefaultImage()}
            style={styles.productImage} 
          />
          <View style={styles.bottomRow}>
              <Text style={styles.price}>${prices[item.id] || 'Loading...'}</Text>
              <Entypo name="plus" size={24} color="white" style={styles.icon} />
          </View>
        </View>
      )}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  productItem: {
    display: 'flex',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 24,
    backgroundColor: '#fff',
    width: (width / 2) - 20,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 16,
    display: 'flex',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    padding: 20,
  },
  icon: {
    backgroundColor: 'orange',
    borderRadius: 12,
    padding: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default ProductsGrid;
