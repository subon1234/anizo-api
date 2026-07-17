const cache = require("../cache/memoryCache");
const { searchSongs } = require("./searchService");

async function searchArtists(query) {
  const cacheKey = `artists:${query}`;

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const songs = await searchSongs(query);

  const artistsMap = new Map();

  songs.forEach((song) => {
    const name = song.artist || "Unknown Artist";

    if (!artistsMap.has(name)) {
      artistsMap.set(name, {
        id: encodeURIComponent(name),
        name,
        image: song.thumbnail,
        topSong: song.title
      });
    }
  });

  const artists = Array.from(artistsMap.values());

  cache.set(cacheKey, artists, 600);

  return artists;
}

async function getArtist(id) {
  const name = decodeURIComponent(id);

  const songs = await searchSongs(name);

  return {
    id,
    name,
    image: songs[0]?.thumbnail || null,
    topSongs: songs.slice(0, 10)
  };
}

module.exports = {
  searchArtists,
  getArtist
};
