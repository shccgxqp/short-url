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
  // 搜尋網頁有無紀錄，沒有就生成，有就返回亂數
  urlModel
    .findOne({ originalURL: keyword })
    .then((url) => {
      if (url !== null) {
        return res.render("result", { randomSring: url.randomURL });
      } else {
        //判斷有無重複亂數，有重新判斷已存在亂數，沒有生成新資料
        const insertRandom = () => {
          let random = randomjs.getRandomNumber(5);
          urlModel
            .findOne({ randomURL: random })
            .then((ur2) => {
              if (ur2 !== null) {
                insertRandom(keyword);
              } else {
                insertPostData(keyword, random).then(() => {
                  res.render("result", { randomSring: random });
                });
              }
            })
            .catch((err) => console.error(err));
        };

        insertRandom();
      }
    })
    .catch((err) => console.error(err));
});

//monogoDB INSERT
async function insertPostData(url1, url2) {
  await urlModel.insertMany([
    {
      originalURL: url1,
      randomURL: url2,
    },
  ]);
}

module.exports = routes;
