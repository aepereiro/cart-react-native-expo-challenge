import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

import { API_URL } from '@env';

import NavBar from './components/NavBar';
import GreetingSearch from './components/GreetingSearch';
import ProductsGrid from './components/ProductsGrid';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState('All');
  const categories = ['All', 'Beer', 'Wine'];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on the selected category index
    if (selectedIndex === 0) { // All products
      setFilteredProducts(products);
    } else {
      const category = categories[selectedIndex];
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  }, [selectedIndex, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const json = await response.json();
      setProducts(json);
      setFilteredProducts(json); // initially set all products
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  return (
    <View style={styles.container}>
      <NavBar />
      <GreetingSearch userName="Mr. Michael" />
      <Text style={styles.selector}>Drink Category</Text>
      <SegmentedControl
        values={['All', 'Beer', 'Wine']}
        selectedIndex={0}

        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />
      <Text style={styles.gridTitle}>Populer</Text>
      <ProductsGrid products={filteredProducts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selector: {
      fontSize: 24,
      display: 'flex',
      alignSelf: 'flex-start',
      padding: 40,
      fontWeight: 'bold',
      color: '#000',
  },
  gridTitle: {
    fontSize: 24,
    display: 'flex',
    alignSelf: 'flex-start',
    padding: 40,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default App;