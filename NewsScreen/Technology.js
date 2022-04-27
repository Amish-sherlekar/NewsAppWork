import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, Linking, StyleSheet, Modal } from 'react-native';
import { Ionicons, Feather } from "@expo/vector-icons"
import tw from "twrnc"
import { Box, Center, NativeBaseProvider, Pressable } from 'native-base';
import theme from '../theme';

export default class TechnologyScreen extends Component {
  constructor() {
    super();
    this.state = {
      article: '',
    };
  }

  getNews = async () => {
    //change latitude and longitude
    var url = 'https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json';
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
          }}
            style={[tw`bg-blue-300`, styles.backIcon]}
          >
            <Feather name='chevron-left' size={30} />
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
            )}
          />
            </Center>
          </Modal>
        </NativeBaseProvider>
      )
    }
  }
}

const styles = StyleSheet.create({
  newContainer: {
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
    left: 10
  }
})