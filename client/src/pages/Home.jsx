import React from 'react';
import FileUpload from '../components/FileUpload';

const Home = ({ darkMode }) => {
  return (
    <div className="space-y-8">
      <h1 className={`text-4xl font-bold text-center ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>Welcome to Photopia</h1>
      <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Store and share your memories with ease.</p>
      <FileUpload darkMode={darkMode} />
    </div>
  );
};

export default Home;