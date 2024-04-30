import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductDetail = ({ route }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchProductData();
        }, 5000);

        fetchProductData();  // Initial fetch

        return () => clearInterval(interval);  // Cleanup interval on component unmount
    }, []);

    const fetchProductData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/product/${productId}`);
            const json = await response.json();
            setProduct(json);
        } catch (error) {
            console.error('Failed to update product data:', error);
        }
    };

    if (!product) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{product.brand}</Text>
            <Text>{product.information}</Text>
            <Text>Stock: {product.stock}</Text>
            <Text>Price: ${product.price / 100}</Text> {/* Assuming price comes in cents */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold'
    }
});

export default ProductDetail;
