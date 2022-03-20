import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("hello, world.");
});

app.listen(process.env.API_PORT, () => {
  console.log(`Listening at http://localhost:${process.env.API_PORT}`);
});
