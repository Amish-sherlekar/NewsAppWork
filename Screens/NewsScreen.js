import React, { Component, useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Linking, 
  ImageBackground,
  Dimensions,
  StyleSheet,
  Modal,
} from 'react-native';
import {
  Pressable,
  Box,
  NativeBaseProvider,
  Center
} from "native-base"
import { Ionicons, Feather } from "@expo/vector-icons"
import Carousel from 'react-native-snap-carousel';
import tailwind from "tailwind-rn";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: '',
      index: 0,
    };
  }

  getNews = async () => {
    var url =
      'https://saurav.tech/NewsAPI/top-headlines/category/general/in.json';
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

  componentDidMount() {
    this.getNews();
  }

  render() {
    if (this.state.article === '') {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading....</Text>
        </View>
      );
    } else {
      return (
        <NativeBaseProvider >
          <Center
            bg={'darkBlue.700'}
          >
            <Carousel
              layout='stack'
              data={this.state.article.articles}
              sliderHeight={windowHeight}
              itemHeight={windowHeight}
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