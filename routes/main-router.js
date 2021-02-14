const express = require("express");
const Course = require("../models/course");
const User = require("../models/user");
const mainRouter = express.Router();

const { isLoggedIn } = require("./../utils/middleware");
const { technologyMiddleware } = require("./../utils/middleware");

mainRouter.get("/", isLoggedIn, (req, res, next) => {
  res.render("user-views/homepage");
});

mainRouter.get("/courses", isLoggedIn, (req, res, next) => {
  Course.find()
    .then((allCourses) => {
      const data = {
        allCourses: allCourses,
      };
      res.render("user-views/courses-view", data);
    })
    .catch((err) => console.log(err));
});

mainRouter.get("/courses/:technology", isLoggedIn, (req, res, next) => {
  const { technology } = req.params;
  const techLowercased = technology.toLowerCase();
  Course.find({ technology: techLowercased })
    .then((courses) => {
      const data = { courses: courses };
      res.render("user-views/technology-view", data);
    })
    .catch((err) => console.log(err));
});

mainRouter.get("/favorites", isLoggedIn, (req, res, next) => {
  res.render("user-views/favorites");
});

mainRouter.post("/:courseId/favorites", isLoggedIn, (req, res, next) => {
  const courseId = req.params.courseId;
  User.findByIdAndUpdate(req.session.currentUser)
    .then((addedFavorite) => {
      const data = {
        favorites: addedFavorite,
      };
      res.redirect("/favorite", data);
    })
    .catch((err) => console.log(err));
});

module.exports = mainRouter;
