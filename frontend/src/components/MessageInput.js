import React, { useState } from 'react';
import '../css/MessageInput.css';

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="message-input-container">
      <textarea
        className="message-input-textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="send-button" onClick={handleSend}>Send</button>
    </div>
  );
}

export default MessageInput;
