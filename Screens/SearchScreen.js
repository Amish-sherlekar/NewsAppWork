import React, { Component } from "react";
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

const windowWidth = Dimensions.get("window").width;

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: "",
      searchText: "",
    };
  }

  getNews = async () => {
    //change latitude and longitude
    var goNews = await fetch(
      `https://newsapi.org/v2/everything?q=${this.state.searchText}&apiKey=004228a5cefb4081880996489549f61f`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          article: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    return goNews;
  };

  componentDidMount() {
    this.getNews();
  }

  render() {
    return (
      <Modal visible={true} animationType="slide">
        <View styles={styles.container}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
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
                this.setState({ searchText: text });
              }}
              onSubmitEditing={() => this.getNews()}
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
              keyExtractor={(item) => item.title}
              data={this.state.article.articles}
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
