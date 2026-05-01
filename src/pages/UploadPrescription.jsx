import { useState } from "react";
import api from "../api/api";
import "./UploadPrescription.css";

function UploadPrescription() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setAiResult(null);
  };

  const analyzePrescription = async () => {
    if (!file) {
      alert("Please upload prescription image first");
      return;
    }

    const formData = new FormData();
    formData.append("prescription", file);

    setLoading(true);

    try {
      const res = await api.post("/prescriptions/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAiResult(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "AI analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="upload-page premium-page">
      <section className="page-heading">
        <span>AI Prescription Scanner</span>
        <h1>Upload your prescription</h1>
        <p>
          The backend AI service will extract medicine names, dosage, and usage instructions.
        </p>
      </section>

      <section className="upload-grid">
        <div className="glass-card">
          <label className="premium-upload">
            <input type="file" accept="image/*" onChange={handleImage} />
            <div>
              <h3>Drop or choose prescription image</h3>
              <p>JPG, PNG, JPEG supported</p>
            </div>
          </label>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Prescription" />
            </div>
          )}

          <button className="premium-btn" onClick={analyzePrescription} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Prescription"}
          </button>
        </div>

        <div className="glass-card result-panel">
          <h2>AI Result</h2>

          {!aiResult && (
            <p className="muted">
              No result yet. After uploading, the backend will return extracted medicines here.
            </p>
          )}

          {aiResult && (
            <div className="result-content">
              <h3>Detected Medicines</h3>

              {aiResult.medicines?.map((item, index) => (
                <div className="medicine-row" key={index}>
                  <h4>{item.name}</h4>
                  <p>{item.dosage}</p>
                  <span>{item.instructions}</span>
                </div>
              ))}

              <a href="/pharmacies" className="premium-btn link-btn">
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