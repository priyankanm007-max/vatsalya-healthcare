import React, { useState, useRef, useEffect } from 'react';
import './Features.css';

function SymptomCheckerChat({ onBack }) {
  const [messages, setMessages] = useState([
    { text: "Hello! I am Vatsalya's AI Medical Assistant. How are you feeling today? Please describe your symptoms.", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput('');

    // Mock AI Classification Logic
    setTimeout(() => {
      let botResponse = "";
      const lower = userMsg.toLowerCase();
      
      if (lower.includes('headache') || lower.includes('dizzy')) {
        botResponse = "Based on your symptoms, this seems to be **Neuro related** or potentially just dehydration. I recommend booking an appointment under the 'Neuro related' or 'General Physician' domain. Would you like to book an appointment now?";
      } else if (lower.includes('stomach') || lower.includes('pain') || lower.includes('vomit')) {
        botResponse = "This sounds like an **Internal organs related** issue (Gastroenterology). Please ensure you are hydrated. Should I direct you to the specialist booking page?";
      } else if (lower.includes('rash') || lower.includes('itch')) {
        botResponse = "This is classified under **Skin related** (Dermatology) or possibly **Infection and allergies**. You should consult a dermatologist. I can help you find one near your town.";
      } else if (lower.includes('chest') || lower.includes('heart') || lower.includes('breath')) {
        botResponse = "🚨 **URGENT**: Chest-related symptoms could indicate a **Heart related** issue. If you are experiencing severe pain or shortness of breath, please press the SOS button immediately or visit the nearest emergency room. Otherwise, book an appointment under 'Heart related'.";
      } else {
        botResponse = "I have noted your symptoms. It could fall under **General Medicine** or **Infection related**. To give you the best care, I recommend consulting a doctor. You can select 'General Physician' in the booking form.";
      }

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1500);
  };

  return (
    <div className="feature-page">
      <div className="feature-container chat-container">
        <button className="btn-back" onClick={onBack}>&larr; Back to Home</button>
        <h2>AI Symptom Checker</h2>
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.isBot ? 'bot' : 'user'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chat-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder="Type your symptoms here..." 
            />
            <button type="submit" className="btn-primary">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SymptomCheckerChat;
