const express = require("express");
const urlModel = require("../models/urlModel");
const randomjs = require("../public/javascripts/random");
const routes = express.Router();

// GET
routes.get("/", (req, res) => {
  res.render("index");
});

routes.get("/:url", (req, res) => {
  urlModel
    .findOne({ randomURL: req.params.url })
    .then((url) =>
      url !== null
        ? res.redirect(url.originalURL)
        : Promise.reject(new Error("No such address exists"))
    )
    .catch((err) => res.status(400).json({ error: err.message }));
});

// POST
routes.post("/", (req, res) => {
  const keyword = req.body["originalUrl"];

  //判斷文字是否空白
  if (keyword === "") {
    return res.render("index");
  }
  let randomSring = "";

  // 搜尋網頁有無紀錄，沒有就生成，有就返回亂數
  urlModel
    .findOne({ originalURL: keyword })
    .then((url) => {
      if (url !== null) {
        randomSring += url.randomURL;
      } else {
        let random = randomjs.getRandomNumber(5);

        //判斷有無重複亂數，有重新判斷，沒有繼續創造新資料
        function insertRandom() {
          urlModel
            .findOne({ randomURL: random })
            .then((ur2) => {
              if (ur2 !== null) {
                insertRandom();
              } else {
                insertPostData(keyword, random);
                randomSring += random;
              }
            })
            .catch((err) => console.error(err));
        }

        insertRandom();
      }
    })
    .then(() => {
      res.render("result", { randomSring: randomSring });
    })
    .catch((err) => console.error(err));
});

//monogoDB INSERT
function insertPostData(url1, url2) {
  urlModel.insertMany([
    {
      originalURL: url1,
      randomURL: url2,
    },
  ]);
}

module.exports = routes;
