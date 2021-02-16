const express = require("express");
const Course = require("../models/course");
const User = require("../models/user");
const userRouter = express.Router();

const { isLoggedIn, isDuplicate } = require("../utils/middleware");

userRouter.get("/", isLoggedIn, (req, res, next) => {
  Course.find({})
    .limit(4)
    .then((allCourses) => {
      const data = { allCourses };
      res.render("user-views/homepage", data);
    })
    .catch((err) => console.log(err));
});

userRouter.get("/courses", isLoggedIn, (req, res, next) => {
  Course.find()
    .then((allCourses) => {
      const data = {
        allCourses: allCourses,
      };
      res.render("user-views/courses-view", data);
    })
    .catch((err) => console.log(err));
});

userRouter.get("/courses/:technology", isLoggedIn, (req, res, next) => {
  const { technology } = req.params;
  const techLowercased = technology.toLowerCase();
  Course.find({ technology: techLowercased })
    .then((courses) => {
      const data = { courses: courses };
      res.render("user-views/technology-view", data);
    })
    .catch((err) => console.log(err));
});

//ADD COURSE
userRouter.post(
  "/:courseId/favorites",
  isLoggedIn,
  isDuplicate,
  async (req, res, next) => {
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
      return res.redirect("/user/favorites");
    } catch (error) {
      console.log(error);
    }
  }
);

//MY COURSES
userRouter.get("/favorites", isLoggedIn, async (req, res, next) => {
  const { _id: userId } = req.session.currentUser;
  const user = await User.findById(userId).populate("courses");
  const data = { courses: user.courses };
  res.render("user-views/favorites", data);
});

// REMOVE COURSE
userRouter.post("/:courseId/remove", isLoggedIn, async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { _id: userId } = req.session.currentUser;
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return console.log("Handle error here");
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { courses: courseId } },
      { new: true }
    );
    return res.redirect("/user/favorites");
  } catch (error) {
    console.log(error);
  }
});

// MY ACCOUNT
userRouter.get("/account", isLoggedIn, async (req, res, next) => {
  const { _id: userId } = req.session.currentUser;
  const user = await User.findById(userId);
  const data = { user };
  res.render("user-views/myaccount", data);
});

// DELETE	PROFILE
userRouter.get("/delete", isLoggedIn, function (req, res, next) {
  const { _id: userId } = req.session.currentUser;
  User.findById(userId)
    .then((theUser) => theUser.remove())
    .then(() => req.session.destroy())
    .then(() => res.redirect("/"));
});

module.exports = userRouter;

