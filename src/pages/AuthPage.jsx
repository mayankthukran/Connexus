import React, { useState } from 'react';
import { Star, Code, BookOpen } from 'lucide-react';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

const AuthPage = () => {
  const [authMode, setAuthMode] = useState('login');

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#DFD0B8] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center ">
          
          {/* Left Side - Hero Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#948979]/30 text-[#222831] text-sm font-medium mb-6 border border-[#948979]/50">
              <Star className="w-4 h-4 mr-2 text-[#222831]" fill="currentColor" />
              Join 50,000+ People worldwide
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-[#222831] leading-tight">
              {authMode === 'login' ? 'Welcome Back to' : 'Start Your Journey with'} <br />
              <span className="text-[#393E46]">Connexus</span>
            </h1>

            <p className="text-lg text-[#222831]/80 mb-8 leading-relaxed">
              {authMode === 'login' 
                ? 'Continue your Social journey and connect new people with our connexus.'
                : 'Join thousands of people who have transformed their social life with our connexus.'
              }
            </p>

            <div className="hidden lg:flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-[#393E46] rounded-xl">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-[#222831] font-medium">Connect with Real People & share your experience</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-[#948979] rounded-xl">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-[#222831] font-medium">Expert algorithm & 24/7 support</span>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="w-full lg:w-1/2 max-w-md mx-auto">
            <div className="bg-[#948979] rounded-3xl shadow-2xl p-8 border border-[#222831]/10">
              
              {/* Connexus Brand */}
              {/* <div className="flex justify-center mb-8">
                <h1 className="text-3xl font-bold text-[#222831]">Connexus</h1>
              </div> */}

              {/* Mode Toggle
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
              </div> */}

              {/* Form Content - Your Existing Components */}
              {authMode === 'login' ? (
                <Login toggleAuthMode={toggleAuthMode} />
              ) : (
                <Signup toggleAuthMode={toggleAuthMode} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;