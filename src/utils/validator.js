function validateSearch(query) {
  if (!query) {
    return {
      valid: false,
      message: "Search query is required"
    };
  }

  if (typeof query !== "string") {
    return {
      valid: false,
      message: "Search query must be a string"
    };
  }

  if (query.trim().length < 2) {
    return {
      valid: false,
      message: "Search query must contain at least 2 characters"
    };
  }

  return {
    valid: true
  };
}

function validateVideoId(id) {
  if (!id) {
    return {
      valid: false,
      message: "Video ID is required"
    };
  }

  if (typeof id !== "string") {
    return {
      valid: false,
      message: "Invalid Video ID"
    };
  }

  return {
    valid: true
  };
}

function validatePlaylistName(name) {
  if (!name) {
    return {
      valid: false,
      message: "Playlist name is required"
    };
  }

  if (name.trim().length < 3) {
    return {
      valid: false,
      message: "Playlist name must be at least 3 characters"
    };
  }

  return {
    valid: true
  };
}

module.exports = {
  validateSearch,
  validateVideoId,
  validatePlaylistName
};
