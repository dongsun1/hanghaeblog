const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("this is root page");
});

router.post("/post", async (req, res) => {
  const { title, description, date } = req.body;

  await Post.create({ title, description, date });

  res.json({ success: true });
});

module.exports = router;
