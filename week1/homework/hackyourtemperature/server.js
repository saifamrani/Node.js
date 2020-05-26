const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});
const PORT = process.env.port || 3000;
app.listen(PORT, () => console.log("server is running ..."));