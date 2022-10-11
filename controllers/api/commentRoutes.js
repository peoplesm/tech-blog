const router = require('express').Router();
const { Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

//get all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [{ model: Post }],
    });
    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create comment
router.post('/', async (req, res) => {
  try {
    const data = await Comment.create({
      date_created: Date.now(),
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.postId,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const data = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!data) {
      res.status(400).json({ message: 'No comment with this id!' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
