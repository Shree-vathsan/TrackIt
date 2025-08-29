const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const upload = require('../config/cloudinary.js');
const {
  getUserProfile,
  updateUserProfile,
  uploadProfilePhoto,
} = require('../controllers/userController.js');

// Route to get and update profile text data
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);

// Route to handle profile photo uploads
router.post('/profile/upload', auth, upload.single('profilePhoto'), uploadProfilePhoto);

module.exports = router;