import React, { useState, useRef } from 'react';
import './Features.css';

function UploadPrescription({ onBack }) {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      analyzeImage();
    }
  };

  const analyzeImage = () => {
    setAnalyzing(true);
    // Simulate AI OCR processing time
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        medicines: ['Amoxicillin 500mg', 'Paracetamol 650mg', 'Cough Syrup'],
        type: 'Tablet Prescription'
      });
      // Also save to localStorage to simulate "Health Records" saving
      const records = JSON.parse(localStorage.getItem('vatsalya_records') || '[]');
      records.push({
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        type: 'Tablet Prescription',
        medicines: ['Amoxicillin 500mg', 'Paracetamol 650mg']
      });
      localStorage.setItem('vatsalya_records', JSON.stringify(records));
    }, 3000);
  };

  const buyOnline = () => {
    if (result) {
      const query = encodeURIComponent(result.medicines.join(' '));
      window.open(`https://www.google.com/search?tbm=shop&q=buy+${query}+medicine+online`, '_blank');
    }
  };

  return (
    <div className="feature-page">
      <div className="feature-container text-center">
        <button className="btn-back" onClick={onBack}>&larr; Back to Home</button>
        <h2>Upload Prescription</h2>
        <p className="text-muted">Upload your handwritten prescription. Our AI will digitize it and help you buy medicines online.</p>
        
        {!file && (
          <div className="upload-options">
            <button className="btn-primary large" onClick={() => cameraInputRef.current.click()}>
              📸 Open Camera
            </button>
            <button className="btn-secondary large" onClick={() => fileInputRef.current.click()}>
              🖼️ Upload from Gallery
            </button>
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              ref={cameraInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
            />
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
            />
          </div>
        )}

        {file && (
          <div className="preview-section">
            <img src={file} alt="Prescription" className="prescription-preview" />
            
            {analyzing ? (
              <div className="analysis-loading">
                <div className="spinner"></div>
                <p>AI is analyzing your prescription...</p>
              </div>
            ) : result ? (
              <div className="analysis-result">
                <h3>✅ Analysis Complete</h3>
                <p><strong>Document Type:</strong> {result.type}</p>
                <div className="medicines-list">
                  <strong>Identified Medicines:</strong>
                  <ul>
                    {result.medicines.map((med, idx) => <li key={idx}>{med}</li>)}
                  </ul>
                </div>
                <p className="note">This prescription has been saved to your Health Records securely.</p>
                <button className="btn-primary large" onClick={buyOnline}>🛒 Buy Medicines Online</button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPrescription;
