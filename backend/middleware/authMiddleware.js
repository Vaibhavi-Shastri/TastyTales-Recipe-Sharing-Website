
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  
  if (req.headers.authorization) {
    let token = req.headers.authorization;
    try {  
      if(token){
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
      }
      else{
        return res.sendStatus(403).json({ message: 'Not authorized, Please login' });;
      }
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  else{
    res.sendStatus(401).json({ message: 'Not authorized, token failed' });;
  }
};

module.exports = { protect };
