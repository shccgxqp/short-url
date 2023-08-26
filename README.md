# AC 學期 C3 M6 ｜ 短網址產生器

利用 Node.js 和 Express 打造一個簡單的短網址產生器。

## 基本功能

(1)首頁畫面上有一個表單，使用者可以在表單輸入原始網址，如 https://www.google.com
(2)送出表單之後，畫面會回傳格式化後的短網址，如 https://your-project-name.herokuapp.com/6y7UP
(3)在伺服器啟動期間，使用者可以在瀏覽器的網址列，輸入你提供的短網址，如 https://your-project-name.herokuapp.com/6y7UP，瀏覽器就會導向原本的網站，如 https://www.google.com
(4)短網址輸出格式為 5 碼英數組合
(5)使用 MongoDB & Mongoose 完成專案
(6)程式邏輯需包括以下例外處理，請使用註解標註出相關段落：

- 輸入相同網址時，產生一樣的縮址。
- 輸入不同的網址時，防止有重覆的網址組合出現。
- 若使用者沒有輸入內容，就按下了送出鈕，需要防止表單送出並提示使用者

## Getting Started

Clone respository to your local computer

```
$ git clone https://github.com/shccgxqp/short-url.git
```

Install by npm

```
$ npm install
```

Execute

```
$ npm run dev
```

Terminal show the message

```
express server is running on http://localhost:3000
```

Now you can browse the website on

```
http://localhost:3000
```

## 安裝套件

- Node.js: 18.15.0
- Express: 4.18.2
- Express-Handlebars: 7.1.2
- body-parser: 1.19.0
- mongoose: 7.4.4
- dotenv: 16.3.1
- Bootstrap: 5.1.3
