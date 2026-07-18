const cache = require("../cache/memoryCache");
const { searchSongs } = require("./searchService");

const TRENDING_QUERIES = [
  "Top Songs 2026",
  "Global Top Music",
  "Trending English Songs",
  "Trending Hindi Songs"
];

async function getTrendingSongs() {
  const cacheKey = "trending";

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const results = await Promise.all(
      TRENDING_QUERIES.map(query => searchSongs(query))
    );

    const map = new Map();

    results.flat().forEach(song => {
      if (!map.has(song.videoId)) {
        map.set(song.videoId, song);
      }
    });

    const songs = Array.from(map.values()).slice(0, 30);

    cache.set(cacheKey, songs, 600);

    return songs;
  } catch (err) {
    console.error("Trending Service Error:", err);
    return [];
  }
}

module.exports = {
  getTrendingSongs
};
