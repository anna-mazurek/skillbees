const express = require("express");
const teacherRouter = express.Router();
const Teacher = require("../models/teacher");
const bcrypt = require("bcrypt");
const zxcvbn = require("zxcvbn");
const saltRounds = 10;

const { isLoggedIn, isDuplicate } = require("./../utils/middleware");

teacherRouter.get("/signup", (req, res, next) => {});
teacherRouter.post("/signup", (req, res, next) => {});
teacherRouter.get("/login", (req, res, next) => {});
teacherRouter.post("/login", (req, res, next) => {});
teacherRouter.get("/logout", (req, res, next) => {});

teacherRouter.get("/homepage", isLoggedIn, (req, res, next) => {});
teacherRouter.get("/add-course", isLoggedIn, (req, res, next) => {});
teacherRouter.post("/add-course", isLoggedIn, (req, res, next) => {});
teacherRouter.get("/edit-course", isLoggedIn, (req, res, next) => {});
teacherRouter.post("/edit-course", isLoggedIn, (req, res, next) => {});
teacherRouter.get("/myaccount", isLoggedIn, (req, res, next) => {});

module.exports = teacherRouter;
