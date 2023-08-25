const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const urls = require("./public/jsons/urls.json");
const fs = require("fs");

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/shoturl");
});

app.get("/shoturl", (req, res) => {
  res.render("index");
});
app.post("/shoturl", (req, res) => {
  const keyword = req.body["originalUrl"];
  let randomNumber = writeUrlsJson("https://www.google.com.tw/");
  res.render("result", randomNumber);
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});

//亂數生成
function getRandomNumber() {
  const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";

  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

//寫入資料
function writeUrlsJson(addUrl) {
  let randomNumber = getRandomNumber();

  while (urls.url.find((json) => json.randomUrl === randomNumber)) {
    randomNumber = getRandomNumber();
  }

  let urljsonNumber = urls.total;

  let newurl = {
    id: urljsonNumber + 1,
    url: addUrl,
    randomUrl: randomNumber,
  };

  urls.url.push(newurl);
  urls.total = urljsonNumber + 1;
  fs.writeFile(
    "./public/jsons/urls.json",
    JSON.stringify(urls, null),
    (err) => {
      console.log(err);
    }
  );
  return randomNumber;
}
