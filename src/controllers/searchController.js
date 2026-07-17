const { searchSongs } = require("../services/searchService");
const { success, error } = require("../utils/response");

async function search(req, res) {
  try {
    const query = req.query.q;

    if (!query) {
      return error(res, "Search query is required", 400);
    }

    const songs = await searchSongs(query);

    return success(
      res,
      {
        total: songs.length,
        results: songs
      },
      "Songs fetched successfully"
    );

  } catch (err) {
    return error(res, err.message, 500);
  }
}

module.exports = {
  search
};
