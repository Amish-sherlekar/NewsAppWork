import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, Linking, Modal } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import tw from "twrnc"
import { Box, Center, NativeBaseProvider, Pressable } from 'native-base';
import theme from '../../theme';

export default class GoogleNews extends Component {
  constructor() {
    super();
    this.state = {
      article: '',
    };
  }

  getNews = async () => {
    var url = 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=a1cacd357bb146d2a946022b95be617b';
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
    if (this.state.article === '') {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading....</Text>
        </View>
      );
    } else {
      return (
        <NativeBaseProvider theme={theme}>
          <Modal
            visible={true}
            animationType="slide"
          >
            <Center
              _dark={{ bg: 'blue.400' }}
              _light={{ bg: 'lightBlue.800' }}
            >
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Home_')
              }}>
                <Ionicons name='arrow-back' size={30} />
              </TouchableOpacity>
              <FlatList
                key={this.state.article.articles.title}
                keyExtractor={(item, index) => index.toString()}
                data={this.state.article.articles}
                renderItem={({ item }) => (
                  <Box
                    style={styles.newsContainer}
                    _dark={{ bg: 'blue-600' }}
                    _light={{ bg: 'lightBlue.700' }}
                    shadow={7}
                  >
                    <Pressable
                      onPress={() => Linking.openURL(item.url)}
                    >
                      <Image source={{ uri: item.urlToImage }} style={{ width: '100%', height: 200, borderTopLeftRadius: 30, borderTopRightRadius: 30 }} />
                      <Text style={tw`text-base text-center font-bold`}>{item.title.slice(0, 75) + "..."}</Text>
                      <Text style={tw`font-semibold text-sm text-center text-blue-900 px-5`}>{item.description.slice(0, 200) + "..."}</Text>
                    </Pressable>
                  </Box>
                  // <View style={{ flex: 1, flexDirection: 'column', margin: 10, padding: 10, backgroundColor: '#d3d3', borderRadius: 30 }}>
                  //   <TouchableOpacity
                  //     onPress={() => Linking.openURL(item.url)}
                  //   >
                  //     <Image source={{ uri: item.urlToImage }} style={{ width: 350, height: 200, borderTopLeftRadius: 30, borderTopRightRadius: 30 }} />
                  //     <Text style={{ fontSize: 20, color: 'white' }}>{item.title}</Text>
                  //     <Text style={{ fontSize: 15, color: 'white' }}>{item.description}</Text>
                  //   </TouchableOpacity>
                  // </View>
                )}
              />
            </Center>
          </Modal>
        </NativeBaseProvider>
      )
    }
  }
}

// https://saurav.tech/NewsAPI/everything/cnn.json