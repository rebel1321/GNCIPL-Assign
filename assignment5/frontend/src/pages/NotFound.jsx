import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-black flex items-center justify-center px-4">
      <div className="text-center">
        <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-2xl p-12 border border-blue-500/20">
          <h1 className="text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-blue-200 mb-8 max-w-md">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;