import React from "react";
import { Dimensions } from "react-native";
import List from "../components/List";
import ErrorConsole from "../components/Error";
import { ImageSlider } from "react-native-image-slider-banner";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  getPopularMovies,
  getFamilyMovies,
  getPopularTv,
  getUpcomingMovies,
  getDocumenteryMovies,
} from "../services/services";
const Home = ({ navigation }) => {
  const dimentions = Dimensions.get("screen");
  const [MoviesImages, setMoviesImages] = React.useState();
  const [PopularMovies, setPopularMovies] = React.useState();
  const [PopularTv, setPopularTv] = React.useState();
  const [FamilyMovies, setFamilyMovies] = React.useState();
  const [DocumenteryMovies, setDocumenteryMovies] = React.useState();
  const [Error, setError] = React.useState(false);
  const [Loaded, setLoaded] = React.useState(false);
  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumenteryMovies(),
    ]);
  };
  React.useEffect(() => {
    getData()
      .then(
        ([
          MoviesImages,
          PopularMovies,
          PopularTv,
          FamilyMovies,
          DocumenteryMovies,
        ]) => {
          const arrayImages = [];
          MoviesImages.forEach((element) => {
            arrayImages.push({
              img: "https://image.tmdb.org/t/p/w500" + element.poster_path,
            });
          });
          setMoviesImages(arrayImages);
          setPopularMovies(PopularMovies);
          setPopularTv(PopularTv);
          setFamilyMovies(FamilyMovies);
          setDocumenteryMovies(DocumenteryMovies);
        }
      )
      .catch((ERR) => {
        setError(ERR);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);
  return (
    <React.Fragment>
      {Loaded && !Error && (
        <ScrollView>
          {MoviesImages && (
            <View style={styles.sliderContainer}>
              <ImageSlider
                data={MoviesImages}
                autoplay={true}
                caroselImageStyle={{ resizeMode: "cover" }}
              />
            </View>
          )}
          {PopularMovies && (
            <View style={styles.carousel}>
              <List
                title="Popular Movie"
                content={PopularMovies}
                navigation={navigation}
              />
            </View>
          )}
          {PopularTv && (
            <View style={styles.carousel}>
              <List
                title="Popular TV"
                content={PopularTv}
                navigation={navigation}
              />
            </View>
          )}
          {FamilyMovies && (
            <View style={styles.carousel}>
              <List
                title="Family Movies"
                content={FamilyMovies}
                navigation={navigation}
              />
            </View>
          )}
          {DocumenteryMovies && (
            <View style={styles.carousel}>
              <List
                title="Documentary Movies"
                content={DocumenteryMovies}
                navigation={navigation}
              />
            </View>
          )}
          <View>
            {Error && (
              <Text style={{ color: "red" }}>Error in the service</Text>
            )}
          </View>
        </ScrollView>
      )}
      {!Loaded && <ActivityIndicator size={"large"} />}
      {Error && <ErrorConsole />}
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Home;
