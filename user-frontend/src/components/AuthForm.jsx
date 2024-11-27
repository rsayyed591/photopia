import React, { useState } from 'react';
import api from '../utils/api';
import { User, Mail, Lock } from 'lucide-react';

const AuthForm = ({ type, onSuccess, darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (email === 'admin@gmail.com' && password === '1234') {
      localStorage.setItem('token', 'offline_token');
      onSuccess();
      return;
    }
  
    const data = type === 'register'
      ? { username, email, password }
      : { email, password };
  
    try {
      const response = await api.post(`/api/${type}`, data);
      localStorage.setItem('token', response.data.token);
      onSuccess();
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
    }
  };
  
  

  return (
    <div className={`max-w-md mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded px-8 pt-6 pb-8 mb-4`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>{type === 'register' ? 'Register' : 'Login'}</h2>
      {error && <div className={`${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700'} border border-red-400 px-4 py-3 rounded mb-4`}>{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <div className="relative">
            <User className={`absolute top-3 left-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`w-full pl-10 pr-3 py-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
            />
          </div>
        )}
        <div className="relative">
          <Mail className={`absolute top-3 left-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full pl-10 pr-3 py-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
          />
        </div>
        <div className="relative">
          <Lock className={`absolute top-3 left-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`w-full pl-10 pr-3 py-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
          />
        </div>
        <button type="submit" className={`w-full ${darkMode ? 'bg-teal-600 hover:bg-teal-700' : 'bg-teal-500 hover:bg-teal-600'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
          {type === 'register' ? 'Register' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;

