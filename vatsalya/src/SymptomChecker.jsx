import React, { useState } from "react";

function SymptomChecker({ onBack }) {
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        symptoms: "",
        duration: "",
        severity: "",
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.age || !formData.gender || !formData.symptoms || !formData.duration || !formData.severity) {
            alert("Please fill all fields");
            return;
        }

        setResult({
            urgency: formData.severity,
            doctor: "General Physician",
            advice: "Drink water, take rest, and consult a nearby doctor if symptoms continue.",
        });
    };

    return (
        <div style={pageStyle}>
            <button onClick={onBack} style={backBtn}>← Back to Home</button>

            <div style={cardStyle}>
                <h1>AI Symptom Checker</h1>

                <form onSubmit={handleSubmit}>
                    <input type="number" name="age" placeholder="Enter Age" value={formData.age} onChange={handleChange} style={inputStyle} />

                    <select name="gender" value={formData.gender} onChange={handleChange} style={inputStyle}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <textarea name="symptoms" placeholder="Enter Symptoms" value={formData.symptoms} onChange={handleChange} style={{ ...inputStyle, height: "100px" }} />

                    <input type="text" name="duration" placeholder="Duration eg: 3 days" value={formData.duration} onChange={handleChange} style={inputStyle} />

                    <select name="severity" value={formData.severity} onChange={handleChange} style={inputStyle}>
                        <option value="">Select Severity</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>

                    <button type="submit" style={mainBtn}>Check Symptoms</button>
                </form>

                {result && (
                    <div style={resultStyle}>
                        <h3>Result</h3>
                        <p><b>Urgency:</b> {result.urgency}</p>
                        <p><b>Recommended Doctor:</b> {result.doctor}</p>
                        <p><b>Advice:</b> {result.advice}</p>
                        <p><b>Note:</b> This is not a final diagnosis.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const pageStyle = { minHeight: "100vh", background: "#eafaf7", padding: "40px", fontFamily: "Arial" };
const cardStyle = { maxWidth: "520px", margin: "auto", background: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" };
const inputStyle = { width: "100%", padding: "14px", marginBottom: "18px", borderRadius: "10px", border: "1px solid #999", fontSize: "16px", boxSizing: "border-box", background: "white", color: "black" };
const mainBtn = { width: "100%", padding: "15px", background: "#14b8a6", color: "white", border: "none", borderRadius: "10px", fontSize: "16px", cursor: "pointer" };
const backBtn = { padding: "10px 20px", background: "#4da6ff", color: "white", border: "none", borderRadius: "8px", marginBottom: "20px", cursor: "pointer" };
const resultStyle = { marginTop: "20px", background: "#f0f9ff", padding: "15px", borderRadius: "12px" };

export default SymptomChecker;