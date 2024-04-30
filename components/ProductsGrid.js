import { FlatList, View, Text, Image, StyleSheet } from 'react-native';

// Products Grid Component
const ProductsGrid = ({ products }) => {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <View style={styles.productItem}>
          <Text>{item.name}</Text>
          <Image source={{ uri: item.image }} style={styles.productImage} />
        </View>
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  productItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center'
  },
  productImage: {
    width: 100,
    height: 100
  }
});

export default ProductsGrid;