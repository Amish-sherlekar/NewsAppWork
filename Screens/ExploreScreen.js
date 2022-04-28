import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
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
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Carousel from 'react-native-snap-carousel';
import { NewsCategory, NewsSources } from '../NewsProps';
import Headlines from '../NewsScreen/Headlines';

const windowWidth = Dimensions.get('window').width;

export default class ExploreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: '',
    };
  }

  getNews = async () => {
    //change latitude and longitude
    var url =
      'https://saurav.tech/NewsAPI/top-headlines/category/general/in.json';
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

  componentDidMount(){
    this.getNews()
  };

  render() {
    if (this.state.article === '') {
      return(
      <View>
        <Text>Loading...</Text>
      </View>  
      )
    } else {
      return (
        <ScrollView>
          <StatusBar />
          
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
                      this.props.navigation.navigate(element.item.type);
                    }}>
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

          <View style={{ flexDirection: 'row', top: -50 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{
                  marginHorizontal: 10,
            }}>
              <Headlines data={this.state.article.articles[0]} />
              <Headlines data={this.state.article.articles[1]} />
              <Headlines data={this.state.article.articles[2]} />
            </ScrollView>
          </View>

          
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
                      this.props.navigation.navigate(element.item.id);
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
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    top: -70,
    backgroundColor: '#F5F5f1',
    width: 250,
    height: 300,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#dcdcdc',
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
    marginLeft: '10%',
    marginTop: 10,
    fontSize: RFValue(18),
    fontFamily: 'Fira Code iScript',
    fontWeight: '900',
  },
  sourceCardContainer: {
    backgroundColor: '#F5F5f1',
    width: 250,
    height: 300,
    borderRadius: 20,
    borderWidth: 4,
  },
  sourceTextStyle: {
    marginLeft: 20,
    fontSize: 35,
    fontFamily: 'Fira Code iScript',
    // fontWeight: "900",
    marginTop: 10,
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
    marginLeft: 30,
    fontSize: RFValue(25),
    fontFamily: 'Fira Code iScript',
    borderRadius: 10,
  },
  sourceText: {
    paddingTop: -40,
    marginLeft: 30,
    fontSize: RFValue(25),
    fontFamily: 'Fira Code iScript',
    borderRadius: 20,
    width: 230,
  },
});