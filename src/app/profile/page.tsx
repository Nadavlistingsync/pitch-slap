'use client';

import { useState } from 'react';
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
    } catch {
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
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Profile</h1>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <div className="space-x-4">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-white/5 border-gray-700 text-white shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              ) : (
                <p className="mt-1 text-white">{profileData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-white/5 border-gray-700 text-white shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              ) : (
                <p className="mt-1 text-white">{profileData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={editedData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-white/5 border-gray-700 text-white shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              ) : (
                <p className="mt-1 text-white">{profileData.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Company</label>
              {isEditing ? (
                <input
                  type="text"
                  name="company"
                  value={editedData.company}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-white/5 border-gray-700 text-white shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              ) : (
                <p className="mt-1 text-white">{profileData.company}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Role</label>
              {isEditing ? (
                <input
                  type="text"
                  name="role"
                  value={editedData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-white/5 border-gray-700 text-white shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              ) : (
                <p className="mt-1 text-white">{profileData.role}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={editedData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md bg-white/5 border-gray-700 text-white shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              ) : (
                <p className="mt-1 text-white">{profileData.location}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editedData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md bg-white/5 border-gray-700 text-white shadow-sm focus:border-pink-500 focus:ring-pink-500"
                />
              ) : (
                <p className="mt-1 text-white">{profileData.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 