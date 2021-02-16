const User = require("../models/user");
const Teacher = require("../models/teacher");

function isLoggedIn(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/auth/login");
  }
}

async function isDuplicate(req, res, next) {
  const { courses } = await User.findById(req.session.currentUser._id);

  if (!courses.includes(req.params.courseId)) {
    next();
  } else {
    res.redirect("/user/favorites");
  }
}

module.exports = { isLoggedIn, isDuplicate };
