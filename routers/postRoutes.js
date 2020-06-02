const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/', async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).send(posts);
  } catch(err) {
    res.status(500).json({ error: "The posts information could not be retrieved." });
  }
})

router.get('/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if(post.length === 0) {
      return res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
    res.status(200).send(post);
  } catch (err) {
    res.status(500).json({ error: "The posts information could not be retrieved." });
  }
})

router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await db.findPostComments(req.params.id);
    if (comments.length === 0) {
      return res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
    res.status(200).send(comments);
  } catch(err) {
    res.status(500).json({ error: "The comments information could not be retrieved." });
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, contents } = req.body;
    if(!title || !contents) {
      return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    const post = await db.insert(req.body);
    res.status(201).send({...post, ...req.body});
  } catch(err) {
    res.status(500).json({ error: "There was an error while saving the post to the database" });
  }
})

router.post('/:id/comments', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if(post.length === 0) {
      return res.status(404).json({ message: "The post with the specified ID does not exist." }); 
    }
    if(post.id !== req.params.post_id) {
      return res.status(400).json({ error: "The ids in your request do not match" });
    }
    if(!req.body.text) {
      return res.status(400).json({ errorMessage: "Please provide text for the comment." });
    }

    const id = await db.insertComment(req.body);
    res.status(201).send({...id, ...req.body});
  } catch (err) {
    res.status(500).json({ error: "There was an error while saving the comment to the database" })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await db.remove(req.params.id);
    if(!deleted) {
      return res.status(404).json({ message: "The post with the specified ID does not exist." });
    }

    res.status(200).send(`Successfully deleted post ${req.params.id}`);
  } catch(err) {
    res.status(500).json({ error: "The post could not be removed" });
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { title, contents } = req.body;
    const post = await db.findById(req.params.id);
    if(post.length === 0) {
      return res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
    if(!contents || !title) {
      return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    await db.update(req.params.id, req.body);

    const updatedPost = await db.findById(req.params.id);

    res.status(200).send(updatedPost);
  } catch(err) {
    res.status(500).json({ error: "The post information could not be modified." });
  }
})

module.exports = router;