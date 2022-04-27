import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { Component, useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  ImageBackground,
  Linking,
  ToastAndroid,
  Alert
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { NewsCategory, NewsSources } from '../NewsProps';
import Headlines from '../NewsScreen/Headlines';
import tw from "twrnc"
import { StatusBar } from 'expo-status-bar';
import { Box, Center, IconButton, NativeBaseProvider, Pressable } from 'native-base';
import { StaggerComponent } from '../components/Stagger';

const windowWidth = Dimensions.get('window').width;

var bg;
var welcomeMessage;

export default class ExploreScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      article: '',
    }
  }

  getNews = async () => {
    //change latitude and longitude  
    var url =
      'https://saurav.tech/NewsAPI/top-headlines/category/general/in.json';
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ article: responseJson });
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
        <View>
          <Text>Loading...</Text>
        </View>
      )
    } else {
      return (
        <NativeBaseProvider>
          <SafeAreaView>
            <StatusBar style="dark" />
            <Center
              bg={'darkBlue.700'}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.openDrawer()
                }}
                style={{
                  position: 'absolute',
                  top: 15,
                  left: RFValue(10),
                  zIndex: 100,
                }}
              >
                <Ionicons name='menu' size={55} />
              </TouchableOpacity>
              <TouchableOpacity
              style={{
                position: 'absolute',
                top:405,
                left: RFValue(10),
                zIndex: 100,
              }}
              >
                <StaggerComponent />
              </TouchableOpacity>
              
              <ScrollView
                style={styles.scrollContainer}
              >

                <View>
                  <View>
                    <Text style={styles.categoryText}>Category</Text>
                  </View>
                  <FlatList
                    keyExtractor={(element) => element.id}
                    data={NewsCategory}
                    renderItem={(element) => {
                      return (
                        <View
                          style={{ marginTop: 100, marginLeft: 30, left: 50 }}
                        >
                          <Pressable
                            style={styles.cardContainer}
                            onPress={() => {
                              this.props.navigation.navigate(element.item.type);
                            }}
                            bg={'darkBlue.700'}
                            shadow={9}
                          >
                            <Center>

                              <Image
                                source={{ uri: element.item.image }}
                                style={styles.imageStyle}
                              />
                            </Center>
                            <Text style={styles.textStyle}>{element.item.type}</Text>
                          </Pressable>
                        </View>
                      );
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
                <Text
                  style={styles.topHeadlinesStyle}
                >Top HeadLines</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', bottom: 35 }}>
                  <Headlines data={this.state.article.articles[0]} />
                  <Headlines data={this.state.article.articles[1]} />
                  <Headlines data={this.state.article.articles[2]} />
                </ScrollView>
                <Text style={styles.sourceText}>Sources</Text>
                <FlatList
                  keyExtractor={(element) => element.id}
                  data={NewsSources}
                  renderItem={(element) => {
                    return (
                      <View style={{ left: 60, paddingLeft: 20 }}>
                        <TouchableOpacity
                          style={styles.sourceCardContainer}
                          onPress={() => {
                            navigation.navigate(element.item.id);
                          }}>
                          <Image
                            source={{ uri: element.item.pic }}
                            style={styles.sourceImageStyle}
                          />
                          <Text style={styles.sourceTextStyle}>
                            {element.item.name}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  style={{ margin: 10 }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />

              </ScrollView>
            </Center>
          </SafeAreaView>
        </NativeBaseProvider>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingTop: 10,
    height: '100%',
  },
  cardContainer: {
    top: -70,
    width: 250,
    height: 300,
    borderRadius: 20,
  },
  imageStyle: {
    width: '90%',
    height: 200,
    marginTop: 6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textStyle: {
    marginTop: 10,
    fontSize: RFValue(25),
    fontFamily: 'Fira Code iScript',
    textAlign: 'center',
    color: 'white',
  },
  sourceCardContainer: {
    backgroundColor: '#F5F5f1',
    width: 250,
    height: 270,
    borderRadius: 20,
    top: 10
  },
  sourceTextStyle: {
    marginLeft: 20,
    fontSize: 35,
    fontFamily: 'Fira Code iScript',
    // fontWeight: "900",
    marginTop: -10,
  },
  sourceImageStyle: {
    marginLeft: 10,
    marginTop: 10,
    width: 220,
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  categoryText: {
    paddingTop: -100,
    marginLeft: 75,
    fontSize: RFValue(25),
    fontFamily: 'Fira Code iScript',
    borderRadius: 10,
    top: 20
  },
  sourceText: {
    paddingTop: -40,
    marginLeft: 30,
    fontSize: RFValue(25),
    fontFamily: 'Fira Code iScript',
    borderRadius: 20,
    width: 230,
    left: 70,
    top: 30
  },
  topHeadlinesStyle: {
    fontSize: RFValue(25),
    marginTop: 2,
    marginLeft: RFValue(20),
    color: '#fff',
    fontFamily: 'Fira Code iScript',
    left: 50,
    color: 'black',
    bottom: 40
  }
})