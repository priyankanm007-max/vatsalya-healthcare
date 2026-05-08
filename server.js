const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const doctors = [
  {
    id: 'D100',
    name: 'Dr. Anjali Sharma',
    specialty: 'General Physician',
    languages: ['English', 'Hindi', 'Bhojpuri'],
    available: true,
    nextAvailable: '10 min',
    contact: '+91 99999 00001'
  },
  {
    id: 'D101',
    name: 'Dr. Rajiv Kumar',
    specialty: 'Pediatrics',
    languages: ['English', 'Hindi'],
    available: false,
    nextAvailable: '30 min',
    contact: '+91 99999 00002'
  },
  {
    id: 'D102',
    name: 'Dr. Meera Patel',
    specialty: 'Gynecology',
    languages: ['English', 'Hindi', 'Gujarati'],
    available: true,
    nextAvailable: '5 min',
    contact: '+91 99999 00003'
  },
  {
    id: 'D103',
    name: 'Dr. Karthik Iyer',
    specialty: 'Diabetes & BP Care',
    languages: ['English', 'Tamil'],
    available: true,
    nextAvailable: '15 min',
    contact: '+91 99999 00004'
  },
  {
    id: 'D104',
    name: 'Dr. Farah Khan',
    specialty: 'Mental Health',
    languages: ['English', 'Hindi', 'Urdu'],
    available: false,
    nextAvailable: '45 min',
    contact: '+91 99999 00005'
  }
];

const appointments = [];
const emergencies = [];

app.get('/api/doctors', (req, res) => {
  res.json({ doctors });
});

app.get('/api/availability', (req, res) => {
  const availability = doctors.map((doctor) => ({
    id: doctor.id,
    available: doctor.available,
    nextAvailable: doctor.nextAvailable
  }));
  res.json({ availability });
});

app.post('/api/appointments', (req, res) => {
  const { patientName, phone, village, doctorId, preferredDate, issue } = req.body;
  if (!patientName || !phone || !village || !doctorId || !preferredDate || !issue) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const doctor = doctors.find((doc) => doc.id === doctorId);
  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found.' });
  }

  const appointment = {
    id: `A${appointments.length + 1}`,
    patientName,
    phone,
    village,
    doctorId,
    doctorName: doctor.name,
    specialty: doctor.specialty,
    preferredDate,
    issue,
    status: doctor.available ? 'Confirmed' : 'Waiting',
    prescription: '',
    createdAt: new Date().toISOString()
  };

  appointments.push(appointment);
  res.json({ appointment });
});

app.get('/api/appointments', (req, res) => {
  const patient = req.query.patient || '';
  const matches = appointments.filter((item) =>
    item.patientName.toLowerCase().includes(patient.toLowerCase())
  );
  res.json({ appointments: matches });
});

app.post('/api/emergency', (req, res) => {
  const { patientName, phone, location, issue } = req.body;
  if (!patientName || !phone || !location || !issue) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const emergency = {
    id: `E${emergencies.length + 1}`,
    patientName,
    phone,
    location,
    issue,
    status: 'Alert sent to local responders and nearest telemedicine desk',
    createdAt: new Date().toISOString()
  };

  emergencies.push(emergency);
  res.json({ emergency });
});

app.get('/api/prescription', (req, res) => {
  const id = req.query.appointmentId;
  if (!id) {
    return res.status(400).json({ error: 'Appointment ID required.' });
  }

  const appointment = appointments.find((item) => item.id === id);
  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found.' });
  }

  if (!appointment.prescription) {
    appointment.prescription = [
      `Doctor: ${appointment.doctorName} (${appointment.specialty})`,
      `Patient: ${appointment.patientName}, ${appointment.village}`,
      'Advice: Drink clean water, rest, and monitor symptoms twice daily.',
      'Medicine: Paracetamol 500mg after food if fever is present. Do not exceed recommended dose.',
      'Follow-up: Return after 7 days or immediately if breathing difficulty, chest pain, fainting, or worsening symptoms occur.'
    ].join('\n');
  }

  res.json({ prescription: appointment.prescription, appointment });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Rural Telemedicine App running on http://localhost:${PORT}`);
});
