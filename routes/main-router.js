const express = require("express");
const Course = require("../models/course");
const User = require("../models/user");
const mainRouter = express.Router();

const { isLoggedIn } = require("./../utils/middleware");

mainRouter.get("/", isLoggedIn, (req, res, next) => {
  Course.find({}, { limit: 5 })
    .then((allCourses) => {
      const data = { allCourses };
      res.render("user-views/homepage", data);
    })
    .catch((err) => console.log(err));
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

mainRouter.post("/:courseId/favorites", isLoggedIn, async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { _id: userId } = req.session.currentUser;
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return console.log("Handle error here");
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { courses: courseId } },
      { new: true }
    );
    return res.redirect("/user/mycourses");
  } catch (error) {
    console.log(error);
  }
});

mainRouter.get("/mycourses", isLoggedIn, async (req, res, next) => {
  const { _id: userId } = req.session.currentUser;
  const user = await User.findById(userId).populate("courses");
  const data = { courses: user.courses };
  res.render("user-views/mycourses", data);
});

mainRouter.get("/account", isLoggedIn, (req, res, next) => {
  res.render("user-views/myaccount");
});

module.exports = mainRouter;
