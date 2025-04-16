import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/reqresApi';
import logo from '../assets/logo.jpg';

const EditUserForm = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`users/${id}`).then(res => {
      const { first_name, last_name, email } = res.data.data;
      setUser({ first_name, last_name, email });
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`users/${id}`, user); // Fake update success from Reqres

      localStorage.setItem(`updatedUser_${id}`, JSON.stringify(user));

      navigate('/users', { replace: true });
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const handleBack = () => {
    navigate('/users');
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex items-center justify-between flex-wrap">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="w-15 h-12" />
          <span className="text-xl font-bold text-gray-800">EmployManager</span>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Edit User</h2>

          <div>
            <label className="block text-gray-600 mb-1">First Name</label>
            <input
              type="text"
              value={user.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none "
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Last Name</label>
            <input
              type="text"
              value={user.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none  "
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none "
              required
            />
          </div>

          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={handleBack}
              className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Back
            </button>

            <button
              type="submit"
              className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUserForm;
