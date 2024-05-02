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
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    padding: 20,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 20,
  }
});
