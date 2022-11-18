import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Card from "./Card";

const List = ({ title, content, navigation }) => {
  return (
    <View style={styles.list}>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.carousel}>
        <FlatList
          data={content}
          renderItem={({ item }) => (
            <Card item={item} navigation={navigation} />
          )}
          horizontal={true}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  list: {
    marginTop: 25,
  },
});
export default List;
