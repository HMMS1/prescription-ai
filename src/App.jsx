import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// الصفحات
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import UploadPrescription from "./pages/UploadPrescription";
import Pharmacies from "./pages/Pharmacies";
import ContractedPharmacies from "./pages/ContractedPharmacies";
import ChatPage from "./pages/ChatPage";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AddPharmacy from "./pages/AddPharmacy";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import PharmacyInbox from "./pages/PharmacyInbox";
import PharmacyChat from "./pages/PharmacyChat";

// ملفات الحماية
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboardRoute from "./routes/AdminDashboardRoute";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<LoginRegister />} />
        <Route path="/dashboard" element={<SuperAdminDashboard />} />

        {/* 🔒 حماية اليوزر العادي والصيدلية (أي حد عنده توكن) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/upload" element={<UploadPrescription />} />
          <Route path="/pharmacies" element={<Pharmacies />} />
          <Route path="/contracted-pharmacies" element={<ContractedPharmacies />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          
          {/* صفحات الصيدلية بتفتح بالتوكن العادي */}
          <Route path="/conversations" element={<PharmacyDashboard />} />
          <Route path="/pharmacy-inbox" element={<PharmacyInbox />} />
          <Route path="/pharmacy-chat/:id" element={<PharmacyChat />} />
        </Route>

        {/* 🔒 حماية السوبر أدمن فقط (اللي معاه dashboardAuth) */}
        <Route element={<AdminDashboardRoute />}>
          <Route path="/super-admin/add-pharmacy" element={<AddPharmacy />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;