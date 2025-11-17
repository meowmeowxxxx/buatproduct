'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { redirect, useRouter } from 'next/navigation';
import { updateUserProfile, upgradeUserToPremium, deleteUserAccount } from '@/lib/firebase/users';

export default function ProfilePage() {
  const router = useRouter();
  const { user, userData, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    bio: '',
    website: '',
    twitter: '',
  });

  // Initialize form data when userData loads
  useEffect(() => {
    if (userData) {
      setFormData({
        displayName: userData.displayName || '',
        username: userData.username || '',
        bio: userData.bio || '',
        website: userData.website || '',
        twitter: userData.twitter || '',
      });
    }
  }, [userData]);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      await updateUserProfile(user.uid, {
        displayName: formData.displayName,
        username: formData.username,
        bio: formData.bio,
        website: formData.website,
        twitter: formData.twitter,
      });
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      // Reload to get updated user data
      window.location.reload();
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpgradeToPremium = async () => {
    if (!user) return;
    
    setIsUpgrading(true);
    setError('');
    setSuccess('');

    try {
      await upgradeUserToPremium(user.uid);
      setSuccess('Upgraded to Premium successfully!');
      // Reload to get updated user data
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error('Error upgrading to premium:', err);
      setError(err instanceof Error ? err.message : 'Failed to upgrade to premium');
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    
    const confirmed = confirm(
      'Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data including products, comments, and upvotes.'
    );

    if (!confirmed) return;

    setIsDeleting(true);
    setError('');

    try {
      await deleteUserAccount(user.uid);
      router.push('/');
    } catch (err) {
      console.error('Error deleting account:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete account');
      setIsDeleting(false);
    }
  };

  if (!loading && !user) {
    redirect('/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">My Profile</h1>
          <p className="text-stone-600">Manage your account settings and preferences</p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 h-32"></div>
          
          <div className="px-8 pb-8">
            <div className="flex items-end justify-between -mt-16 mb-6">
              <div className="flex items-end gap-4">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white">
                  {userData?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                </div>
                <div className="mb-2">
                  <h2 className="text-2xl font-bold text-stone-900">{userData?.displayName || user?.email?.split('@')[0]}</h2>
                  <p className="text-stone-600">@{userData?.username}</p>
                </div>
              </div>
              
              {userData?.isPremium && (
                <span className="mb-2 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 border border-orange-200 rounded-lg text-sm font-medium text-orange-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Premium Member
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-stone-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-stone-900">{userData?.productCount || 0}</div>
                <div className="text-sm text-stone-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-stone-900">0</div>
                <div className="text-sm text-stone-600">Upvotes Received</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-stone-900">0</div>
                <div className="text-sm text-stone-600">Upvotes Given</div>
              </div>
            </div>

            {/* Profile Information */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-stone-900">Profile Information</h3>
                <Button
                  variant={isEditing ? 'outline' : 'primary'}
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className={isEditing ? '' : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600'}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-stone-50"
                  />
                  <p className="text-xs text-stone-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Display Name
                  </label>
                  <Input
                    type="text"
                    value={isEditing ? formData.displayName : userData?.displayName || ''}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-stone-50' : ''}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Username
                  </label>
                  <Input
                    type="text"
                    value={isEditing ? formData.username : userData?.username || ''}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-stone-50' : ''}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                    className={`w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${!isEditing ? 'bg-stone-50' : ''}`}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Website
                  </label>
                  <Input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    disabled={!isEditing}
                    placeholder="https://yourwebsite.com"
                    className={!isEditing ? 'bg-stone-50' : ''}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Twitter
                    </label>
                    <Input
                      type="text"
                      value={formData.twitter}
                      onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                      disabled={!isEditing}
                      placeholder="@username"
                      className={!isEditing ? 'bg-stone-50' : ''}
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    {success}
                  </div>
                )}

                {isEditing && (
                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setError('');
                        setSuccess('');
                      }}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                      onClick={handleSaveProfile}
                      isLoading={isSaving}
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-8 mt-6">
          <h3 className="text-xl font-bold text-stone-900 mb-6">Account Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-stone-100">
              <div>
                <p className="text-sm font-medium text-stone-900">Account Type</p>
                <p className="text-xs text-stone-600 mt-0.5">
                  {userData?.isPremium ? 'Premium Member' : 'Free Account'}
                </p>
              </div>
              {!userData?.isPremium && (
                <Button
                  size="sm"
                  onClick={() => router.push('/pricing')}
                >
                  View Plans
                </Button>
              )}
            </div>

            <div className="flex items-center justify-between py-3 border-b border-stone-100">
              <div>
                <p className="text-sm font-medium text-stone-900">Email Notifications</p>
                <p className="text-xs text-stone-600 mt-0.5">Receive updates about your products</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-pink-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-stone-900">Change Password</p>
                <p className="text-xs text-stone-600 mt-0.5">Update your account password</p>
              </div>
              <Button variant="outline" size="sm">
                Change Password
              </Button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white border border-red-200 rounded-xl shadow-sm p-8 mt-6">
          <h3 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-stone-900">Delete Account</p>
              <p className="text-xs text-stone-600 mt-0.5">Permanently delete your account and all data</p>
            </div>
            <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50" onClick={handleDeleteAccount} isLoading={isDeleting}>
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
