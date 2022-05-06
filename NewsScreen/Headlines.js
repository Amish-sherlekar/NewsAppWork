import { View, Text, ScrollView, Image } from "react-native";
import React from "react";

const Headlines = ({ data }) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: "#fff",
          width: 290,
          height: 430,
          borderRadius: 30,
          marginLeft: 15,
          left: -10,
        }}
      >
        <Image
          source={{ uri: data.urlToImage }}
          style={{
            width: "100%",
            height: 200,
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
          {data.title}
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: "black",
            marginHorizontal: 10,
            top: -10,
          }}
        >
          {data.description}
        </Text>
      </View>
    </View>
  );
};

export default Headlines;
