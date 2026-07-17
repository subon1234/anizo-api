const { searchSongs } = require("./searchService");
const cache = require("../cache/memoryCache");

async function getTrendingSongs() {
  const cacheKey = "trending";

  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const songs = await searchSongs("Trending Music");

  cache.set(cacheKey, songs, 600);

  return songs;
}

module.exports = {
  getTrendingSongs
};
