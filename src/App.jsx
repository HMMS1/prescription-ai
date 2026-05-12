import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboardRoute from "./routes/AdminDashboardRoute";

import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import UploadPrescription from "./pages/UploadPrescription";
import Pharmacies from "./pages/Pharmacies";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AddPharmacy from "./pages/AddPharmacy";
import ContractedPharmacies from "./pages/ContractedPharmacies";
import ChatPage from "./pages/ChatPage";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<LoginRegister />} />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadPrescription />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pharmacies"
          element={
            <ProtectedRoute>
              <Pharmacies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contracted-pharmacies"
          element={
            <ProtectedRoute>
              <ContractedPharmacies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat/:pharmacyId"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pharmacy-dashboard"
          element={
            <ProtectedRoute>
              <PharmacyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AdminDashboardRoute>
              <SuperAdminDashboard />
            </AdminDashboardRoute>
          }
        />

        <Route
          path="/dashboard/add-pharmacy"
          element={
            <AdminDashboardRoute>
              <AddPharmacy />
            </AdminDashboardRoute>
          }
        />

        <Route path="/super-admin" element={<Navigate to="/dashboard" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;