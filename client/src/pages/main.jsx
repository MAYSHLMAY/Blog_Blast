import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: `url('/d5e27616-3373-478e-a0e8-8349ac5ee6ef.png')` }}>
        {/* This div will act as the cover image */}
      </div>
      <h1 className="text-5xl font-bold text-gray-800 mt-8">Blog BLAST</h1>
      <p className="text-lg text-gray-600 mt-4 text-center">A social blogging app that allows users to create, share, and interact with posts and comments in a vibrant online community.</p>
      <Link to="/home">
        <button className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
          Go to Application
        </button>
      </Link>
    </div>
  );
};

export default Main;
