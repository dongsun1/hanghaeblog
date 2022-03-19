const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("this is root page");
});

module.exports = router;
