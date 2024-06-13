const Blog = require('../model/blogSchema');

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blogs' });
  }
};

// Create a new blog
const createBlog = async (req, res) => {
    try {
      console.log('Request Body:', req.body); // Add this line for debugging
      const newBlog = new Blog(req.body);
      const savedBlog = await newBlog.save();
      res.status(201).json({ message: 'Blog added successfully', blog: savedBlog });
    } catch (error) {
      console.log('Error:', error.message); // Add this line for debugging
      res.status(400).json({ error: 'Error creating blog' });
    }
  };
  
  
  
  

// Update a blog by ID
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ error: 'Error updating blog' });
  }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting blog' });
  }
};

module.exports = { getAllBlogs, createBlog, updateBlog, deleteBlog };
