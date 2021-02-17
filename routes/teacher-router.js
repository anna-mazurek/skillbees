const express = require("express");
// const Course = require("../models/course");
const Teacher = require("../models/teacher");
const teacherRouter = express.Router();
const bcrypt = require("bcrypt");
const zxcvbn = require("zxcvbn");
const saltRounds = 10;

const { isLoggedIn, isDuplicate } = require("../utils/middleware");
const Course = require("../models/course");

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
  Teacher.findOne({ email })
    .then((teacher) => {
      if (teacher !== null) {
        res.render("teacher-views/signup", {
          errorMessage: "Sorry there's an error, please try again.",
        });
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPW = bcrypt.hashSync(password, salt);
      Teacher.create({ fullname, email, password: hashedPW, about })
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
  Teacher.findOne({ email })
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
  req.session.destroy(function (err) {
    if (err) {
      next(err);
    } else {
      res.redirect("/login");
    }
  });
});

teacherRouter.get("/homepage", isLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  const teacher = await Teacher.findById(_id).populate("courses");
  const data = { courses: teacher.courses };
  res.render("teacher-views/homepage", data);
});

teacherRouter.get("/add-course", isLoggedIn, (req, res, next) => {
  res.render("teacher-views/add-course");
});
teacherRouter.post("/add-course", isLoggedIn, (req, res, next) => {
  const {
    name,
    technology,
    level,
    duration,
    description,
    link,
    image,
  } = req.body;
  Course.create({ name, technology, level, duration, description, link, image })
    .then((createdCourse) => {
      const { _id } = req.session.currentUser;
      const courseId = createdCourse._id;
      const user = Teacher.findByIdAndUpdate(
        _id,
        { $push: { courses: courseId } },
        { new: true }
      ).then((response) => {
        res.redirect("/teacher/homepage");
      });
    })
    .catch((err) => console.log(err));
});

teacherRouter.get("/edit/:courseId", isLoggedIn, (req, res, next) => {
  const { courseId } = req.params;
  Course.findById(courseId)
    .then((oneCourse) => {
      const data = { oneCourse };
      res.render("teacher-views/edit-course", data);
    })
    .catch((err) => console.log(err));
});
teacherRouter.post("/edit/:courseId", isLoggedIn, (req, res, next) => {
  const { courseId } = req.params;
  const {
    name,
    technology,
    level,
    duration,
    description,
    link,
    image,
  } = req.body;
  Course.findByIdAndUpdate(
    courseId,
    {
      name,
      technology,
      level,
      duration,
      description,
      link,
      image,
    },
    { new: true }
  )
    .then((updatedCourse) => {
      res.redirect("/teacher/homepage");
    })
    .catch((err) => console.log(err));
});

teacherRouter.post("/:courseId/remove", isLoggedIn, (req, res, next) => {
  const { courseId } = req.params;
  const { _id } = req.session.currentUser;
  Course.findOneAndRemove(courseId)
    .then((removedCourse) => {
      res.redirect("/teacher/homepage");
    })
    .catch((err) => console.log(err));
});

teacherRouter.get("/myaccount", isLoggedIn, async (req, res, next) => {
  const { _id: teacherId } = req.session.currentUser;
  const user = await Teacher.findById(teacherId);
  const data = { user };
  res.render("teacher-views/myaccount", data);
});

module.exports = teacherRouter;
