const { getLyrics } = require("../services/lyricsService");

async function lyrics(req, res) {
  try {
    const { title, artist } = req.query;

    if (!title || !artist) {
      return res.status(400).json({
        success: false,
        message: "title and artist are required"
      });
    }

    const data = await getLyrics(title, artist);

    res.json({
      success: true,
      ...data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = { lyrics };