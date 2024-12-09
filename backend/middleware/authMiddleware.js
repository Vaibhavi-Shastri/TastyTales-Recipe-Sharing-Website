const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        return next(); // Ensure the flow stops here if successful
      } else {
        return res.status(403).json({ message: 'Not authorized, please login' }); // Fixing response
      }
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' }); // Fixing response
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, token missing' }); // Fixing response
  }
};

module.exports = { protect };
