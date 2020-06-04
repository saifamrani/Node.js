'use strict';
const express = require('express'),
  fs = require('fs'),
  path = require('path'),
  app = express(),
  hostName = 'localhost',
  port = process.env.PORT || 3000;

app.use(express.json());

// this function is to check if the post is valid or not
function postIsValid(req) {
  if (
    typeof req.body === 'undefined' ||
    typeof req.body.title === 'undefined' ||
    typeof req.body.content === 'undefined'
  ) {
    return true;
  }
  return false;
}
//the basic Express setup that has one endpoint (/).
app.all('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200);
  res.send('you are in the blog page');
});

// Creating new posts with post method
app.post('/blogs', (req, res) => {
  if (postIsValid(req)) {
    res.status(400);
    res.send('invalid request');
    return;
  }
  const newBlog = {
    title: req.body.title,
    content: req.body.content,
  };
  const title = `${newBlog.title}.html`;
  const content = `<html><body><p>${newBlog.content}</p></body></html>`;
  fs.writeFileSync(title, content);
  res.status(201);
  res.end(' your post has been Created!');
});
// updating the post with the put method
app.put('/blogs', (req, res) => {
  if (postIsValid(req)) {
    res.status(400);
    res.send('invalid request');
    return;
  }
  const updateBlog = {
    title: req.body.title,
    content: req.body.content,
  };
  const title = `${updateBlog.title}.html`;
  const content = `<html><body><p>${updateBlog.content}</p></body></html>`;
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end(' your post has been Updated!');
    return;
  }
  res.status(404).end(`${title} post does not exist!`);
});

// deleting the post with the delete method
app.delete('/blogs/:title', (req, res) => {
  const title = `${req.params.title}.html`;
  if (fs.existsSync(title)) {
    fs.unlinkSync(title);
    res.end(' your post has been Deleted');
    return;
  }
  res.status(404).end(`${title} post does not exist!`);
});

// reading the post with the get method

app.get('/blogs/:title', (req, res) => {
  const title = `${req.params.title}.html`;
  fs.existsSync(title)
    ? res.sendFile(path.join(__dirname, title))
    : res.status(404).end(`${title} post does not exist!`);
});

// listen on the local poet 3000

app.listen(port, hostName, () =>
  console.log(`The server running on  http://${hostName}:${port}/`),
);
