const express = require('express');;

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = await Users.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the user',
    });
  }
});

router.post('/:id/posts', async (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id };

  try {
    const post = await Posts.insert(postInfo);
    res.status(201).json(post);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the post',
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'user not found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the user',
    });
  }
});

router.get('/:id/posts', async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);

    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: 'no posts not found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the user's post",
    });
  }
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
