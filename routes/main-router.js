const express = require("express");
const mainRouter = express.Router();

const { isLoggedIn } = require("./../utils/middleware");

mainRouter.get("/", isLoggedIn, (req, res, next) => {
  res.render("user-views/homepage");
});

module.exports = mainRouter;
