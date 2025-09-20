import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-black">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Task Manager
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Organize your life with our beautiful and intuitive task management application. 
            Stay productive and never miss a deadline again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-black/30 backdrop-blur-md border border-blue-500/30 hover:border-blue-400/50 text-blue-200 hover:text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Easy Task Creation</h3>
            <p className="text-blue-200">
              Quickly add new tasks with a simple and intuitive interface. 
              Stay organized and focused on what matters most.
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Real-time Editing</h3>
            <p className="text-blue-200">
              Edit your tasks in real-time with instant updates. 
              Make changes on the fly without missing a beat.
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Secure & Private</h3>
            <p className="text-blue-200">
              Your tasks are securely stored and accessible only to you. 
              Privacy and security are our top priorities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;