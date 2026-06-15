import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import PharmacySetup from './pages/PharmacySetup';
import UploadPrescription from './pages/UploadPrescription';
import ChatPage from './pages/ChatPage';
import PharmacyDashboard from './pages/PharmacyDashboard';

function PrivateRoute({ children, allowedType }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>جاري التحميل...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedType && user.user_type !== allowedType) {
    return <Navigate to={user.user_type === 'pharmacy' ? '/pharmacy/dashboard' : '/upload'} />;
  }
  return children;
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pharmacy/setup" element={<PrivateRoute allowedType="pharmacy"><PharmacySetup /></PrivateRoute>} />
      <Route path="/pharmacy/dashboard" element={<PrivateRoute allowedType="pharmacy"><PharmacyDashboard /></PrivateRoute>} />
      <Route path="/upload" element={<PrivateRoute allowedType="user"><UploadPrescription /></PrivateRoute>} />
      <Route path="/chat/:convId" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
      <Route path="/" element={
        user
          ? <Navigate to={user.user_type === 'pharmacy' ? '/pharmacy/dashboard' : '/upload'} />
          : <Navigate to="/login" />
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
