const User = require('../models/User.js');

// @desc    Get current user's profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update user's profile (text data only)
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
  const { name, email, phoneNumber } = req.body;

  const profileFields = {};
  if (name) profileFields.name = name;
  if (email) profileFields.email = email;
  if (phoneNumber) profileFields.phoneNumber = phoneNumber;
  
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: profileFields },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Upload profile photo
// @route   POST /api/users/profile/upload
// @access  Private
exports.uploadProfilePhoto = async (req, res) => {
  try {
    // This is an important check to prevent crashes
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // req.file.path is the URL of the uploaded image from Cloudinary
    user.profilePhotoUrl = req.file.path;
    await user.save();

    res.json({ profilePhotoUrl: user.profilePhotoUrl });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};