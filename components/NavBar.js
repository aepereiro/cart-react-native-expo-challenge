import { View, Image, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

// Navigation Bar Component
const NavBar = () => {
  return (
    <View style={styles.navBar}>
      <Entypo name="menu" size={24} color="black" />
      <Image source={require('../assets/icons/Sin título-1.jpg')} style={styles.photo} />
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  photo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  }
});
