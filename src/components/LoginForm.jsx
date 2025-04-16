import React, { useState, useEffect } from 'react';
import api from '../api/reqresApi';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ Check if token already exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/users');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('login', {
        email,
        password,
      });

      // Save token and redirect
      localStorage.setItem('token', res.data.token);
      navigate('/users');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex items-center justify-between flex-wrap">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="w-15 h-12" />
          <span className="text-xl font-bold text-gray-800">EmployManager</span>
        </div>
      </nav>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-5"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
