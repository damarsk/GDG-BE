const path = require("path");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const app = express();
const port = 8080;

let comments = [
  {
    id: "0919796e-9c1d-4915-a250-5ad6a3084abe",
    username: "fufufafa",
    comment: "damar ganteng",
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});
app.get("/comments/create", (req, res) => {
  res.render("comments/create");
});
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});
app.get("/comments/edit/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});
app.post("/comments/create", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ id: uuidv4(), username, comment });
  res.redirect("/comments");
});
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newComment;
  res.redirect("/comments");
});
app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.listen(port, () => {
  console.log("✅Active");
});
