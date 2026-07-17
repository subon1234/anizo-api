const { getYoutube } = require("../services/youtubeService");

async function search(req, res) {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }

    const yt = await getYoutube();

    const result = await yt.search(query, {
      type: "video"
    });

    const songs = result.results
      .filter(item => item.type === "Video")
      .map(item => ({
        videoId: item.id,
        title: item.title?.text || item.title || "",
        artist:
          item.author?.name ||
          item.authors?.[0]?.name ||
          "Unknown",
        duration: item.duration?.text || item.duration || "",
        thumbnail:
          item.thumbnails?.[0]?.url ||
          item.thumbnail?.[0]?.url ||
          ""
      }));

    res.json({
      success: true,
      total: songs.length,
      results: songs
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = { search };