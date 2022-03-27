var express = require('express');
var app = express();

absolutePath = __dirname + "/public";


if (process.env.MESSAGE_STYLE === "uppercase") {
  response = "Hello json".toUpperCase();
} else {
  response = "Hello json";
}

app.use("/public", express.static(absolutePath));

app.use((req, res, next)=>{
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", function (req, res) {
  absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
  res.json({
    message: 'Hello json'
  });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});






























 module.exports = app;
