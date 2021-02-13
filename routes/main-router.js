const express = require("express");
const mainRouter = express.Router();

const { isLoggedIn } = require("./../utils/middleware");

module.exports = mainRouter;
