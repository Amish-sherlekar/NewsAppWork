import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, Linking, StatusBar, SafeAreaView, StyleSheet, Modal, Dimensions } from 'react-native';
import { Ionicons, Feather } from "@expo/vector-icons"
import tailwind from "tailwind-rn"
import { Box, Center, NativeBaseProvider, Pressable } from 'native-base';
import Carousel from 'react-native-snap-carousel';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class BusinessScrenn extends Component {
  constructor() {
    super();
    this.state = {
      article: '',
      index: 0,
    };
  }

  getNews = async () => {
    //change latitude and longitude
    var url = 'https://saurav.tech/NewsAPI/top-headlines/category/business/in.json';
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          article: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount = () => {
    this.getNews();
  };

  render() {
    this.getNews();
    if (this.state.article === '') {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading....</Text>
        </View>
      );
    } else {
      return (
        <NativeBaseProvider >
          <Modal
            visible={true}
            animationType="slide"
          >
            <Center
              _dark={{ bg: 'blue.400' }}
              _light={{ bg: 'lightBlue.800' }}
            >
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('HomeScreen')
              }}
                style={[tailwind('bg-blue-300'), styles.backIcon]}
              >
                <Feather name='chevron-left' size={30} />
              </TouchableOpacity>

              <Carousel
              layout='stack'
              data={this.state.article.articles}
              sliderHeight={windowHeight}
              itemHeight={windowHeight - 50}
              vertical={true}
              renderItem={({ item, index }) => (
                <Box
                  style={styles.newsContainer}
                  bg={'darkBlue.700'}
                  shadow={9}
                >
                  <Pressable
                    onPress={() => Linking.openURL(item.url)}
                  >
                    <Image source={{ uri: item.urlToImage }} style={styles.imageStyle} />
                    <Text style={tailwind("text-base text-center font-black")}>{item.title}</Text>
                    <Text style={tailwind("font-semibold text-sm text-center text-blue-600")}>{item.description}</Text>
                  </Pressable>
                </Box>
              )}
            onSnapToItem={(index) => this.setState({ index: index })}
            loop={true}
            />
            </Center>
          </Modal>
        </NativeBaseProvider>
      )
    }
  }
}

const styles = StyleSheet.create({
  newsContainer: {
      flex: 1,
      flexDirection: 'column',
      margin: 10,
      padding: 10,
      borderRadius: 30,
      top: 20,
      height: 30
  },
  backIcon: {
      borderRadius: 30,
      width: 35,
      top: 10,
  },
  imageStyle: {
      width: 350,
      height: 200,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30
  }
})