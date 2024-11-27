import React from 'react';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'} py-4`}>
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 Photopia. Created by Rehan.</p>
      </div>
    </footer>
  );
};

export default Footer;

