import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
import API from '../api';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import './Profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profilePhotoUrl: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [profileMessage, setProfileMessage] = useState({ text: '', type: '' });
  const [passwordMessage, setPasswordMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/users/profile');
        setProfileData(res.data);
      } catch (err) {
        setProfileMessage({ text: 'Could not fetch profile data.', type: 'error' });
      }
    };
    fetchProfile();
  }, []);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePhoto', file);

    try {
      setProfileMessage({ text: 'Uploading...', type: 'success' });
      await API.post('/users/profile/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      // Reload the page to show the new photo everywhere
      window.location.reload();
      toast.success('Image uploaded successfully!');

    } catch (err) {
      console.error('Error uploading image:', err);
      setProfileMessage({ text: 'Error uploading image.', type: 'error' });
      toast.error('Error uploading image.');
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] },
    multiple: false,
  });

  const handleProfileChange = (e) => setProfileData({ ...profileData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const onProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMessage({ text: '', type: '' });
    try {
      const res = await API.put('/users/profile', profileData);
      updateUser(res.data);
      toast.success('Profile updated successfully!'); // Success notification
      setIsProfileEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'An error occurred.'); // Error notification
    }
  };

  const onPasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMessage({ text: '', type: '' });
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      return setPasswordMessage({ text: 'New passwords do not match.', type: 'error' });
    }
    try {
      const res = await API.put('/auth/changepassword', 
        {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success(res.data.msg);
      setPasswordMessage({ text: res.data.msg, type: 'success' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setShowPasswordForm(false);
    } catch (err) {
      setPasswordMessage({ text: err.response?.data?.msg || 'An error occurred.', type: 'error' });
      toast.error(err.response?.data?.msg || 'An error occurred.');
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      
      <div className="profile-section">
        <div className="section-header">
          <h3>Edit Details</h3>
          {!isProfileEditing && (
            <button className="edit-toggle-btn" onClick={() => setIsProfileEditing(true)}>Edit</button>
          )}
        </div>
        
        {profileMessage.text && <p className={`${profileMessage.type}-message`}>{profileMessage.text}</p>}
        
        <form onSubmit={onProfileSubmit}>
          <div className="profile-photo-container" {...getRootProps()}>
            <input {...getInputProps()} />
            <img 
              src={profileData.profilePhotoUrl || 'https://dribbble.com/shots/1269168-Kick-Point-Default-Profile-Image'}
              alt="Profile" 
              className="profile-photo"
            />
            <div className="photo-edit-overlay">
              <span className="edit-icon">✏️</span>
              <p>Change Photo</p>
            </div>
          </div>

          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={profileData.name || ''} onChange={handleProfileChange} disabled={!isProfileEditing} />
          
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" value={profileData.email || ''} readOnly disabled />

          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={profileData.phoneNumber || ''} onChange={handleProfileChange} disabled={!isProfileEditing} />
          
          {isProfileEditing && (
            <div className="form-actions">
              <button type="submit">Save Changes</button>
              <button type="button" className="cancel-btn" onClick={() => setIsProfileEditing(false)}>Cancel</button>
            </div>
          )}
        </form>
      </div>

      <div className="profile-section">
        <div className="section-header">
          <h3>Change Password</h3>
          {!showPasswordForm && (
            <button className="edit-toggle-btn" onClick={() => setShowPasswordForm(true)}>Edit</button>
          )}
        </div>

        {showPasswordForm && (
          <form onSubmit={onPasswordSubmit}>
            {passwordMessage.text && <p className={`${passwordMessage.type}-message`}>{passwordMessage.text}</p>}
            
            <label htmlFor="currentPassword">Current Password</label>
            <input type="password" id="currentPassword" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required />
            
            <label htmlFor="newPassword">New Password</label>
            <input type="password" id="newPassword" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} minLength="6" required />
            
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input type="password" id="confirmNewPassword" name="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} required />
            
            <div className="form-actions">
              <button type="submit">Update Password</button>
              <button type="button" className="cancel-btn" onClick={() => setShowPasswordForm(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;