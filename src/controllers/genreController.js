const {
  getGenres,
  getGenre
} = require("../services/genreService");

const {
  success,
  error
} = require("../utils/response");

async function list(req, res) {
  try {
    const genres = await getGenres();

    return success(
      res,
      genres,
      "Genres fetched successfully"
    );
  } catch (err) {
    return error(res, err.message);
  }
}

async function details(req, res) {
  try {
    const genre = await getGenre(req.params.name);

    return success(
      res,
      genre,
      "Genre fetched successfully"
    );
  } catch (err) {
    return error(res, err.message);
  }
}

module.exports = {
  list,
  details
};
