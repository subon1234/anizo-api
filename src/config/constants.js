const APP = {
  NAME: "Anizo API",
  VERSION: "2.0.0"
};

const DEFAULTS = {
  SEARCH_LIMIT: 20,
  HOME_LIMIT: 10,
  CACHE_TTL: 300
};

const SEARCH = {
  TRENDING: "Trending Music",
  NEW_RELEASES: "New Music 2026",
  RECOMMENDED: "Top Songs",
  QUICK_PICKS: "Popular Songs"
};

const PLAYER = {
  DEFAULT_QUALITY: "bestaudio",
  FALLBACK_QUALITY: "bestaudio[ext=m4a]/bestaudio"
};

module.exports = {
  APP,
  DEFAULTS,
  SEARCH,
  PLAYER
};
