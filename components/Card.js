import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const placeholderImage = require("../assets/images/image-no-available.png");

const Card = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Detail", { movieID: item.id })}
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={
          item.poster_path
            ? { uri: "https://image.tmdb.org/t/p/w500" + item.poster_path }
            : placeholderImage
        }
      />
      {item.poster_path && <Text style={styles.movieName}>{item.title}</Text>}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 3,
    position: "relative",
    alignItems: "center",
    height: 200,
    marginTop: 10,
  },
  image: {
    height: 200,
    width: 110,
    borderRadius: 20,
  },
  movieName: {
    position: "absolute",
    width: 100,
    textAlign: "center",
    top: 10,
    color: "#fff",
    fontWeight: "bold",
  },
});
export default Card;
