const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//Get all the posts to display on homepage
router.get("/", async (req, res) => {
  try {
    const data = await Post.findAll({
      include: [
        {
          model: User,
        },
      ],
      order: [
        ["date_created", "DESC"],
        ["id", "DESC"],
      ],
    });

    const posts = data.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
