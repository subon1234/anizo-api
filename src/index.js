const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const searchRoute = require("./routes/search");
const playRoute = require("./routes/play");
const lyricsRoute = require("./routes/lyrics");
const playlistRoute = require("./routes/playlist");
const homeRoute = require("./routes/home");

app.use(cors());
app.use(express.json());

app.use("/search", searchRoute);
app.use("/play", playRoute);
app.use("/lyrics", lyricsRoute);
app.use("/playlist", playlistRoute);
app.use("/home", homeRoute);

app.get("/", (req, res) => {
  res.json({
    success: true,
    name: "Anizo API",
    version: "2.0.0",
    message: "Anizo Backend is running"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Anizo API running on port ${PORT}`);
});
