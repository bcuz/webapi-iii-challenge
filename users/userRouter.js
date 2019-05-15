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

router.post('/:id/posts', validateUserId, async (req, res) => {
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

router.get('/:id', validateUserId, async (req, res) => {
  res.status(200).json(req.user);  
});

router.get('/:id/posts', validateUserId, async (req, res) => {
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

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    await Users.remove(req.params.id);
    
    res.status(200).json({ message: 'The user has been nuked' });
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error removing the user',
    });
  }
});

router.put('/:id', validateUserId, async (req, res) => {
  try {
    const user = await Users.update(req.params.id, req.body);  
    res.status(200).json(user);

  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the user',
    });
  }
});

//custom middleware
async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id);
  
    if (user) {
      req.user = user
      next()
    } else {
      res.status(404).json({ message: 'invalid user id' });
    }    
    } catch (err) {
      res.status(500).json({ message: 'failed to process request' });    
    }
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
