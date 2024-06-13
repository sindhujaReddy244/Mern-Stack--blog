const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET_KEY;

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  // Check if the token format is incorrect (missing "Bearer" prefix)
  if (!token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  // Extract the token without the "Bearer" prefix
  const tokenWithoutBearer = token.slice(7);

  // Verify the token and check its expiration
  jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired' });
      } else {
        return res.status(403).json({ message: 'Invalid token' });
      }
    }

    // Token is valid, and you can access its payload in `decoded`
    req.user = decoded;
      next();
    });
  };

module.exports = authenticateToken;


    