import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = ({ darkMode }) => {
  const handleLoginSuccess = () => {
    window.location.href = '/';
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>Login to Photopia</h1>
      <AuthForm type="login" onSuccess={handleLoginSuccess} darkMode={darkMode} />
    </div>
  );
};

export default Login;

