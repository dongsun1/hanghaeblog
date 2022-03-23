const express = require("express");
const connect = require("./schemas");
const Post = require("./schemas/post");
const Comment = require("./schemas/comment");
const cors = require("cors");
const app = express();
const port = 3000;

connect();

const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

const requestMiddleware = (req, res, next) => {
  console.log("Request URL:", req.originalUrl, " - ", new Date());
  next();
};

app.use(cors());
app.set("view engine", "ejs");
app.set("views", "./static");
app.engine("html", require("ejs").renderFile);
app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded());
app.use(requestMiddleware);
app.use("/api", [postsRouter, commentsRouter]);

app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("index.ejs", { posts });
});

app.get("/write", (req, res) => {
  res.render("write.ejs");
});

app.get("/detail/:id", async (req, res) => {
  const detail = await Post.findById(req.params.id);
  const comment = await Comment.find({ postId: req.params.id });
  res.render("detail.ejs", { detail, comment });
});

app.get("/update/:id", async (req, res) => {
  const detail = await Post.findById(req.params.id);
  res.render("update.ejs", { detail });
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요!");
});
