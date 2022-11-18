import React from "react";
import { getMovie } from "../services/services";
import {
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  Modal,
} from "react-native";
import placehodlerImage from "../assets/images/image-no-available.png";
import { Rating } from "react-native-ratings";
import PlayButton from "../components/PlayButton";
// import Video from "../components/Video";
const height = Dimensions.get("screen").height;
const Detail = ({ route, navigation }) => {
  const [state, setState] = React.useState();
  const [Error, setError] = React.useState();
  const [Loaded, setLoaded] = React.useState(false);
  const [ModalVisible, setModalVisible] = React.useState(false);
  const movieID = route.params.movieID;

  React.useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movie = await getMovie(movieID);

        setState(movie);
        setLoaded(true);
      } catch (error) {
        setError(err);
      }
    };
    fetchMovie();
  }, []);

  const videoShown = () => {
    setModalVisible((prev) => !prev);
  };
  return (
    <React.Fragment>
      {Loaded && (
        <ScrollView>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={
              state.poster_path
                ? { uri: "https://image.tmdb.org/t/p/w500" + state.poster_path }
                : placehodlerImage
            }
          />
          <View style={styles.container}>
            <View style={styles.playButton}>
              <PlayButton handlePress={videoShown} />
            </View>
            <Text style={styles.movieTitle}></Text>
            <View style={styles.genresContainer}>
              {state &&
                state.genres &&
                state.genres.map((genre) => {
                  return (
                    <Text style={styles.genre} key={genre.id}>
                      {genre.name}
                    </Text>
                  );
                })}
            </View>
          </View>
          <Rating
            size={40}
            count={5}
            isDisabled={true}
            startingValue={state.vote_average / 2}
            ratingColor={"gold"}
          />
          <Text style={styles.overview}>{state.overview}</Text>
          <Text style={styles.date}>
            {"Release Date : " + state.release_date}
          </Text>
        </ScrollView>
      )}
      {!Loaded && <ActivityIndicator size={"large"} />}
      <Modal
        supportedOrientations={["portrait", "landscape"]}
        animationType="slide"
        visible={ModalVisible}
      >
        <View style={styles.videoModal}>
          {/* <Video OnClose={videoShown} /> */}
        </View>
      </Modal>
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  image: {
    height: height / 2.5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  genre: {
    marginRight: 10,
    fontWeight: "bold",
  },
  overview: {
    padding: 15,
  },
  date: {
    paddingLeft: 15,

    fontWeight: "bold",
  },
  playButton: {
    position: "absolute",
    top: -20,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Detail;
