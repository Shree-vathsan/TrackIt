const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const {
  registerUser,
  loginUser,
  changePassword,
  getLoggedInUser,
} = require('../controllers/authController.js');

// GET /api/auth - Gets the current logged in user
router.get('/', auth, getLoggedInUser);

// POST /api/auth/register - Registers a new user
router.post('/register', registerUser);

// POST /api/auth/login - Logs a user in
router.post('/login', loginUser);

// PUT /api/auth/changepassword - Changes a user's password
router.put('/changepassword', auth, changePassword);

module.exports = router;