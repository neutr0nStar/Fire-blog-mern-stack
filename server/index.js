/*
backend main file
uses Mongoose to connect to mongoDB atlas
and expressjs for CRUD requests
*/
//imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//app
const app = express();

// app use
app.use(express.json());
app.use(cors());

// MongoDB
const dbURI =
  "mongodb+srv://user1:<password>cluster0.dt1ew.mongodb.net/Learning?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected");
  })
  .catch((e) => console.log(e));

// Schema for the blogs
const BlogSchema = new mongoose.Schema({
  title: String,
  snippet: String,
  content: String,
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

// Blog Model
const Blog = mongoose.model("Blog", BlogSchema);

// port
const port = 3001;

/*
routes
*/

// get
app.get("/", (req, res) => {
  res.send("<h1>Fire Blog Backend</h1><p>Use /api to access api</p>");
});

app.get("/api/blogs", (req, res) => {
  Blog.find((err, blogs) => {
    if (err) console.log(err);
    res.send(blogs);
  });
});

app.get("/api/blog/:id", (req, res) => {
  Blog.findOne({ _id: req.params.id }, (err, blog) => {
    if (err) console.log(err);
    res.send(JSON.stringify(blog));
  });
  // res.send();
});

// post
app.post("/api/create", (req, res) => {
  Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    content: req.body.content,
  })
    .save()
    .then(() => res.status(200))
    .catch((e) => res.status(400));
  res.send();
});

// update
app.put("/api/update/blog/:id", (req, res) => {
  Blog.updateOne(
    { _id: req.params.id },
    {
      title: req.body.title,
      snippet: req.body.snippet,
      content: req.body.content,
    }
  )
    .then(() => res.status(200))
    .catch((e) => res.status(400));
  res.send();
});

// delete
app.delete("/api/blog/:id", (req, res) => {
  Blog.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200);
    })
    .catch((e) => res.status(400));
  res.send();
});

// start the server
app.listen(port, () => console.log("server running on port 3001.."));
