const { getTrendingSongs } = require("./trendingService");
const { getRecommendations } = require("./recommendationService");

async function getHomeData() {
  try {
    const [trending, recommended] = await Promise.all([
      getTrendingSongs(),
      getRecommendations()
    ]);

    const safeTrending = trending || [];
    const safeRecommended = recommended || [];

    return {
      success: true,

      banner: safeTrending.slice(0, 5),

      sections: [
        {
          id: "trending",
          title: "🔥 Trending Now",
          items: safeTrending
        },
        {
          id: "recommended",
          title: "🎧 Made For You",
          items: safeRecommended
        },
        {
          id: "quick_picks",
          title: "⚡ Quick Picks",
          items: safeRecommended.slice(0, 8)
        },
        {
          id: "new_releases",
          title: "🆕 New Releases",
          items: safeTrending.slice(5, 15)
        },
        {
          id: "continue_listening",
          title: "▶ Continue Listening",
          items: []
        }
      ]
    };
  } catch (err) {
    console.error("Home Service Error:", err);

    return {
      success: false,
      banner: [],
      sections: []
    };
  }
}

module.exports = {
  getHomeData
};
