import axios from "axios";

const apiUrl = "https://api.themoviedb.org/3";
apiKEy = "7f78a961b470ff7179758fd790cac851";
export const getPopularMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/popular?api_key=${apiKEy}`);
  return resp.data.results;
};
export const getUpcomingMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/upcoming?api_key=${apiKEy}`);
  return resp.data.results;
};

export const getPopularTv = async () => {
  const resp = await axios.get(`${apiUrl}/tv/popular?api_key=${apiKEy}`);
  return resp.data.results;
};
export const getFamilyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKEy}&with_genres=10751`
  );
  return resp.data.results;
};
export const getDocumenteryMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKEy}&with_genres=99`
  );
  return resp.data.results;
};
export const getMovie = async (id) => {
  const resp = await axios.get(`${apiUrl}/movie/${id}?api_key=${apiKEy}`);

  return resp.data;
};

export const getMovieTV = async (query, type) => {
  const resp = await axios.get(
    `${apiUrl}/search/${type}?api_key=${apiKEy}&query=${query}`
  );
  return resp.data.results;
};
