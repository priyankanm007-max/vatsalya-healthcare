import React from "react";

function AppointmentForm({ onBack }) {
  return (
    <div style={pageStyle}>
      <button onClick={onBack} style={backBtn}>← Back to Home</button>

      <div style={cardStyle}>
        <h1 style={titleStyle}>Book Appointment</h1>

        <input placeholder="Patient Name" style={inputStyle} />
        <input type="number" placeholder="Age" style={inputStyle} />

        <select style={inputStyle}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input type="file" style={inputStyle} />
        <input placeholder="Phone Number" style={inputStyle} />
        <input placeholder="Home Town" style={inputStyle} />

        <textarea
          placeholder="Describe the issue the patient is dealing with"
          style={{ ...inputStyle, height: "100px" }}
        />

        <select style={inputStyle}>
          <option value="">Select Issue / Speciality</option>
          <option>Heart related</option>
          <option>Kidney related</option>
          <option>Neuro related</option>
          <option>Skin related</option>
          <option>Internal organs related</option>
          <option>Infection related</option>
          <option>Allergies</option>
          <option>Bone and joint related</option>
          <option>Eye related</option>
          <option>ENT related</option>
          <option>Women health / Gynecology</option>
          <option>Child health / Pediatrics</option>
          <option>Diabetes related</option>
          <option>Thyroid related</option>
          <option>Lung / Breathing related</option>
          <option>Dental related</option>
        </select>

        <input placeholder="Or type your own issue / speciality" style={inputStyle} />

        <button
          style={mainBtn}
          onClick={() =>
            window.open(
              "https://www.google.com/maps/search/doctors+and+hospitals+near+me",
              "_blank"
            )
          }
        >
          Next - Find Doctors & Hospitals
        </button>

        <h2 style={mapTitle}>Nearby Doctors & Hospitals</h2>

        <iframe
          title="Nearby Doctors and Hospitals"
          src="https://www.google.com/maps?q=doctors%20and%20hospitals%20near%20me&output=embed"
          width="100%"
          height="330"
          style={{ border: 0, borderRadius: "15px", marginTop: "15px" }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#eafaf7",
  padding: "40px",
  fontFamily: "Arial",
};

const cardStyle = {
  maxWidth: "720px",
  margin: "auto",
  background: "white",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
};

const titleStyle = {
  textAlign: "center",
  color: "#1f3c88",
  marginBottom: "25px",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  borderRadius: "10px",
  border: "1px solid #999",
  fontSize: "16px",
  boxSizing: "border-box",
  backgroundColor: "white",
  color: "black",
};

const mainBtn = {
  width: "100%",
  padding: "15px",
  background: "#14b8a6",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
};

const backBtn = {
  padding: "10px 20px",
  background: "#4da6ff",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  marginBottom: "20px",
};

const mapTitle = {
  color: "#1f3c88",
  marginTop: "30px",
};

export default AppointmentForm;