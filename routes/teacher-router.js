const express = require("express");
const Course = require("../models/course");
const Teacher = require("../models/teacher");
const teacherRouter = express.Router();

const { isLoggedIn, isDuplicate } = require("../utils/middleware");

teacherRouter.get("/signup", (req, res, next) => {
  res.render("teacher-views/signup");
});
teacherRouter.post("/signup", (req, res, next) => {
  const { fullname, email, password, about } = req.body;
  if (fullname === "" || email === "" || password === "" || about === "") {
    res.render("teacher-views/signup", {
      errorMessage: "Please enter all your details",
    });
    return;
  }
  const passwordCheck = zxcvbn(password);
  if (passwordCheck.score < 3) {
    res.render("teacher-views/signup", {
      errorMessage: passwordCheck.feedback.warning,
      suggestions: passwordCheck.feedback.suggestions,
    });
    return;
  }
  User.findOne({ email })
    .then((teacher) => {
      if (teacher !== null) {
        res.render("teacher-views/signup", {
          errorMessage: "Sorry there's an error, please try again.",
        });
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPW = bcrypt.hashSync(password, salt);
      User.create({ fullname, email, password: hashedPW })
        .then((createdTeacher) => {
          req.session.currentUser = createdTeacher; // creates the session and the cookie, logs in the user right away
          res.redirect("/teacher/homepage");
        })
        .catch((err) => {
          // res.render("auth-views/signup", {
          //   errorMessage: "There was an error try again!",
          // });
          next(err);
        });
    })
    .catch((err) => next(err));
});
teacherRouter.get("/login", (req, res, next) => {
  res.render("teacher-views/login");
});
teacherRouter.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.render("teacher-views/login", {
      errorMessage: "Please enter all your details",
    });
    return;
  }
  User.findOne({ email })
    .then((teacher) => {
      if (!teacher) {
        res.render("teacher-views/login", {
          errorMessage: "Incorrect details, try again",
        });
        return;
      }
      const passwordCorrect = bcrypt.compareSync(password, teacher.password);
      console.log(passwordCorrect);
      if (passwordCorrect) {
        req.session.currentUser = teacher;
        res.redirect("/teacher/homepage");
      } else {
        res.render("teacher-views/login", {
          errorMessage: "Error please try again",
        });
      }
    })
    .catch((err) => console.log(err));
});

teacherRouter.get("/logout", (req, res, next) => {
  eq.session.destroy(function (err) {
    if (err) {
      next(err);
    } else {
      res.redirect("/teacher/login");
    }
  });
});

// app.get("/homepage", isLoggedIn, (req, res, next) => {});
// app.get("/add-course", isLoggedIn, (req, res, next) => {});
// app.post("/add-course", isLoggedIn, (req, res, next) => {});
// app.get("/edit-course", isLoggedIn, (req, res, next) => {});
// app.post("/edit-course", isLoggedIn, (req, res, next) => {});
// app.get("/myaccount", isLoggedIn, (req, res, next) => {});

module.exports = teacherRouter;
