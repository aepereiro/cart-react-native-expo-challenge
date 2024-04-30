import { View, Text, TextInput, StyleSheet } from 'react-native';

// Greeting and Search Bar Component
const GreetingSearch = ({ userName }) => {
    return (
      <View>
        <Text>Hi, {userName}</Text>
        <Text>Welcome Back!</Text>
        <TextInput placeholder="Search burger, pizza, drink or etc.." style={styles.searchInput} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    searchInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10
    }
  });

export default GreetingSearch;