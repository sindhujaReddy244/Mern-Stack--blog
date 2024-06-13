import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, Menu, MenuItem, Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../App.css'; // Ensure you have this file for custom styles

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    content: '',
  });
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5001/blog', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setBlogs(response.data);
      setError('');
    } catch (error) {
      setError('Error fetching blogs: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleAddBlog = async (newBlogData) => {
    try {
      await axios.post('http://localhost:5001/blog', newBlogData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      fetchBlogs();
    } catch (error) {
      setError('Error adding blog: ' + error.message);
    }
  };

  const handleEditBlog = async (id) => {
    try {
      await axios.put(`http://localhost:5001/blog/${id}`, newBlog, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setEditingBlogId(null);
      setNewBlog({
        title: '',
        author: '',
        content: '',
      });
      fetchBlogs();
    } catch (error) {
      setError('Error editing blog: ' + error.message);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      fetchBlogs();
    } catch (error) {
      setError('Error deleting blog: ' + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBlogId) {
      handleEditBlog(editingBlogId);
    } else {
      handleAddBlog(newBlog);
    }
    setShowForm(false);
    setNewBlog({
      title: '',
      author: '',
      content: '',
    });
  };

  const handleClick = (event, blogId) => {
    setAnchorEl(event.currentTarget);
    setEditingBlogId(blogId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setEditingBlogId(null);
  };

  

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <div className='blog-main-container'>
      <h1 className='login-heading'>Blog Component</h1> 
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <button 
          onClick={() => setShowForm(true)} 
          style={{ 
            backgroundColor: 'blue', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            cursor: 'pointer' 
          }}
        >
          Add Blog
        </button>
        <button 
          onClick={handleLogout} 
          style={{ 
            backgroundColor: 'red', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            cursor: 'pointer' 
          }}
        >
          Logout
        </button>
      </Box>
      <div>
        <h2>Blogs</h2>
        <Box display="flex" flexWrap="wrap">
          {blogs.map((blog) => (
            <Box key={blog._id} className="blog-card" border={1} padding={2} margin={1} width={300}>
              <div className="blog-content">
                <div className="blog-header">
                  <h3 className="blog-title">{blog.title}</h3>
                  <IconButton onClick={(e) => handleClick(e, blog._id)} className="more-button">
                    <MoreVertIcon />
                  </IconButton>
                </div>
                <p className="blog-text">{blog.content}</p>
                <p className="blog-info">Author: {blog.author}</p>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && editingBlogId === blog._id}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleDeleteBlog(blog._id)}>Delete</MenuItem>
                </Menu>
              </div>
            </Box>
          ))}
        </Box>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Dialog open={showForm} onClose={() => setShowForm(false)}>
        <DialogTitle>{editingBlogId ? 'Edit Blog' : 'Add Blog'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              label="Title"
              name="title"
              value={newBlog.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Author"
              name="author"
              value={newBlog.author}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Content"
              name="content"
              value={newBlog.content}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">{editingBlogId ? 'Update' : 'Submit'}</Button>
            <Button variant="contained" onClick={() => setShowForm(false)}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Blogs;
