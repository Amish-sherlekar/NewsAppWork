import React, { useEffect, useState } from "react";
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
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import tailwind from "tailwind-rn";
import { Box, Center, NativeBaseProvider, Pressable } from "native-base";
import Carousel from "react-native-snap-carousel";
import { RFValue } from "react-native-responsive-fontsize";
import LottieView from "lottie-react-native";
import * as Speech from "expo-speech";
import { db, firebase, auth } from "../firebase/config";
import * as Clipboard from "expo-clipboard";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SavedNews = () => {
  const [savingNews, setSavingNews] = useState([]);
  const [index, setIndex] = useState(0);

  const getSavedNews = async () => {
    const savedNews = db
      .collectionGroup("savedNews")
      .orderBy("createAt", "desc")
      .onSnapshot((snapshot) => {
        setSavingNews(snapshot.docs.map((doc) => doc.data()));
      });
    return savedNews;
  };

  const _renderItem = ({ item, index }) => (
    <View style={styles.newsContainer}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item.urlToImage }}
          style={{
            width: "105%",
            height: 200,
            left: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={tailwind("text-center font-bold text-blue-900")}>
            {item.title}
          </Text>
          <Text
            style={tailwind("font-semibold text-sm text-center text-blue-300")}
          >
            {item.description}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(item.url);
          }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: 10,
          }}
        >
          <Ionicons name="ios-open" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {
    getSavedNews();
  }, []);

  if (savingNews.lenght === 0) {
    return (
      <View style={styles.container}>
        <LottieView
          source={require("../assets/animation/my-favourite-geometric-loader.json")}
          autoPlay
          loop
          style={{
            alignItem: "center",
          }}
        />
      </View>
    );
  } else {
    return (
      <NativeBaseProvider>
        <Center>
          <FlatList
            data={savingNews}
            renderItem={_renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              console.log("End Reached");
            }}
          />
        </Center>
      </NativeBaseProvider>
    );
  }
};

export default SavedNews;

const styles = StyleSheet.create({
  newsContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    height: windowHeight - 400,
  },
});
