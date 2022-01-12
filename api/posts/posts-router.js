// implement your posts router here
const express = require('express')
const Post = require('./posts-model.js')
const router = express.Router()

router.get('/', (req, res) => {
    Post.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'The posts information could not be retrieved' })
    })
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Adopter not found' });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error retrieving the post' })
    })
})

router.post('/', (req, res) => {
    Post.insert(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'There was an error while saving the post to the database' })
    })
})

router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message:'The post has been nuked' })
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'The post could not be removed' })
        })
})

router.put('/:id', (req, res) => {
    const changes = req.body
    Post.update(req.params.id, changes)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'The post information could not be modified' })
    })
})

router.get('/:id/comments', (req, res) => {
    Post.findCommentById(req.params.id)
    .then(comment => {
        if (comment.length > 0) {
            res.status(200).json(comment)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist" })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The comments information could not be retrieved" })
    })
})

module.exports = router