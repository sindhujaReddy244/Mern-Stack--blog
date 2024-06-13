const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authenticateToken = require('../middleware/authMiddleware');

// GET all blogs
// router.get('/', blogController.getAllBlogs);
router.get('/', authenticateToken, blogController.getAllBlogs);

// POST create a new blog
router.post('/', blogController.createBlog);



// DELETE delete a blog by ID
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
