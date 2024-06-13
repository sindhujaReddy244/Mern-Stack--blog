const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
 const blogRoutes = require('./routes/blogRoutes');

const app = express();
const PORT = 5001;
// Use CORS middleware
app.use(cors());

connectDB();

app.use(express.json());
app.use('/api', authRoutes);
 app.use('/blog', blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
