function isLoggedIn(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/auth/login");
  }
}

function technologyMiddleware(technologiesArray) {
  function technologyChecker(req, res, next) {
    if (technologiesArray.includes(req.course.technology)) {
      next();
    } else {
      res.redirect("/user");
    }
  }
  return technologyChecker;
}

module.exports = { isLoggedIn, technologyMiddleware };
