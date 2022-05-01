import React, { Component, useEffect, useState } from "react";
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
} from "react-native";
import { Pressable, Box, NativeBaseProvider, Center } from "native-base";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import tailwind from "tailwind-rn";
import { RFValue } from "react-native-responsive-fontsize";
import * as Speech from "expo-speech";
import LottieView from "lottie-react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: "",
      index: 0,
    };
  }

  speak = () => {
    const thingToSay = "1";
    Speech.speak(thingToSay);
  };

  getNews = async () => {
    var url =
      "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=a1cacd357bb146d2a946022b95be617b";
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
    if (this.state.article === "") {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#004282",
          }}
        >
          <LottieView
            source={require("../assets/animation/my-favourite-geometric-loader.json")}
            autoPlay
            loop
          />
        </View>
      );
    } else {
      return (
        <NativeBaseProvider>
          <Center bg={"lightBlue.700"}>
            <Carousel
              layout="tinder"
              data={this.state.article.articles}
              sliderHeight={windowHeight}
              itemHeight={windowHeight + 100}
              vertical={true}
              renderItem={({ item, index }) => (
                <Box
                  style={styles.newsContainer}
                  bg={"lightBlue.700"}
                  shadow={9}
                >
                  <Pressable onPress={() => Linking.openURL(item.url)}>
                    <Image
                      source={{ uri: item.urlToImage }}
                      style={styles.imageStyle}
                    />
                    <Text
                      style={[
                        tailwind("text-base text-center"),
                        styles.titleStyle,
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        tailwind("text-sm text-center text-indigo-100"),
                        styles.descriptionStyle,
                      ]}
                    >
                      {item.description}
                    </Text>
                  </Pressable>
                </Box>
              )}
              onSnapToItem={(index) => this.setState({ index: index })}
              loop={true}
            />
            <Pressable
              onPress={() => {
                Speech.speak(
                  this.state.article.articles[this.state.index].title +
                    this.state.article.articles[this.state.index].description
                );
              }}
              style={styles.micStyle}
            >
              <Ionicons name="mic" size={40} color={"#000"} />
            </Pressable>
          </Center>
        </NativeBaseProvider>
      );
    }
  }
}

const styles = StyleSheet.create({
  newsContainer: {
    flex: 0.6,
    flexDirection: "column",
    margin: 10,
    padding: 10,
    borderRadius: 30,
    top: windowHeight / 2 - windowHeight / 2.5,
    height: 150,
  },
  backIcon: {
    borderRadius: 30,
    width: 35,
    top: 10,
  },
  imageStyle: {
    width: "100%",
    height: "50%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  titleStyle: {
    fontSize: RFValue(14),
    fontFamily: "OrelegaOne-Regular",
    color: "#fff",
    textAlign: "center",
    // marginTop: 10,
    marginBottom: 10,
  },
  descriptionStyle: {
    fontSize: RFValue(10),
    fontFamily: "Fira Code iScript",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  micStyle: {
    top: "85%",
    left: windowWidth / 2 - 20,
    position: "absolute",
  },
});
