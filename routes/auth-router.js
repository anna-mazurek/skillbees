const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
authRouter.get("/signup", (req, res, next) => {
  res.render("auth-views/signup");
});
authRouter.post("/signup", (req, res, next) => {
  const { fullname, email, password } = req.body;
  if (fullname === "" || email === "" || password === "") {
    res.render("auth-views/signup", {
      errorMessage: "Please enter all your details",
    });
    return;
  }
  User.findOne({ email })
    .then((user) => {
      if (user !== null) {
        res.render("auth-views/signup", {
          errorMessage: "There was an error, try again",
        });
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPW = bcrypt.hashSync(password, salt);
      User.create({ fullname, email, password: hashedPW })
        .then((createdUser) => {
          res.redirect("/");
        })
        .catch((err) => {
          res.render("auth-views/signup", {
            errorMessage: "There was an error try again!",
          });
        });
    })
    .catch((err) => next(err));
});
module.exports = authRouter;