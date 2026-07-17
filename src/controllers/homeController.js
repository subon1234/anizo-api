const { getHomeData } = require("../services/homeService");
const { success, error } = require("../utils/response");

async function home(req, res) {
  try {
    const data = await getHomeData();

    return success(
      res,
      data,
      "Home data fetched successfully"
    );
  } catch (err) {
    return error(res, err.message, 500);
  }
}

module.exports = {
  home
};
