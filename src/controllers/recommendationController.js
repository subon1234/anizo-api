const {
  getRecommendations
} = require("../services/recommendationService");

const {
  success,
  error
} = require("../utils/response");

async function recommendations(req, res) {
  try {
    const query = req.query.q || "Top Music";

    const songs = await getRecommendations(query);

    return success(
      res,
      {
        total: songs.length,
        results: songs
      },
      "Recommendations fetched successfully"
    );

  } catch (err) {
    return error(res, err.message, 500);
  }
}

module.exports = {
  recommendations
};
