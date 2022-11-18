import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

const defaultProps = {
  main: false,
};
const NavBar = ({ navigation, main }) => {
  return (
    <SafeAreaView>
      {main ? (
        <View style={styles.mainNav}>
          <Image
            style={styles.logo}
            source={require("../assets/images/netflix.png")}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            <Icon name={"search-outline"} size={40} color={"#fff"} />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name={"chevron-back"} size={40} color={"#fff"} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainNav: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
});
export default NavBar;
