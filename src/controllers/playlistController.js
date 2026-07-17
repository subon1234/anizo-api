const { getPlaylist } = require("../services/playlistService");

async function playlist(req, res) {
  try {
    let id = req.query.id;
    let url = req.query.url;

    if (!id && !url) {
      return res.status(400).json({
        success: false,
        message: "Playlist id or url is required"
      });
    }

    if (!id && url) {
      const match = url.match(/[?&]list=([^&]+)/);
      if (!match) {
        return res.status(400).json({
          success: false,
          message: "Invalid playlist URL"
        });
      }
      id = match[1];
    }

    const data = await getPlaylist(id);

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

module.exports = { playlist };