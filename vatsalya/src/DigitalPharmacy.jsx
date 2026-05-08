import React from "react";

function DigitalPharmacy({ onBack }) {
    return (
        <div style={pageStyle}>
            <button onClick={onBack} style={backBtn}>← Back to Home</button>

            <div style={cardStyle}>
                <h1>Digital Pharmacy</h1>
                <p>Upload prescription and find nearby medical stores.</p>

                <h3>Upload Prescription</h3>
                <input type="file" accept="image/*,.pdf" style={{ marginBottom: "20px" }} />

                <br />

                <button style={mainBtn}>Upload Prescription</button>

                <h3 style={{ marginTop: "30px" }}>Nearby Medical Stores</h3>

                <iframe
                    title="Nearby Pharmacies"
                    src="https://www.google.com/maps?q=pharmacy%20near%20me&output=embed"
                    width="100%"
                    height="350"
                    style={{ border: 0, borderRadius: "15px" }}
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
}

const pageStyle = { minHeight: "100vh", background: "#eafaf7", padding: "40px", fontFamily: "Arial" };
const cardStyle = { maxWidth: "800px", margin: "auto", background: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" };
const mainBtn = { padding: "14px 25px", background: "#14b8a6", color: "white", border: "none", borderRadius: "10px", cursor: "pointer" };
const backBtn = { padding: "10px 20px", background: "#4da6ff", color: "white", border: "none", borderRadius: "8px", marginBottom: "20px", cursor: "pointer" };

export default DigitalPharmacy;