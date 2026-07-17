const express = require("express");
const router = express.Router();

const {
  getPlaylists,
  create,
  add,
  remove,
  removePlaylist
} = require("../controllers/playlistController");

router.get("/", getPlaylists);

router.post("/", create);

router.post("/:id/song", add);

router.delete("/:id/song/:videoId", remove);

router.delete("/:id", removePlaylist);

module.exports = router;
