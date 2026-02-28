let express = require('express');
let router = express.Router();
const { createBlog, displayBlogs, displayBlog} = require('../controllers/blogcontroller');
const { createComment, displayComments, displayComment } = require('../controllers/commentcontroller');

// Create a new blog post
router.post('/posts', createBlog);
router.get('/posts', displayBlogs);
router.get('/posts/:id', displayBlog);


// Create, read, update, and delete comments for a specific blog post
// Note: The comment routes are nested under the blog post routes to maintain context
router.get('/posts/:id/comments', displayComments) // Get all comments for a specific blog post
router.post('/posts/:id/comments', createComment); // Create a new comment for a specific blog post
router.get('/posts/:id/comments/:commentId', displayComment); // Get a specific comment by ID for a specific blog post

module.exports = router;