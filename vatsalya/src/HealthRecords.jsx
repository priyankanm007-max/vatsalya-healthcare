import React, { useState, useEffect } from 'react';
import './Features.css';

function HealthRecords({ onBack }) {
  const [records, setRecords] = useState([]);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    // Load records from local storage
    const saved = JSON.parse(localStorage.getItem('vatsalya_records') || '[]');
    if (saved.length === 0) {
      // Seed some dummy data
      const dummy = [
        { id: 1, date: '10/12/2023', type: 'Lab Report', label: 'Blood Test Results - Normal' },
        { id: 2, date: '15/01/2024', type: 'Tablet Prescription', label: 'Dermatologist Prescription' }
      ];
      setRecords(dummy);
      localStorage.setItem('vatsalya_records', JSON.stringify(dummy));
    } else {
      setRecords(saved);
    }
  }, []);

  const syncEmail = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      const newRecord = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        type: 'Lab Report',
        label: 'Imported from Email: X-Ray Report'
      };
      const updated = [newRecord, ...records];
      setRecords(updated);
      localStorage.setItem('vatsalya_records', JSON.stringify(updated));
      alert("Successfully synced medical records from your linked Email and Phone Number!");
    }, 2000);
  };

  return (
    <div className="feature-page">
      <div className="feature-container">
        <button className="btn-back" onClick={onBack}>&larr; Back to Home</button>
        <h2>Your Health Records</h2>
        <p className="text-muted">Securely access your past prescriptions, lab reports, and automated syncs from hospitals.</p>
        
        <div className="sync-section">
          <button className="btn-primary" onClick={syncEmail} disabled={syncing}>
            {syncing ? 'Syncing...' : '🔄 Sync Records from Email & SMS'}
          </button>
        </div>

        <div className="records-list">
          {records.map(record => (
            <div key={record.id} className="record-card">
              <div className="record-icon">
                {record.type === 'Lab Report' ? '🧪' : '💊'}
              </div>
              <div className="record-details">
                <span className={`badge ${record.type === 'Lab Report' ? 'badge-lab' : 'badge-rx'}`}>
                  {record.type}
                </span>
                <h4>{record.label || (record.medicines ? 'Prescription Upload' : 'Document')}</h4>
                <p className="text-muted">Date: {record.date}</p>
              </div>
              <button className="btn-secondary">View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HealthRecords;
