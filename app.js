var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

/* var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users'); */
//node
var indexRouter = require("./routes/index");
var bookRouter = require("./routes/book");
var authorRouter = require("./routes/author");
var studentRouter = require("./routes/student");

//Establish a connect to DB
//importing mongo.js
const connectToDB = require("./adapter/mongo.js");
connectToDB();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//node
app.use("/", indexRouter);
app.use("/book", bookRouter);
app.use("/author", authorRouter);
app.use("/student", studentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
