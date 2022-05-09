import React, { Component, useEffect, useState } from "react";
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
import { Entypo, Ionicons } from "@expo/vector-icons";
import tailwind from "tailwind-rn";
import { Box, Center, NativeBaseProvider, Pressable } from "native-base";
import Carousel from "react-native-snap-carousel";
import { RFValue } from "react-native-responsive-fontsize";
import LottieView from "lottie-react-native";
import * as Speech from "expo-speech";
import { auth, db, firebase } from "../../firebase/config";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function FoxNews({ navigation }) {
  const [article, setArticle] = useState("");
  const [index, setIndex] = useState(0);
  const [keyToApi, setKeyToApi] = useState("");

  const grabApiKey = () => {
    db.collection("users")
      .doc(auth.currentUser.email)
      .onSnapshot((doc) => {
        setKeyToApi(doc.data().apiKey);
      });
  };

  const saveDataToFirebase = async () => {
    db.collection("users")
      .doc(auth.currentUser.email)
      .collection("savedNews")
      .add({
        title: article.articles[index].title,
        description: article.articles[index].description,
        url: article.articles[index].url,
        urlToImage: article.articles[index].urlToImage,
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  const speakNews = () => {
    const greeting =
      article.articles[index].title + article.articles[index].description;

    const options = {
      voice: "en-in-x-ene-local",
      rate: 0.7,
    };
    Speech.speak(greeting, options);
  };

  const getNews = async () => {
    var url = `https://newsapi.org/v2/top-headlines?sources=fox-news&apiKey=${keyToApi}`;
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setArticle(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    return () => {
      getNews();
      grabApiKey();
    };
  }, []);

  if (article === "") {
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
          source={require("../../assets/animation/my-favourite-geometric-loader.json")}
          autoPlay
          loop
        />
      </View>
    );
  } else {
    console.log(keyToApi);
    return (
      <NativeBaseProvider>
        <Center _light={{ bg: "lightBlue.700" }}>
        <TouchableOpacity
          style={{
            top: 30
          }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Entypo name="arrow-with-circle-left" size={40} color="black" />
          </TouchableOpacity>
          <Carousel
            layout="stack"
            data={article.articles}
            sliderHeight={windowHeight}
            itemHeight={windowHeight - 100}
            vertical={true}
            renderItem={({ item, index }) => (
              <Box style={styles.newsContainer} bg={"lightBlue.700"} shadow={9}>
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
            onSnapToItem={(index) => setIndex(index)}
          />
          <Pressable
            onPress={() => {
              speakNews();
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
              saveDataToFirebase();
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
