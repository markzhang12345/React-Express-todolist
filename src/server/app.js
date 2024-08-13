let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");

let registerRouter = require("./routes/register");
let loginRouter = require("./routes/login");
let taskRouter = require("./routes/tasks");
let logoutRouter = require("./routes/logout");

let app = express();

//连接mongoodb

mongoose
  .connect(
    "mongodb+srv://admin:admin@todolist.jubog.mongodb.net/?retryWrites=true&w=majority&appName=todolist"
  )
  .then(() => console.log("mongodb connect"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "http://localhost:3000", // 允许的前端地址
    credentials: true, // 允许客户端发送凭证（例如 cookies）
  })
);
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", registerRouter);
app.use("/api", loginRouter);
app.use("/api", taskRouter);
app.use("/api", logoutRouter);

module.exports = app;
