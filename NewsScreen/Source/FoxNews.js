import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tailwind from "tailwind-rn";
import { Box, Center, NativeBaseProvider, Pressable } from "native-base";
import Carousel from "react-native-snap-carousel";
import { RFValue } from "react-native-responsive-fontsize";
import LottieView from "lottie-react-native";
import * as Speech from "expo-speech";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class FoxNews extends Component {
  constructor() {
    super();
    this.state = {
      article: "",
      index: 0,
    };
  }

  getNews = async () => {
    var url =
      "https://newsapi.org/v2/top-headlines?sources=fox-news&apiKey=a1cacd357bb146d2a946022b95be617b";
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
    if (this.state.article === "") {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LottieView
            source={require("../../assets/animation/my-favourite-geometric-loader.json")}
            autoPlay
            loop
          />
        </View>
      );
    } else {
      return (
        <NativeBaseProvider>
          <Modal visible={true} animationType="slide">
            <Center _light={{ bg: "lightBlue.700" }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("HomeScreen");
                }}
              >
                <Ionicons name="arrow-back" size={30} />
              </TouchableOpacity>
              <Carousel
                layout="stack"
                data={this.state.article.articles}
                sliderHeight={windowHeight}
                itemHeight={windowHeight * 1.2}
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
                      <Text style={tailwind("text-base text-center font-bold")}>
                        {item.title}
                      </Text>
                      <Text
                        style={tailwind(
                          "font-semibold text-sm text-center text-blue-300"
                        )}
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
          </Modal>
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
    height: 100,
  },
  backIcon: {
    borderRadius: 30,
    width: 35,
    top: 10,
  },
  imageStyle: {
    width: "100%",
    height: "56%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  titleStyle: {
    fontSize: RFValue(12),
    fontFamily: "Lobster-Regular",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
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
