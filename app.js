const express = require("express");
const { engine } = require("express-handlebars");
const routes = require("./routes");
const connectDB = require("./config/mongoose");

const app = express();
const port = 3000;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

//connect mongoose
connectDB();
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
