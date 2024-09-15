
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try{
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User email already exists' });
    }

    // encrypted password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      return res.status(400).json({ message: 'Invalid user data' });
    }}catch(error){
      if (error.code === 11000) {
        // Handle duplicate key error
        return res.status(400).json({ message: 'Username already exists' });
      }
      return res.status(500).json({ message: 'Server error' });
    }
};

//login 
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
};



const getUserProfile = async (req, res) => {
  const user = await User.findById(req.params.userID);
  
  if (user) {
    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email
    });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
};



module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};
