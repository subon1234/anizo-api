const cache = require("../cache/memoryCache");
const { searchSongs } = require("./searchService");

const DEFAULT_QUERIES = [
  "Top Music",
  "Pop Hits",
  "Hindi Hits",
  "English Hits"
];

function shuffle(array) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

async function getRecommendations(query = null) {
  const cacheKey = `recommendations:${query || "default"}`;

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const queries = query ? [query] : DEFAULT_QUERIES;

    const results = await Promise.all(
      queries.map(q => searchSongs(q))
    );

    const map = new Map();

    results.flat().forEach(song => {
      if (!map.has(song.videoId)) {
        map.set(song.videoId, song);
      }
    });

    const recommendations = shuffle(
      Array.from(map.values())
    ).slice(0, 20);

    cache.set(cacheKey, recommendations, 600);

    return recommendations;
  } catch (err) {
    console.error("Recommendation Error:", err);
    return [];
  }
}

async function getRelatedSongs(title, artist) {
  const query = `${title} ${artist}`;

  const cacheKey = `related:${query}`;

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const songs = await searchSongs(query);

    const related = songs
      .filter(song => song.title !== title)
      .slice(0, 10);

    cache.set(cacheKey, related, 600);

    return related;
  } catch (err) {
    console.error("Related Songs Error:", err);
    return [];
  }
}

module.exports = {
  getRecommendations,
  getRelatedSongs
};
