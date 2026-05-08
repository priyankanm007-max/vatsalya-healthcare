import React, { useState, useEffect } from 'react';
import './Features.css';

function SosPage({ onBack }) {
  const [status, setStatus] = useState('alerting');

  useEffect(() => {
    const timer1 = setTimeout(() => setStatus('finding'), 2000);
    const timer2 = setTimeout(() => setStatus('dispatched'), 5000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  const openGoogleMaps = () => {
    // Open Google maps searching for hospitals within 5km of current location (mocked behavior via search query)
    window.open("https://www.google.com/maps/search/hospitals+near+me", "_blank");
  };

  return (
    <div className="feature-page sos-bg">
      <div className="sos-container text-center">
        <button className="btn-back text-white" onClick={onBack}>&larr; Cancel & Go Back</button>
        
        <div className="sos-alert-circle">
          <h2>EMERGENCY SOS</h2>
        </div>

        <div className="sos-status">
          {status === 'alerting' && <h3>🚨 Alerting all hospitals in 5km radius...</h3>}
          {status === 'finding' && <h3>📡 Finding nearest available ambulance...</h3>}
          {status === 'dispatched' && (
            <div className="dispatched-alert">
              <h3>✅ Ambulance Dispatched!</h3>
              <p>City Care Hospital has accepted the alert. An ambulance is on its way to your GPS location.</p>
            </div>
          )}
        </div>

        <div className="sos-actions">
          <p className="text-white mb-2">Need to see nearby hospitals right now?</p>
          <button className="btn-secondary large w-100" onClick={openGoogleMaps}>
            🗺️ View Real Hospitals in 5km Radius
          </button>
        </div>
      </div>
    </div>
  );
}

export default SosPage;
