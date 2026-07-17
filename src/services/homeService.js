const { getTrendingSongs } = require("./trendingService");
const { getRecommendations } = require("./recommendationService");

async function getHomeData() {
  const trending = await getTrendingSongs();
  const recommended = await getRecommendations();

  return {
    banner: trending.slice(0, 5),

    sections: [
      {
        id: "trending",
        title: "Trending Now",
        items: trending
      },
      {
        id: "recommended",
        title: "Recommended For You",
        items: recommended
      },
      {
        id: "quick_picks",
        title: "Quick Picks",
        items: recommended.slice(0, 8)
      },
      {
        id: "new_releases",
        title: "New Releases",
        items: trending.slice(5, 15)
      }
    ]
  };
}

module.exports = {
  getHomeData
};
