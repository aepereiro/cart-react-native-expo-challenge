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
  const [selectedIndex, setSelectedIndex] = useState(0);
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
      console.log("response: ", {response})
      const json = await response.json();
      console.log("responseJSON: ", {json})
      setProducts(json);
      setFilteredProducts(json); // initially set all products
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  return (
    <View style={styles.container}>
      <NavBar />
      <GreetingSearch userName="John Doe" />
      <SegmentedControl
        values={categories}
        selectedIndex={selectedIndex}
        onTabPress={setSelectedIndex}
      />
      <Text>Our Products</Text>
      <ProductsGrid products={filteredProducts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;