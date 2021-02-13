const express = require("express");
const Course = require("../models/course");
const mainRouter = express.Router();

const { isLoggedIn } = require("./../utils/middleware");

mainRouter.get("/", isLoggedIn, (req, res, next) => {
  res.render("user-views/homepage");
});

module.exports = mainRouter;
