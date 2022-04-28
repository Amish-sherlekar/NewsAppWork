import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  NativeBaseProvider
} from "native-base"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from "twrnc"
import ThemeToggle from '../theme-toggle';

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

const CustomDrawer = props => {

  const goBack = () => {
    props.navigation.goBack()
  };

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ height: windowHeight - 10 }}
        >
          <ImageBackground source={require('../assets/images/bg2.jpg')} style={{ width: windowWidth - 10, height: 400, bottom: 10 }}>
            <Feather name='chevron-left' size={30} onPress={() => { goBack() }} color='#fff' style={[styles.backIcon, tw`bg-indigo-400`]} />
          </ImageBackground>


          <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: -80 }}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
        <TouchableOpacity 
        style={styles.signUpSyle}
        onPress={() => props.navigation.navigate('LogInScreen')}
        >
          <Ionicons name='exit' size={45} color={'#808080'} />
          <Text style={{
            fontSize: 20,
            fontFamily: 'Fira Code iScript',
            color: '#808080',
            marginLeft: 10,
            marginTop: 10,
          }}>SignUp</Text>
        </TouchableOpacity>

      </View>
    </NativeBaseProvider>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  backIcon: {
    position: 'relative',
    left: windowWidth / 2 + 120,
    top: 6,
    borderRadius: 10,
    padding: 5,
  },
  signUpSyle: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    height: 60,
    flexDirection: 'row'
  }
})