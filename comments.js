// Create web server
// Run: node comments.js
// To test: curl -X POST -H "Content-Type: application/json" -d '{"body": "This is a comment"}' http://localhost:3000/comments
// To test: curl http://localhost:3000/comments/1

// Import statements
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// Create app
const app = express();

// Use middleware
app.use(bodyParser.json());
app.use(morgan("combined"));

// Create in-memory store
let comments = [
  {
    id: 1,
    body: "This is a comment"
  }
];

// Get all comments
app.get("/comments", (req, res) => {
  res.send(comments);
});

// Get comment by id
app.get("/comments/:id", (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) res.status(404).send("The comment with the given ID was not found");
  res.send(comment);
});

// Create new comment
app.post("/comments", (req, res) => {
  const comment = {
    id: comments.length + 1,
    body: req.body.body
  };
  comments.push(comment);
  res.send(comment);
});

// Update comment
app.put("/comments/:id", (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) res.status(404).send("The comment with the given ID was not found");

  comment.body = req.body.body;
  res.send(comment);
});

// Delete comment
app.delete("/comments/:id", (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) res.status(404).send("The comment with the given ID was not found");

  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  res.send(comment);
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));