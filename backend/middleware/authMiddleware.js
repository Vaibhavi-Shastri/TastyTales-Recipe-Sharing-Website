
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
      console.log('Authorization header:', req.headers.authorization);

      if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
          return res.status(401).json({ message: 'Not authorized, no token' });
      }

      const token = req.headers.authorization.split(' ')[1];
      console.log('Extracted token:', token);

      // Verify token and attach user to the request object
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      console.log('Decoded user:', req.user);
      next();
  } catch (error) {
      console.error('Error in protect middleware:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
  }
};


module.exports = { protect };
