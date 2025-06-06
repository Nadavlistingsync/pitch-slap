'use client';

import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { useToast } from '../components/ToastContext';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  location: string;
  bio: string;
}

const initialProfileData: ProfileData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  company: 'TechStart Inc.',
  role: 'Founder & CEO',
  location: 'San Francisco, CA',
  bio: 'Passionate about building the future of technology. Currently focused on revolutionizing the way startups pitch to investors.',
};

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<ProfileData>(initialProfileData);
  const { showToast } = useToast();

  const handleEdit = () => {
    setEditedData(profileData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      // Add your profile update logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      setProfileData(editedData);
      setIsEditing(false);
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update profile. Please try again.', 'error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Profile Settings
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="mt-12 rounded-2xl bg-white/5 backdrop-blur-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <FiEdit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <FiX className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 transition-colors"
                >
                  <FiSave className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg bg-white/10 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-300">{profileData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editedData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg bg-white/10 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-300">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editedData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg bg-white/10 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-300">{profileData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={editedData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg bg-white/10 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-300">{profileData.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Company</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="company"
                    value={editedData.company}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg bg-white/10 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-300">{profileData.company}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Role</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="role"
                    value={editedData.role}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg bg-white/10 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-300">{profileData.role}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editedData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-lg bg-white/10 border border-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                />
              ) : (
                <p className="mt-1 text-gray-300">{profileData.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="mt-8 rounded-2xl bg-white/5 backdrop-blur-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Change Password</h3>
              <p className="mt-1 text-gray-400">
                Update your password to keep your account secure
              </p>
              <button className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                Change Password
              </button>
            </div>

            <div>
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              <p className="mt-1 text-gray-400">
                Add an extra layer of security to your account
              </p>
              <button className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                Enable 2FA
              </button>
            </div>

            <div>
              <h3 className="text-lg font-medium text-red-500">Delete Account</h3>
              <p className="mt-1 text-gray-400">
                Permanently delete your account and all associated data
              </p>
              <button className="mt-4 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors text-red-500">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 