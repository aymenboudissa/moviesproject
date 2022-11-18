import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getMovieTV } from "../services/services";
import Icon from "react-native-vector-icons/Ionicons";
import Card from "../components/Card";
const Search = ({ navigation }) => {
  const [text, setText] = React.useState();
  const [SearchResultats, setSearchResultats] = React.useState();

  const onSubmit = (query) => {
    Promise.all([getMovieTV(query, "movie"), getMovieTV(query, "tv")]).then(
      ([movies, tv]) => {
        const data = [...movies, ...tv];
        setSearchResultats(data);
      }
    );
  };
  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              placeholder={"Search Movie or TV Show"}
              style={StyleSheet.input}
              onChangeText={setText}
              value={text}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onSubmit(text);
            }}
          >
            <Icon name={"search-outline"} size={40} color={"black"} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItems}>
          {SearchResultats && SearchResultats.length > 0 && (
            <FlatList
              numColumns={3}
              data={SearchResultats}
              renderItem={({ item }) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
        {SearchResultats && SearchResultats.length === 0 && (
          <View style={[styles.empty, { paddingTop: 20 }]}>
            <Text>No results matching your criteria</Text>
            <Text>Try different keywords</Text>
          </View>
        )}
        {!SearchResultats && (
          <View style={styles.empty}>
            <Text>Type something to start searching</Text>
          </View>
        )}
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    borderWidth: 0.5,
    height: 50,
    padding: 8,
  },

  container: {
    padding: 5,
    paddingTop: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  form: {
    flexBasis: "auto",
    flexGrow: 1,
    paddingRight: 8,
  },
  searchItems: {
    padding: 5,
  },
  empty: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  list: {},
});

export default Search;
