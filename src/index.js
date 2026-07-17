const express = require("express");
const cors = require("cors");
require("dotenv").config();

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const searchRoute = require("./routes/search");
const playRoute = require("./routes/play");
const lyricsRoute = require("./routes/lyrics");
const playlistRoute = require("./routes/playlist");
const homeRoute = require("./routes/home");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use("/search", searchRoute);
app.use("/play", playRoute);
app.use("/lyrics", lyricsRoute);
app.use("/playlist", playlistRoute);
app.use("/home", homeRoute);

// Root
app.get("/", (req, res) => {
  res.json({
    success: true,
    name: "Anizo API",
    version: "2.0.0",
    status: "Online",
    message: "Anizo Backend V2 is running successfully."
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
=================================
🎵 Anizo Backend V2
🚀 Running on Port ${PORT}
🌐 http://localhost:${PORT}
=================================
`);
});
