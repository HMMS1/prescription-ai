import { useState } from "react";
import api from "../api/api";
import "./UploadPrescription.css";

function UploadPrescription() {

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImage = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
    setError("");
  };

  const uploadPrescription = async () => {
    if (!file) {
      setError("Please upload a prescription image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      setError("");
      setResult(null);

      // هنا شلنا الـ headers، الـ api (axios instance) بيعرف يتعامل مع الـ FormData لوحده
      const response = await api.post("/prescriptions/upload/", formData);

      setResult(response.data);

    } catch (err) {
      console.log("UPLOAD ERROR =>", err.response?.data);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Upload failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="upload-page premium-page">

      <section className="page-heading">
        <span>AI Prescription Scanner</span>
        <h1>Upload your prescription</h1>
        <p>Upload prescription image and analyze it using AI.</p>
      </section>

      <section className="upload-grid">

        <div className="glass-card">
          <label className="premium-upload">
            <input type="file" accept="image/*" onChange={handleImage} />
            <div>
              <h3>Choose prescription image</h3>
              <p>JPG, PNG, JPEG supported</p>
            </div>
          </label>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Prescription" />
            </div>
          )}

          {error && (
            <p style={{ color: "#ff6b6b", marginTop: "10px" }}>{error}</p>
          )}

          <button
            className="premium-btn"
            onClick={uploadPrescription}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Upload & Scan"}
          </button>
        </div>

        <div className="glass-card result-panel">
          <h2>Analysis Result</h2>

          {!result && !loading && (
            <p className="muted">No result yet.</p>
          )}

          {loading && (
            <p className="muted" style={{ color: "var(--primary)" }}>
              AI analyzing...
            </p>
          )}

          {result && (
            <div className="result-content">

              <p style={{ color: "#4ade80", marginBottom: "1rem" }}>
                ✅ {result.message}
              </p>

              {result.patient_condition_ar && (
                <div className="medicine-row" style={{ backgroundColor: "rgba(56, 189, 248, 0.1)", border: "1px solid rgba(56, 189, 248, 0.3)", padding: "15px", borderRadius: "10px", marginBottom: "1rem" }}>
                  <h4 style={{ color: "#38bdf8", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                    💡 التشخيص المتوقع للحالة
                  </h4>
                  <p style={{ direction: "rtl", textAlign: "right", fontSize: "1.05rem", lineHeight: "1.6", margin: 0 }}>
                    {result.patient_condition_ar}
                  </p>
                </div>
              )}

              {result.patient?.name && (
                <div className="medicine-row">
                  <h4>Patient</h4>
                  <p>Name: {result.patient.name}</p>
                  {result.patient.age && <p>Age: {result.patient.age}</p>}
                </div>
              )}

              {result.doctor?.name && (
                <div className="medicine-row">
                  <h4>Doctor</h4>
                  <p>Name: {result.doctor.name}</p>
                  {result.doctor.specialty && <p>Specialty: {result.doctor.specialty}</p>}
                </div>
              )}

              {result.date && (
                <div className="medicine-row">
                  <h4>Date</h4>
                  <p>{result.date}</p>
                </div>
              )}

              {result.medicines && result.medicines.length > 0 && (
                <div>
                  <h3 style={{ margin: "1rem 0 0.5rem" }}>
                    Medicines / الأدوية
                  </h3>

                  {result.medicines.map((med, index) => (
                    <div key={index} className="medicine-row" style={{ marginBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1rem" }}>

                      <p style={{ fontWeight: "bold", fontSize: "1rem", marginBottom: "4px" }}>
                        💊 {med.name_en || med.name}
                        {med.name_ar && (
                          <span style={{ color: "var(--primary)", marginRight: "8px", marginLeft: "8px" }}>
                            — {med.name_ar}
                          </span>
                        )}
                      </p>

                      {med.condition_ar && (
                        <p style={{ color: "#facc15", marginBottom: "4px" }}>
                          🏥 يعالج: {med.condition_ar}
                          {med.condition_en && (
                            <span style={{ opacity: 0.6, fontSize: "0.85rem", marginRight: "6px" }}>
                              ({med.condition_en})
                            </span>
                          )}
                        </p>
                      )}

                      {med.description_ar && (
                        <p style={{ opacity: 0.75, fontSize: "0.9rem", marginBottom: "6px", direction: "rtl", textAlign: "right" }}>
                          {med.description_ar}
                        </p>
                      )}

                      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "6px" }}>
                        {med.dosage && (
                          <span style={{ background: "rgba(36,242,170,0.1)", border: "1px solid rgba(36,242,170,0.2)", borderRadius: "8px", padding: "3px 10px", fontSize: "0.85rem" }}>
                            الجرعة: {med.dosage}
                          </span>
                        )}
                        {med.frequency && (
                          <span style={{ background: "rgba(36,242,170,0.1)", border: "1px solid rgba(36,242,170,0.2)", borderRadius: "8px", padding: "3px 10px", fontSize: "0.85rem" }}>
                            {med.frequency}
                          </span>
                        )}
                        {med.duration && (
                          <span style={{ background: "rgba(36,242,170,0.1)", border: "1px solid rgba(36,242,170,0.2)", borderRadius: "8px", padding: "3px 10px", fontSize: "0.85rem" }}>
                            {med.duration}
                          </span>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              )}

              <a
                href="/pharmacies"
                className="premium-btn link-btn"
                style={{ display: "inline-block", marginTop: "1.5rem" }}
              >
                Find Nearest Pharmacy
              </a>

            </div>
          )}
        </div>

      </section>
    </main>
  );
}

export default UploadPrescription;
