import React from 'react';
import AuthForm from '../components/AuthForm';

const Register = ({ darkMode }) => {
  const handleRegisterSuccess = () => {
    window.location.href = '/login';
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>Join Photopia</h1>
      <AuthForm type="register" onSuccess={handleRegisterSuccess} darkMode={darkMode} />
    </div>
  );
};

export default Register;

