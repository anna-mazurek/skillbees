const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const zxcvbn = require("zxcvbn");
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
  const passwordCheck = zxcvbn(password);
  if (passwordCheck.score < 3) {
    console.log("passwordCheck.feedback", passwordCheck.feedback);

    res.render("auth-views/signup", {
      errorMessage: passwordCheck.feedback.warning,
      suggestions: passwordCheck.feedback.suggestions,
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
          res.redirect("/user");
        })
        .catch((err) => {
          res.render("auth-views/signup", {
            errorMessage: "There was an error try again!",
          });
        });
    })
    .catch((err) => next(err));
});

authRouter.get("/login", (req, res, next) => {
  res.render("auth-views/login");
});

authRouter.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.render("auth-views/login", { errorMessage: "BYYYYEEEEE" });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.render("auth-views/login", {
          errorMessage: "Username taken, try again",
        });
        return;
      }
      const passwordCorrect = bcrypt.compareSync(password, user.password);
      console.log(passwordCorrect);
      if (passwordCorrect) {
        req.session.currentUser = user;
        res.redirect("/user");
      } else {
        res.render("auth-views/login", {
          errorMessage: "Error please try again",
        });
      }
    })
    .catch((err) => console.log(err));
});

authRouter.get("/logout", (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      next(err);
    } else {
      res.redirect("/auth/login");
    }
  });
});

module.exports = authRouter;
