const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

//   api/posts

//get post by id
router.get('/:id', withAuth, async (req, res) => {
  try {
    const data = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });

    const post = data.get({ plain: true });
    res.status(200).json(post);
    res.render('post', {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//create new post
router.post('/', withAuth, async (req, res) => {
  try {
    const data = await Post.create({
      title: req.body.title,
      date_created: Date.now(),
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update post by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const data = await Post.update(
      {
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        date_created: req.body.dateCreated,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    if (!data) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const data = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!data) {
      res.status(400).json({ message: 'No post with this id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
