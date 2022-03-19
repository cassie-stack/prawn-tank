import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("hello, world.");
});

app.listen(8001, () => {
  console.log(`Listening at http://localhost:8001`);
});
