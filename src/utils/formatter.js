function formatSong(song = {}) {
  return {
    videoId: song.videoId || song.id || "",

    title:
      song.title?.text ||
      song.title ||
      "Unknown Title",

    artist:
      song.author?.name ||
      song.artist ||
      song.authors?.[0]?.name ||
      "Unknown Artist",

    duration:
      song.duration?.text ||
      song.duration ||
      "",

    thumbnail:
      song.thumbnails?.at(-1)?.url ||
      song.thumbnail?.at(-1)?.url ||
      ""
  };
}

function formatPlaylist(playlist = {}) {
  return {
    id: playlist.id || "",
    title: playlist.title || "",
    thumbnail: playlist.thumbnail || "",
    totalSongs: playlist.totalSongs || 0
  };
}

module.exports = {
  formatSong,
  formatPlaylist
};
