'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { signUp, signIn } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab = 'login' }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    name: '', 
    username: '', 
    email: '', 
    password: '' 
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(loginData.email, loginData.password);
      onClose();
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (signupData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      await signUp(signupData.email, signupData.password, signupData.username, signupData.name);
      onClose();
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 mx-auto mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              <circle cx="12" cy="12" r="10" strokeWidth={2.5} />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-stone-900">
            {activeTab === 'login' ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            {activeTab === 'login' ? 'Sign in to continue' : 'Start launching your products'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-stone-100 p-1 rounded-lg">
          <button
            onClick={() => {
              setActiveTab('login');
              setError('');
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === 'login'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => {
              setActiveTab('signup');
              setError('');
            }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === 'signup'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Sign up
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-stone-700 mb-1.5">
                Email address
              </label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
                className="w-full border-stone-300 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-stone-700 mb-1.5">
                Password
              </label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
                className="w-full border-stone-300 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-2.5 shadow-lg shadow-orange-500/30"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        )}

        {/* Signup Form */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="signup-name" className="block text-sm font-medium text-stone-700 mb-1.5">
                Full name
              </label>
              <Input
                id="signup-name"
                type="text"
                placeholder="John Doe"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                required
                className="w-full border-stone-300 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

            <div>
              <label htmlFor="signup-username" className="block text-sm font-medium text-stone-700 mb-1.5">
                Username
              </label>
              <Input
                id="signup-username"
                type="text"
                placeholder="johndoe"
                value={signupData.username}
                onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                required
                className="w-full border-stone-300 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium text-stone-700 mb-1.5">
                Email address
              </label>
              <Input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
                className="w-full border-stone-300 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-stone-700 mb-1.5">
                Password
              </label>
              <Input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
                className="w-full border-stone-300 focus:border-orange-400 focus:ring-orange-400"
              />
              <p className="text-xs text-stone-500 mt-1.5">Must be at least 8 characters</p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-2.5 shadow-lg shadow-orange-500/30"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
