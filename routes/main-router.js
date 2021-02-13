const express = require("express");
const Course = require("../models/course");
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

mainRouter.get("/courses/:technology",isLoggedIn, (req, res, next) => {
  const {technology} = req.params
  Course.find({technology})
  res.render("user-views/technology-view");
}); 

module.exports = mainRouter;
