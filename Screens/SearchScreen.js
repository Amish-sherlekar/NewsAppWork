import React, { Component, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { auth, db, firebase } from "../firebase/config";
import LottieView from "lottie-react-native";

const windowWidth = Dimensions.get("window").width;

export default function SearchScreen({ navigation }) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     article: "",
  //     searchText: "",
  //   };
  // }

  const [article, setArticle] = useState("");
  const [searchText, setSearchText] = useState("");
  const [keyToApi, setKeyToApi] = useState("");
  const [index, setIndex] = useState(0);

  const grabApiKey = () => {
    db.collection("users")
      .doc(auth.currentUser.email)
      .onSnapshot((doc) => {
        // this.setState({ keyToApi: doc.data() });
        setKeyToApi(doc.data().apiKey);
        console.log(keyToApi);
      });
  };

  const getNews = async () => {
    var goNews = await fetch(
      `https://newsapi.org/v2/everything?q=${searchText}&apiKey=${keyToApi}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        // this.setState({
        //   article: responseJson,
        // });
        setArticle(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    return goNews;
  };

  // componentDidMount() {
  //   this.getNews();
  // }
  useEffect(() => {
      getNews();
      grabApiKey();
  }, []);

  // render() {
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
          source={require("../assets/animation/bodybuilder-dancer.json")}
          autoPlay
          loop
        />
      </View>
    );
  } else {
    console.log(keyToApi);
    return (
      <Modal visible={true} animationType="slide">
        <View styles={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather
              name="arrow-left-circle"
              size={40}
              color="#c0c0c0"
              style={{
                left: 30,
              }}
            />
          </TouchableOpacity>
          <View style={styles.searchHeaderStyle}>
            <TextInput
              placeholder="Search Here ..."
              style={styles.searchInputStyle}
              placeholderTextColor="#808080"
              onChangeText={(text) => {
                // this.setState({ searchText: text });
                setSearchText(text);
              }}
              onSubmitEditing={() => getNews()}
            />
          </View>
          <View
            style={{
              top: 40,
              alignItems: "center",
            }}
          >
            <FlatList
              style={styles.flatListStyle}
              keyExtractor={(item) => setIndex(item)}
              data={article.articles}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: "#fff",
                    width: "90%",
                    height: 420,
                    borderRadius: 30,
                    marginTop: 25,
                    marginLeft: windowWidth * 0.05,
                    alignItems: "center",
                    shadowColor: "#808080",
                    shadowOffset: {
                      width: 15,
                      height: 15,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 10,
                  }}
                >
                  <Image
                    source={{ uri: item.urlToImage }}
                    style={{
                      width: "100%",
                      height: "50%",
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: "black",
                      margin: 10,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: "black",
                      marginHorizontal: 10,
                      top: -10,
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#404040",
  },
  searchHeaderStyle: {
    height: 50,
    top: 50,
    justifyContent: "center",
    paddingLeft: 10,
    alignItems: "center",
  },
  searchInputStyle: {
    width: "80%",
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 50,
  },
  flatListStyle: {
    width: "100%",
    height: "100%",
  },
});
