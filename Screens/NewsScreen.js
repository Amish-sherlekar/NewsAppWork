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
  useColorModeValue,
  Center
} from "native-base"
import { Ionicons, Feather } from "@expo/vector-icons"
import tw from "twrnc"
import ThemeToggle from '../theme-toggle';
import theme from '../theme';

export default class NewsScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      article: '',
      setModalVisible: false,
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

  componentDidMount(){
    this.getNews();
    this.setState({
      setModalVisible: true,
    })
  }

  render() {
  if (this.state.article === '') {
    return (
      <NativeBaseProvider theme={theme}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading....</Text>
        </View>
      </NativeBaseProvider>
    );
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        {/* <Modal
          visible={this.state.setModalVisible}
          animationType="slide"
        > */}
          <Center
            bg={'darkBlue.700'}    
          >
            <FlatList
              key={this.state.article.articles.title}
              keyExtractor={(item, index) => index.toString()}
              data={this.state.article.articles}
              renderItem={({ item }) => (
                <Box
                  style={styles.newsContainer}
                  bg={'darkBlue.700'}
                  shadow={9}
                >
                  <Pressable
                    onPress={() => Linking.openURL(item.url)}
                  >
                    <Image source={{ uri: item.urlToImage }} style={{ width: 350, height: 200, borderTopLeftRadius: 30, borderTopRightRadius: 30 }} />
                    <Text style={tw`text-base text-center font-bold`}>{item.title.slice(0, 65) + "..."}</Text>
                    <Text style={tw`font-semibold text-sm text-center text-blue-600`}>{item.description.slice(0, 125) + "..."}</Text>
                  </Pressable>
                </Box>
              )}
            />
          </Center>
        {/* </Modal> */}
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
    top: 20
  },
  backIcon: {
    borderRadius: 30,
    width: 35,
    top: 10,
  }
})