import React, { useState } from "react";
import "./App.css";

import SymptomChecker from "./SymptomChecker";
import DigitalPharmacy from "./DigitalPharmacy";
import AppointmentForm from "./AppointmentForm";
import VideoConsultation from "./VideoConsultation";

function App() {
  const [currentView, setCurrentView] = useState("home");

  if (currentView === "symptom") {
    return <SymptomChecker onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "pharmacy") {
    return <DigitalPharmacy onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "appointment") {
    return <AppointmentForm onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "video") {
    return <VideoConsultation onBack={() => setCurrentView("home")} />;
  }

  return (
    <div style={mainContainer}>
      <header style={headerStyle}>
        <div style={brandBox}>
          <div style={doctorLogo}>👩🏻‍⚕️</div>

          <div>
            <h1 style={brandTitle}>Vatsalya</h1>
            <p style={tagline}>Caring Beyond Cities</p>
          </div>
        </div>

        <nav style={navBox}>
          <a href="#home" style={navStyle}>Home</a>
          <a href="#services" style={navStyle}>Services</a>
          <a href="#telemedicine" style={navStyle}>Telemedicine</a>
          <a href="#about" style={navStyle}>About</a>
        </nav>
      </header>

      <div style={sosBox}>
        <button
          onClick={() => {
            alert("Emergency SOS Activated! Nearby hospitals and ambulance services have been alerted.");
            window.open("https://www.google.com/maps/search/nearby+hospitals/", "_blank");
          }}
          style={sosBtn}
        >
          🚨 EMERGENCY SOS
        </button>
      </div>

      <section id="home" style={heroSection}>
        <h1 style={heroTitle}>Healthcare Made Simple</h1>

        <p style={heroText}>
          AI-powered healthcare support, digital pharmacy, emergency SOS,
          doctor appointments and telemedicine services specially designed
          for rural communities.
        </p>
      </section>

      <section id="services" style={servicesSection}>
        <h2 style={sectionTitle}>Our Healthcare Services</h2>

        <div style={servicesGrid}>
          <div style={cardStyle} onClick={() => setCurrentView("symptom")}>
            <div style={iconStyle}>🤖</div>
            <h3>AI Symptom Checker</h3>
            <p>Describe symptoms and get AI-based healthcare guidance instantly.</p>
          </div>

          <div style={cardStyle} onClick={() => setCurrentView("pharmacy")}>
            <div style={iconStyle}>💊</div>
            <h3>Digital Pharmacy</h3>
            <p>Upload prescriptions and locate nearby medical stores easily.</p>
          </div>

          <div style={cardStyle} onClick={() => setCurrentView("appointment")}>
            <div style={iconStyle}>🩺</div>
            <h3>Book Appointment</h3>
            <p>Find nearby doctors and hospitals based on your issue and location.</p>
          </div>

          <div style={cardStyle} onClick={() => setCurrentView("video")}>
            <div style={iconStyle}>📹</div>
            <h3>Video Consultation</h3>
            <p>Connect with doctors instantly using online video consultation.</p>
          </div>

          <div style={cardStyle}>
            <div style={iconStyle}>🚑</div>
            <h3>Emergency Support</h3>
            <p>Immediate access to emergency hospitals and ambulance support.</p>
          </div>
        </div>
      </section>

      <section id="telemedicine" style={telemedicineSection}>
        <h2 style={sectionTitle}>Telemedicine Support</h2>

        <p style={normalText}>
          Vatsalya helps rural patients connect with doctors remotely using
          AI assistance, appointments and video consultation.
        </p>
      </section>

      <section id="about" style={aboutSection}>
        <h2 style={sectionTitle}>About Vatsalya</h2>

        <p style={normalText}>
          Vatsalya is an AI-powered rural healthcare platform that bridges
          the healthcare gap using telemedicine, digital pharmacy, emergency
          services and intelligent healthcare systems.
        </p>
      </section>
    </div>
  );
}

const mainContainer = {
  background: "linear-gradient(to bottom right, #eafaf7, #f0fbff)",
  minHeight: "100vh",
  fontFamily: "Arial",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "22px 60px",
  background: "white",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const brandBox = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
};

const doctorLogo = {
  width: "75px",
  height: "75px",
  borderRadius: "50%",
  background: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "42px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  border: "3px solid #4da6ff",
};

const brandTitle = {
  margin: 0,
  color: "#1f3c88",
  fontSize: "40px",
  fontWeight: "bold",
};

const tagline = {
  margin: 0,
  color: "#4a4a4a",
  fontSize: "15px",
  fontWeight: "500",
};

const navBox = {
  display: "flex",
  gap: "35px",
  fontWeight: "600",
  fontSize: "18px",
};

const navStyle = {
  textDecoration: "none",
  color: "#1f3c88",
};

const sosBox = {
  position: "fixed",
  top: "110px",
  right: "25px",
  zIndex: 2000,
};

const sosBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "18px 28px",
  borderRadius: "50px",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 6px 15px rgba(255,0,0,0.4)",
};

const heroSection = {
  padding: "100px 40px",
  textAlign: "center",
};

const heroTitle = {
  fontSize: "68px",
  color: "#1f3c88",
  fontWeight: "bold",
};

const heroText = {
  maxWidth: "950px",
  margin: "25px auto",
  fontSize: "24px",
  color: "#444",
  lineHeight: "1.8",
};

const servicesSection = {
  padding: "50px",
};

const sectionTitle = {
  textAlign: "center",
  color: "#1f3c88",
  fontSize: "42px",
  marginBottom: "50px",
};

const servicesGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: "30px",
};

const cardStyle = {
  background: "white",
  borderRadius: "20px",
  padding: "30px",
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
};

const iconStyle = {
  fontSize: "52px",
  marginBottom: "18px",
};

const telemedicineSection = {
  padding: "80px 40px",
  textAlign: "center",
};

const aboutSection = {
  padding: "80px 40px",
  background: "white",
  textAlign: "center",
};

const normalText = {
  maxWidth: "1000px",
  margin: "auto",
  fontSize: "22px",
  lineHeight: "1.8",
  color: "#444",
};

export default App;