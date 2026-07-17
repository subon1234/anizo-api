const { Innertube } = require("youtubei.js");

let yt;

async function getYoutube() {
  if (!yt) {
    yt = await Innertube.create();
  }
  return yt;
}

async function home(req, res) {
  try {
    const youtube = await getYoutube();

    const trending = await youtube.search("Trending music");

    const songs = (trending.results || [])
      .filter(item => item.type === "Video")
      .slice(0, 20)
      .map(item => ({
        id: item.id,
        title: item.title?.text || "Unknown",
        artist: item.author?.name || "Unknown",
        thumbnail:
          item.thumbnails?.[item.thumbnails.length - 1]?.url || "",
        duration: item.duration?.text || ""
      }));

    res.json({
      success: true,

      featured: songs[0] || null,

      sections: {
        trending: songs.slice(0, 10),
        quickPicks: songs.slice(10, 20),
        newReleases: songs.slice(0, 10),
        recommended: songs.slice(5, 15)
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = { home };
