require("dotenv").config();

module.exports = {
  BASE_URL: "https://www.youtube.com",
  WATCH_URL: "https://www.youtube.com/watch?v=",

  YTDLP_OPTIONS: {
    dumpSingleJson: true,
    noWarnings: true,
    noCheckCertificates: true,
    preferFreeFormats: true
  }
};
