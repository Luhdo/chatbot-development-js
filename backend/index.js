require("dotenv").config();
const express = require("express");
const generate = require("./generate");

const app = express();

app.use(require("cors")());
app.use(express.json());

const strings = require("./intents.json").intents.map((i) => ({
  t: i.tag,
  p: i.patterns,
  r: i.responses,
}));
let patterns = strings.map((i) => i.p).flat();
app.post("/predict", (req, res) => {
  const message = generate(req.body["message"], patterns);
  let answer = strings.find((s) =>
    s.p.includes(patterns.find((p) => p == message))
  );

  res
    .status(200)
    .send({ answer: answer.r[Math.floor(Math.random() * answer.r.length)] });
});

app.listen(process.env.PORT || 5000, () =>
  console.log("listening on port " + process.env.PORT || 5000)
);
