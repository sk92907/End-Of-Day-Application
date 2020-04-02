const express = require('express'),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  keys = require('../../config/keys'),
  passport = require('passport'),
  multer = require('multer'),
  path = require('path');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(401).json({ message: 'Data entered is not valid.' });
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(401).json({ message: 'Email already exists' });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        empType: req.body.empType
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) return res.status(401).json({ message: err.message });
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => {
              return res.status(401).json({ message: err.message });
            });
        });
      });
    }
  });
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(200).json({
      status: 401,
      message: 'Invalid mail id or password.'
    });
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(401).json({
        message: 'Email not found'
      });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          empType: user.empType
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res.status(401).json({
          message: 'Password incorrect'
        });
      }
    });
  });
});

module.exports = router;
