import { View, Text, TextInput, StyleSheet } from 'react-native';

// Greeting and Search Bar Component
const GreetingSearch = ({ userName }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.h3}>Hi, {userName}</Text>
        <Text style={styles.h1}>Welcome Back!</Text>
        <TextInput placeholder="Search burger, pizza, drink or etc.." style={styles.searchInput} />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
    },
    h3: {
        fontSize: 16,
        color: '#aaa',
    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    searchInput: {
        height: 40,
        color: '#aaa',
        backgroundColor: '#fbfbfb',
        borderWidth: 0,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 30,
        marginTop: 10,
    }
});

export default GreetingSearch;