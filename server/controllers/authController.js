const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(403).json({ error: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.json({ message: 'Registration successful' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    // Validate email and password presence
    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter email and password' });
    }
  
    // Check if user with provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email not registered' });
    }
  
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
  
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
    res.json({ token });
    
  };
