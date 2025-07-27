import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

const AuthPage = () => {
  const [authMode, setAuthMode] = useState('login');

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DFD0B8]">
      <div className="max-w-md w-full p-6 bg-[#948979] rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          <h1 className="text-3xl font-bold text-[#222831]">Connexus</h1>
        </div>
        
        <div className="mb-6 flex justify-center">
          <div className="flex space-x-2 bg-gray-200 p-1 rounded-md">
            <button
              onClick={() => setAuthMode('login')}
              className={`px-4 py-2 rounded-md transition ${
                authMode === 'login'
                  ? 'bg-[#393E46] text-white'
                  : 'text-gray-700 hover:bg-gray-300'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`px-4 py-2 rounded-md transition ${
                authMode === 'signup'
                  ? 'bg-[#393E46] text-white'
                  : 'text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>
        
        {authMode === 'login' ? (
          <Login toggleAuthMode={toggleAuthMode} />
        ) : (
          <Signup toggleAuthMode={toggleAuthMode} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;