const withAuth = (req, res, next) => {
  //Checks if user is logged in, if no redirect to login route.
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
