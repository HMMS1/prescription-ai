import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import UploadPrescription from "./pages/UploadPrescription";
import Pharmacies from "./pages/Pharmacies";
import PharmacyDashboard from "./pages/PharmacyDashboard";

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
          path="/pharmacy-dashboard"
          element={
            <ProtectedRoute>
              <PharmacyDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;