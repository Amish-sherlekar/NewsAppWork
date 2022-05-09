import { Ionicons } from "@expo/vector-icons";
import React, { Component, useEffect, useState } from "react";
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
  StatusBar,
  ImageBackground,
  Linking,
  Modal,
  TextInput,
  ToastAndroid,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Carousel from "react-native-snap-carousel";
import { NewsCategory, NewsSources } from "../NewsProps";
import Headlines from "../NewsScreen/Headlines";
import LottieView from "lottie-react-native";
import { auth, db, firebase } from "../firebase/config";

const windowWidth = Dimensions.get("window").width;

export default function ExploreScreen({ navigation }) {
  const [article, setArticle] = useState("");

  const getNews = async () => {
    var url = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=a1cacd357bb146d2a946022b95be617b`;
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
      getNews();
  }, []);

  if (article === "") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={require("../assets/animation/my-favourite-geometric-loader.json")}
          autoPlay
          loop
        />
      </View>
    );
  } else {
    ToastAndroid.show("Hello ✉️" + auth.currentUser.email, ToastAndroid.SHORT);
    return (
      <View>
        <ScrollView>
          <StatusBar />
          <TouchableOpacity
            style={{
              left: windowWidth / 2 - 170,
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
              top: 20,
            }}
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            <Ionicons name="ios-search" size={30} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.categoryText}>Category</Text>
          </View>
          <FlatList
            keyExtractor={(element) => element.id}
            data={NewsCategory}
            renderItem={(element) => {
              return (
                <View style={{ marginTop: 100, marginLeft: 30 }}>
                  <TouchableOpacity
                    style={styles.cardContainer}
                    onPress={() => {
                      navigation.navigate(element.item.type);
                    }}
                  >
                    <Image
                      source={{ uri: element.item.image }}
                      style={styles.imageStyle}
                    />
                    <Text style={styles.textStyle}>{element.item.type}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />

          <Text style={styles.sourceText}>Sources</Text>
          <FlatList
            keyExtractor={(element) => element.id}
            data={NewsSources}
            renderItem={(element) => {
              return (
                <View style={{ paddingLeft: 20 }}>
                  <TouchableOpacity
                    style={styles.sourceCardContainer}
                    onPress={() => {
                      navigation.navigate(element.item.id);
                    }}
                  >
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
      </View>
    );
  }
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dcdcdc",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    top: -80,
    backgroundColor: "#F5F5f1",
    width: 250,
    height: 300,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#dcdcdc",
  },
  imageStyle: {
    width: 230,
    height: 200,
    marginLeft: 5,
    marginTop: 5,
    marginRight: 60,
    borderRadius: 10,
  },
  textStyle: {
    marginLeft: "10%",
    marginTop: 10,
    fontSize: RFValue(18),
    fontFamily: "Fira Code iScript",
    fontWeight: "900",
  },
  sourceCardContainer: {
    backgroundColor: "#F5F5f1",
    width: 250,
    height: 300,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#dcdcdc",
  },
  sourceTextStyle: {
    marginLeft: 20,
    fontSize: 35,
    fontFamily: "Fira Code iScript",
    marginTop: 10,
  },
  sourceImageStyle: {
    marginLeft: 10,
    marginTop: 10,
    width: 220,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  categoryText: {
    paddingTop: 50,
    marginLeft: 30,
    fontSize: RFValue(25),
    fontFamily: "Fira Code iScript",
    borderRadius: 10,
    alignItems: "center",
    color: "#000",
    fontWeight: "bold",
  },
  sourceText: {
    paddingTop: -40,
    marginLeft: 30,
    fontSize: RFValue(25),
    fontFamily: "Fira Code iScript",
    borderRadius: 20,
    width: 230,
    color: "#000",
    fontWeight: "bold",
  },
  searchHeaderStyle: {
    backgroundColor: "#F5F5f1",
    width: "100%",
    height: 50,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#dcdcdc",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});
