import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import EditUserForm from './components/EditUserForm';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/users" /> : <LoginPage />} />
        <Route path="/users" element={token ? <UserPage /> : <Navigate to="/" />} />
        <Route path="/edit/:id" element={token ? <EditUserForm /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;