import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
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
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<LoginRegister />} />
        <Route path="/upload" element={<UploadPrescription />} />
        <Route path="/pharmacies" element={<Pharmacies />} />
        <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
      </Routes>
    </>
  );
}

export default App;
