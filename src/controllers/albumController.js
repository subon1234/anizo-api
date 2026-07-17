const {
  searchAlbums,
  getAlbum
} = require("../services/albumService");

const {
  success,
  error
} = require("../utils/response");

async function search(req, res) {
  try {
    const query = req.query.q;

    if (!query) {
      return error(res, "Search query is required", 400);
    }

    const albums = await searchAlbums(query);

    return success(
      res,
      {
        total: albums.length,
        results: albums
      },
      "Albums fetched successfully"
    );
  } catch (err) {
    return error(res, err.message);
  }
}

async function details(req, res) {
  try {
    const album = await getAlbum(req.params.id);

    return success(
      res,
      album,
      "Album fetched successfully"
    );
  } catch (err) {
    return error(res, err.message);
  }
}

module.exports = {
  search,
  details
};
