import React from "react";

function VideoConsultation({ onBack }) {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#eafaf7",
                padding: "40px",
                fontFamily: "Arial",
            }}
        >
            <button
                onClick={onBack}
                style={{
                    padding: "10px 20px",
                    background: "#4da6ff",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    marginBottom: "20px",
                }}
            >
                ← Back to Home
            </button>

            <div
                style={{
                    maxWidth: "750px",
                    margin: "auto",
                    background: "white",
                    padding: "30px",
                    borderRadius: "20px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        color: "#1f3c88",
                    }}
                >
                    Video Consultation
                </h1>

                <input placeholder="Patient Name" style={inputStyle} />

                <input type="number" placeholder="Age" style={inputStyle} />

                <select style={inputStyle}>
                    <option>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>

                <input placeholder="Phone Number" style={inputStyle} />

                <input placeholder="Home Town / Location" style={inputStyle} />

                <textarea
                    placeholder="Describe your health issue"
                    style={{
                        ...inputStyle,
                        height: "100px",
                    }}
                />

                <select style={inputStyle}>
                    <option>Select Speciality</option>
                    <option>General Physician</option>
                    <option>Cardiologist</option>
                    <option>Neurologist</option>
                    <option>Dermatologist</option>
                    <option>Pediatrician</option>
                    <option>Gynecologist</option>
                    <option>Orthopedic</option>
                    <option>ENT Specialist</option>
                </select>

                <button
                    style={{
                        width: "100%",
                        padding: "15px",
                        background: "#14b8a6",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "16px",
                        cursor: "pointer",
                        marginTop: "15px",
                    }}
                    onClick={() =>
                        window.open(
                            "https://meet.google.com/",
                            "_blank"
                        )
                    }
                >
                    Start Video Consultation
                </button>

                <iframe
                    title="maps"
                    src="https://www.google.com/maps?q=hospitals%20near%20me&output=embed"
                    width="100%"
                    height="320"
                    style={{
                        border: 0,
                        borderRadius: "15px",
                        marginTop: "25px",
                    }}
                ></iframe>
            </div>
        </div>
    );
}

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

export default VideoConsultation;