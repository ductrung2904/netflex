// const API_KEY = "a036bc2f73492dded3601740add39c37"
// const API_KEY = '80cd9bbb81c3052b527aef03fa0e9741'

const request = {
  fetchTrending: `/trending/all/week?api_key=${process.env.API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${process.env.API_KEY}&language=en-US&networks=Netflix&release_date.gte=2017-05-01`,
  fetchTopRated: `/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${process.env.API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${process.env.API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${process.env.API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${process.env.API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${process.env.API_KEY}&with_genres=99`,
}

export default request
