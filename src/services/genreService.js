const cache = require("../cache/memoryCache");
const { searchSongs } = require("./searchService");

const GENRES = [
  "Pop",
  "Rock",
  "Hip Hop",
  "Rap",
  "Lo-fi",
  "EDM",
  "Classical",
  "Bollywood",
  "Punjabi",
  "K-Pop"
];

async function getGenres() {
  const cached = cache.get("genres");

  if (cached) {
    return cached;
  }

  const genres = GENRES.map((name) => ({
    id: encodeURIComponent(name),
    name
  }));

  cache.set("genres", genres, 3600);

  return genres;
}

async function getGenre(name) {
  const genre = decodeURIComponent(name);

  const songs = await searchSongs(genre);

  return {
    id: encodeURIComponent(genre),
    name: genre,
    songs
  };
}

module.exports = {
  getGenres,
  getGenre
};
