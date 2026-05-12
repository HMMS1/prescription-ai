import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboardRoute from "./routes/AdminDashboardRoute";

import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import UploadPrescription from "./pages/UploadPrescription";
import Pharmacies from "./pages/Pharmacies";
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
        <Route path="/auth" element={<LoginRegister />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

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
            <ProtectedRoute allowDashboard>
              <ContractedPharmacies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat/:pharmacyId"
          element={
            <ProtectedRoute allowDashboard>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route path="/super-admin" element={<SuperAdminDashboard />} />

        <Route
          path="/super-admin/add-pharmacy"
          element={
            <AdminDashboardRoute>
              <AddPharmacy />
            </AdminDashboardRoute>
          }
        />

        <Route path="/chat" element={<Navigate to="/contracted-pharmacies" replace />} />
        <Route path="/pharmacy-dashboard" element={<Navigate to="/super-admin" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
