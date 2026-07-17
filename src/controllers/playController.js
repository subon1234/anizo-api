const ytdlp = require("yt-dlp-exec");
const { getLyrics } = require("../services/lyricsService");

async function play(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Video id is required"
      });
    }

    const info = await ytdlp(
      `https://www.youtube.com/watch?v=${id}`,
      {
        dumpSingleJson: true,
        noWarnings: true,
        noCheckCertificates: true,
        preferFreeFormats: true
      }
    );

    const audio = (info.formats || []).find(
      f => f.acodec !== "none" && f.vcodec === "none"
    );

    let lyrics = {
      synced: null,
      plain: null
    };

    try {
      const data = await getLyrics(
        info.title,
        info.uploader
      );

      lyrics = {
        synced: data.syncedLyrics,
        plain: data.plainLyrics
      };
    } catch (e) {
      // Lyrics not found
    }

    res.json({
      success: true,
      videoId: id,
      title: info.title,
      author: info.uploader,
      duration: info.duration,
      thumbnail: info.thumbnail,
      streamUrl: audio ? audio.url : null,
      lyrics
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = { play };