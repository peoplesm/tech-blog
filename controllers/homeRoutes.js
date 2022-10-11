const router = require('express').Router();
const { restart } = require('nodemon');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//Get all the posts to display on homepage
router.get('/', async (req, res) => {
  try {
    const data = await Post.findAll({
      include: [
        {
          model: User,
        },
      ],
      order: [
        ['date_created', 'DESC'],
        ['id', 'DESC'],
      ],
    });

    const posts = data.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Register route
router.get('/register', (req, res) => {
  res.render('register');
});

// new post
router.get('/new-post', (req, res) => {
  res.render('new-post', { loggedIn: true });
});

//one post for commenting
router.get('/comment/:id', async (req, res) => {
  try {
    const newComment = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });
    const post = newComment.get({ plain: true });

    res.render('comment', { post, loggedIn: true });
  } catch (err) {
    res.status(500).json('Comment error');
  }
});

router.get('/dashboard', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ['id', 'title', 'content', 'date_created'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'content', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((data) => {
      const posts = data.map((post) => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Selected post
router.get('/selected-post/:id', (req, res) => {
  res.render('selected-post', { loggedIn: true });
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;
