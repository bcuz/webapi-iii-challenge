const express = require('express');;

const Posts = require('./postDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.get();
    res.status(200).json(posts);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  }
});

router.get('/:id', async (req, res) => {
  // will refactor later
  try {
    const post = await Posts.getById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'post not found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the post',
    });
  }  
});

router.delete('/:id', async (req, res) => {
  try {
    let removed = await Posts.remove(req.params.id);    
    
    if (removed) {
      res.status(200).json({ message: 'The post has been nuked' });
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error removing the post',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await Posts.update(req.params.id, req.body);  

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the post',
    });
  }

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;