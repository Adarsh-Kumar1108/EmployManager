import React, { useEffect, useState } from 'react';
import api from '../api/reqresApi';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await api.get(`users?page=${page}`);
    const rawUsers = res.data.data;

    const mergedUsers = rawUsers.map(user => {
      const stored = localStorage.getItem(`updatedUser_${user.id}`);
      return stored ? { ...user, ...JSON.parse(stored) } : user;
    });

    setUsers(mergedUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const deleteUser = async (id) => {
    await api.delete(`users/${id}`);
    setUsers(prev => prev.filter(user => user.id !== id));
    localStorage.removeItem(`updatedUser_${id}`);
  };

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    // Clear token from localStorage (or sessionStorage/cookies if used)
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/');
    window.location.reload();
  };


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex items-center justify-between flex-wrap">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="w-15 h-12" />
          <span className="text-xl font-bold text-gray-800">EmployManager</span>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded w-60 sm:w-80 focus:outline-none"
          />
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">User List</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={user.avatar}
                  alt={user.first_name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <Link
                  to={`/edit/${user.id}`}
                  className="px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(p => p + 1)}
            className="px-5 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
