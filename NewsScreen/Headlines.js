import { Center } from 'native-base'
import React from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native'

const Headlines = ({ data }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={() => {
                    Linking.openURL(data.url)
                }}
            >
                <Center
                    style={styles.container}
                    shadow={9}
                >
                    <Image
                        source={{ uri: data.urlToImage }}
                        style={styles.imageStyle}
                    />
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black', margin: 10 }}>
                        {data.title.slice(0, 50)}
                    </Text>
                    <Text
                        style={{ fontSize: 13, color: 'black', marginHorizontal: 10, top: -10 }}>
                        {data.description.slice(0, 100)}
                    </Text>
                </Center>
            </TouchableOpacity>
        </View>
    )
}

export default Headlines

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#004282',
        width: 300,
        height: 400,
        borderRadius: 30,
        marginLeft: 30,
        left: 50,
        top: -10
    },
    imageStyle: {
        width: 280,
        height: 200,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        top: 5
    }
})