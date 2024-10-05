import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <img
          src="https://png.pngtree.com/png-clipart/20190905/original/pngtree-summer-childhood-paper-airplane-green-png-image_4517762.jpg"
          alt="Loading"
          className="w-24 h-24 mb-4 animate-bounce" 
        />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Finding the best flights...</h2>
        <div className="loader w-16 h-16 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
