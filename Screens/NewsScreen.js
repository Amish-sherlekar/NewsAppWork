import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import tailwind from "tailwind-rn";
import { Box, Center, NativeBaseProvider, Pressable } from "native-base";
import Carousel from "react-native-snap-carousel";
import { RFValue } from "react-native-responsive-fontsize";
import LottieView from "lottie-react-native";
import * as Speech from "expo-speech";
import { auth, db, firebase } from "../firebase/config";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class NewsScreen extends Component {
  constructor() {
    super();
    this.state = {
      article: "",
      index: 0,
    };
  }

  saveDataToFirebase = async () => {
    db.collection("users")
      .doc(auth.currentUser.email)
      .collection("savedNews")
      .add({
        title: this.state.article.articles[this.state.index].title,
        description: this.state.article.articles[this.state.index].description,
        url: this.state.article.articles[this.state.index].url,
        urlToImage: this.state.article.articles[this.state.index].urlToImage,
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  speakNews = () => {
    const greeting =
      this.state.article.articles[this.state.index].title +
      this.state.article.articles[this.state.index].description;

    const options = {
      voice: "en-in-x-ene-local",
      rate: 0.7,
    };
    Speech.speak(greeting, options);
  };

  getNews = async () => {
    //change latitude and longitude
    var url =
      "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=004228a5cefb4081880996489549f61f";
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
    console.log(this.props.route.params);
  };

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
          <Center _light={{ bg: "lightBlue.700" }}>
            <Carousel
              layout="stack"
              data={this.state.article.articles}
              sliderHeight={windowHeight}
              itemHeight={windowHeight - 100}
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
                this.speakNews();
              }}
              style={styles.micStyle}
            >
              <Ionicons name="volume-high" size={40} color={"#000"} />
            </Pressable>
            <Pressable
              onPress={() => {
                Speech.stop();
              }}
              style={styles.stopStyle}
            >
              <Ionicons name="stop-circle" size={40} color={"#000"} />
            </Pressable>
            <Pressable
              onPress={() => {
                this.saveDataToFirebase();
              }}
              style={styles.saveStyle}
            >
              <Ionicons name="save" size={40} color={"#000"} />
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
    top: windowHeight / 2 - windowHeight / 2,
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
    top: "75%",
    left: windowWidth / 2 - 80,
    position: "absolute",
  },
  stopStyle: {
    top: "75%",
    left: windowWidth / 2 - 20,
    position: "absolute",
  },
  saveStyle: {
    top: "75%",
    left: windowWidth / 2 + 50,
    position: "absolute",
  },
});
