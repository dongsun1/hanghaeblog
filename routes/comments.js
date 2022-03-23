const express = require("express");
const Comment = require("../schemas/comment");
const router = express.Router();

router.post("/commentPost", async (req, res) => {
  const { postId, writer, pw, description, date } = req.body;

  await Comment.create({ postId, writer, pw, description, date });
  const comment = await Comment.findOne({}).sort({ dateCreated: -1 });

  res.json({
    success: true,
    msg: "댓글작성이 완료되었습니다.",
    comment: comment,
  });
});

router.delete("/commentDelete", async (req, res) => {
  const { _id, pw } = req.body;

  const pwCheck = await Comment.find({ _id, pw });
  if (!pwCheck.length) {
    res.json({ success: false, msg: "비밀번호가 틀렸습니다." });
  } else {
    await Comment.deleteOne({ _id });
    res.json({ success: true, msg: "삭제가 완료되었습니다." });
  }
});

module.exports = router;
