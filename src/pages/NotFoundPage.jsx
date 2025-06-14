import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="max-w-4xl mx-auto text-center py-20">
      <h1 className="text-6xl font-bold mb-6">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <Link 
        to="/" 
        className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;